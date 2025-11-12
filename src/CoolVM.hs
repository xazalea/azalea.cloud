{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE RecordWildCards #-}

-- Modernized CoolVM - A clean, lazily evaluated, side-effect-free virtual machine
-- Based on https://github.com/MikeHaskel/CoolVM
-- Enhanced for modern use with better error handling, JSON support, and web integration

module CoolVM where

import Data.Aeson
import Data.Text (Text)
import GHC.Generics
import qualified Data.ByteString.Lazy as BL
import qualified Data.Text as T

-- VM State - Immutable and pure
data VMState = VMState
  { vmStack :: [Value]
  , vmMemory :: [(Text, Value)]
  , vmProgram :: [Instruction]
  , vmPc :: Int  -- Program counter
  } deriving (Show, Generic)

instance ToJSON VMState where
  toJSON VMState{..} = object
    [ "stack" .= vmStack
    , "memory" .= vmMemory
    , "program" .= vmProgram
    , "pc" .= vmPc
    ]

instance FromJSON VMState

-- Instructions - Functional and pure
data Instruction
  = Push Value
  | Pop
  | Add
  | Sub
  | Mul
  | Div
  | Load Text
  | Store Text
  | Jump Int
  | JumpIf Int
  | Call Text
  | Ret
  | Halt
  deriving (Show, Generic)

instance ToJSON Instruction
instance FromJSON Instruction

-- VM Execution - Pure functional evaluation
type VMResult = Either Text VMState

-- Initialize VM with program
initVM :: [Instruction] -> VMState
initVM program = VMState
  { vmStack = []
  , vmMemory = []
  , vmProgram = program
  , vmPc = 0
  }

-- Execute single instruction (pure function)
executeInstruction :: Instruction -> VMState -> VMResult
executeInstruction (Push val) state = Right state { vmStack = val : vmStack state }
executeInstruction Pop state = case vmStack state of
  [] -> Left "Stack underflow"
  (_:xs) -> Right state { vmStack = xs }
executeInstruction Add state = case vmStack state of
  (Number a:Number b:xs) -> Right state { vmStack = Number (a + b) : xs }
  _ -> Left "Invalid operands for Add"
executeInstruction Sub state = case vmStack state of
  (Number a:Number b:xs) -> Right state { vmStack = Number (b - a) : xs }
  _ -> Left "Invalid operands for Sub"
executeInstruction Mul state = case vmStack state of
  (Number a:Number b:xs) -> Right state { vmStack = Number (a * b) : xs }
  _ -> Left "Invalid operands for Mul"
executeInstruction Div state = case vmStack state of
  (Number a:Number b:xs) -> 
    if a == 0 then Left "Division by zero"
    else Right state { vmStack = Number (b `div` a) : xs }
  _ -> Left "Invalid operands for Div"
executeInstruction (Load name) state = 
  case lookup name (vmMemory state) of
    Just val -> Right state { vmStack = val : vmStack state }
    Nothing -> Left $ "Variable not found: " <> name
executeInstruction (Store name) state = case vmStack state of
  [] -> Left "Stack underflow"
  (val:xs) -> Right state 
    { vmStack = xs
    , vmMemory = (name, val) : filter ((/= name) . fst) (vmMemory state)
    }
executeInstruction (Jump addr) state = Right state { vmPc = addr }
executeInstruction (JumpIf addr) state = case vmStack state of
  (Bool True:_) -> Right state { vmPc = addr }
  (Bool False:_) -> Right state { vmPc = vmPc state + 1 }
  _ -> Left "Invalid condition for JumpIf"
executeInstruction Halt state = Right state
executeInstruction _ state = Right state { vmPc = vmPc state + 1 }

-- Execute program (lazy evaluation, pure function)
executeProgram :: VMState -> VMResult
executeProgram state
  | vmPc state >= length (vmProgram state) = Right state
  | otherwise = case executeInstruction (vmProgram state !! vmPc state) state of
      Left err -> Left err
      Right newState -> executeProgram newState

-- API Handler for Vercel
handleRequest :: BL.ByteString -> IO BL.ByteString
handleRequest body = do
  case decode body of
    Just (Object req) -> do
      let action = req !? "action" >>= (^? _String)
      case action of
        Just "execute" -> do
          let program = req !? "program" >>= (^? _Array)
          case program of
            Just prog -> do
              let instructions = mapMaybe fromJSON (toList prog)
              let vm = initVM instructions
              case executeProgram vm of
                Right finalState -> return $ encode $ object
                  [ "success" .= True
                  , "result" .= finalState
                  ]
                Left err -> return $ encode $ object
                  [ "success" .= False
                  , "error" .= err
                  ]
            Nothing -> return $ encode $ object
              [ "success" .= False
              , "error" .= ("Invalid program" :: Text)
              ]
        Just "create" -> return $ encode $ object
          [ "success" .= True
          , "vmId" .= ("coolvm-" <> T.pack (show (round (getCurrentTime :: Double))))
          , "status" .= ("ready" :: Text)
          ]
        _ -> return $ encode $ object
          [ "success" .= False
          , "error" .= ("Invalid action" :: Text)
          ]
    _ -> return $ encode $ object
      [ "success" .= False
      , "error" .= ("Invalid request" :: Text)
      ]

