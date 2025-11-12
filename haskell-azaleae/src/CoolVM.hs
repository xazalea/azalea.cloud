{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE LambdaCase #-}

-- Modernized CoolVM - A clean, lazily evaluated, side-effect-free virtual machine
-- Based on https://github.com/MikeHaskel/CoolVM
-- Enhanced for modern use with better error handling, JSON support, and web integration
-- Running on Vercel via vercel-hs (https://github.com/ghiliweld/vercel-hs)

module CoolVM where

import Data.Aeson
import Data.Aeson.Types
import Data.Text (Text)
import qualified Data.Text as T
import qualified Data.ByteString.Lazy as BL
import GHC.Generics
import Data.Maybe
import Data.List

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
    , "memory" .= object (map (\(k, v) -> (T.unpack k, v)) vmMemory)
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

instance ToJSON Instruction where
  toJSON = \case
    Push v -> object ["type" .= ("push" :: String), "value" .= v]
    Pop -> object ["type" .= ("pop" :: String)]
    Add -> object ["type" .= ("add" :: String)]
    Sub -> object ["type" .= ("sub" :: String)]
    Mul -> object ["type" .= ("mul" :: String)]
    Div -> object ["type" .= ("div" :: String)]
    Load n -> object ["type" .= ("load" :: String), "name" .= n]
    Store n -> object ["type" .= ("store" :: String), "name" .= n]
    Jump a -> object ["type" .= ("jump" :: String), "address" .= a]
    JumpIf a -> object ["type" .= ("jumpif" :: String), "address" .= a]
    Call n -> object ["type" .= ("call" :: String), "name" .= n]
    Ret -> object ["type" .= ("ret" :: String)]
    Halt -> object ["type" .= ("halt" :: String)]

instance FromJSON Instruction where
  parseJSON = withObject "Instruction" $ \o -> do
    typ <- o .: "type"
    case typ :: String of
      "push" -> Push <$> o .: "value"
      "pop" -> return Pop
      "add" -> return Add
      "sub" -> return Sub
      "mul" -> return Mul
      "div" -> return Div
      "load" -> Load <$> o .: "name"
      "store" -> Store <$> o .: "name"
      "jump" -> Jump <$> o .: "address"
      "jumpif" -> JumpIf <$> o .: "address"
      "call" -> Call <$> o .: "name"
      "ret" -> return Ret
      "halt" -> return Halt
      _ -> fail "Unknown instruction type"

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

-- Extract number from Value
getNumber :: Value -> Maybe Integer
getNumber (Number n) = Just (floor n)
getNumber _ = Nothing

-- Extract bool from Value
getBool :: Value -> Maybe Bool
getBool (Bool b) = Just b
getBool _ = Nothing

-- Execute single instruction (pure function)
executeInstruction :: Instruction -> VMState -> VMResult
executeInstruction (Push val) state = Right state { vmStack = val : vmStack state }
executeInstruction Pop state = case vmStack state of
  [] -> Left "Stack underflow"
  (_:xs) -> Right state { vmStack = xs }
executeInstruction Add state = case vmStack state of
  (a:b:xs) -> case (getNumber a, getNumber b) of
    (Just x, Just y) -> Right state { vmStack = Number (fromInteger (x + y)) : xs }
    _ -> Left "Invalid operands for Add: expected numbers"
  _ -> Left "Stack underflow for Add"
executeInstruction Sub state = case vmStack state of
  (a:b:xs) -> case (getNumber a, getNumber b) of
    (Just x, Just y) -> Right state { vmStack = Number (fromInteger (y - x)) : xs }
    _ -> Left "Invalid operands for Sub: expected numbers"
  _ -> Left "Stack underflow for Sub"
executeInstruction Mul state = case vmStack state of
  (a:b:xs) -> case (getNumber a, getNumber b) of
    (Just x, Just y) -> Right state { vmStack = Number (fromInteger (x * y)) : xs }
    _ -> Left "Invalid operands for Mul: expected numbers"
  _ -> Left "Stack underflow for Mul"
executeInstruction Div state = case vmStack state of
  (a:b:xs) -> case (getNumber a, getNumber b) of
    (Just x, Just y) -> 
      if x == 0 then Left "Division by zero"
      else Right state { vmStack = Number (fromInteger (y `div` x)) : xs }
    _ -> Left "Invalid operands for Div: expected numbers"
  _ -> Left "Stack underflow for Div"
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
executeInstruction (Jump addr) state 
  | addr >= 0 && addr < length (vmProgram state) = Right state { vmPc = addr }
  | otherwise = Left "Jump address out of bounds"
executeInstruction (JumpIf addr) state = case vmStack state of
  (cond:_) -> case getBool cond of
    Just True -> 
      if addr >= 0 && addr < length (vmProgram state)
      then Right state { vmPc = addr, vmStack = tail (vmStack state) }
      else Left "JumpIf address out of bounds"
    Just False -> Right state { vmPc = vmPc state + 1, vmStack = tail (vmStack state) }
    Nothing -> Left "Invalid condition for JumpIf: expected boolean"
  _ -> Left "Stack underflow for JumpIf"
executeInstruction Halt state = Right state
executeInstruction _ state = Right state { vmPc = vmPc state + 1 }

-- Execute program (lazy evaluation, pure function)
executeProgram :: VMState -> VMResult
executeProgram state
  | vmPc state >= length (vmProgram state) = Right state
  | vmPc state < 0 = Left "Program counter out of bounds"
  | otherwise = case executeInstruction (vmProgram state !! vmPc state) state of
      Left err -> Left err
      Right newState -> 
        if vmPc newState == vmPc state && vmPc newState < length (vmProgram newState)
        then executeProgram newState { vmPc = vmPc newState + 1 }
        else executeProgram newState

-- API Handler for Vercel - Process JSON request
processRequest :: BL.ByteString -> IO BL.ByteString
processRequest body = do
  case decode body of
    Just (Object req) -> do
      let action = req !? "action" >>= (^? _String)
      case action of
        Just "execute" -> do
          let program = req !? "program" >>= (^? _Array)
          case program of
            Just prog -> do
              let instructions = mapMaybe (fromJSON) (toList prog)
              if length instructions /= length (toList prog)
                then return $ encode $ object
                  [ "success" .= False
                  , "error" .= ("Failed to parse some instructions" :: Text)
                  ]
                else do
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
              , "error" .= ("Invalid program format" :: Text)
              ]
        Just "create" -> do
          now <- getCurrentTime
          rand <- randomIO :: IO Int
          let timestamp = round (utcTimeToPOSIXSeconds now :: Double) :: Integer
          let vmId = "coolvm-" <> T.pack (show timestamp) <> "-" <> T.pack (show (abs rand))
          return $ encode $ object
            [ "success" .= True
            , "vmId" .= vmId
            , "status" .= ("ready" :: Text)
            , "features" .= ["Lazy evaluation", "Side-effect-free", "Functional programming", "Type-safe execution"]
            ]
        _ -> return $ encode $ object
          [ "success" .= False
          , "error" .= ("Invalid action" :: Text)
          ]
    _ -> return $ encode $ object
      [ "success" .= False
      , "error" .= ("Invalid request format" :: Text)
      ]

