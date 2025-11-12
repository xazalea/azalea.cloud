{-# LANGUAGE OverloadedStrings #-}

-- Main entry point for CoolVM on Vercel
-- This is called by vercel-hs to handle HTTP requests

module Main where

import CoolVM
import qualified Data.ByteString.Lazy as BL
import System.Environment
import Data.Text (Text)
import qualified Data.Text as T

main :: IO ()
main = do
  -- Read request body from stdin (Vercel serverless function)
  body <- BL.getContents
  result <- processRequest body
  BL.putStr result

