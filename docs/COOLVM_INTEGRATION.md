# CoolVM Integration

This document describes the integration of [CoolVM](https://github.com/MikeHaskel/CoolVM) into Azalea Cloud using [vercel-hs](https://github.com/ghiliweld/vercel-hs).

## Overview

CoolVM is a clean, lazily evaluated, side-effect-free virtual machine written in Haskell. This integration brings functional programming capabilities to Azalea Cloud, running on Vercel's serverless platform via vercel-hs.

## Modernized Features

The integrated CoolVM includes modern enhancements:

1. **JSON API Support**: Full JSON serialization for VM state and instructions
2. **Web Integration**: RESTful API endpoints for VM operations
3. **Error Handling**: Comprehensive error handling with descriptive messages
4. **Type Safety**: Strong typing throughout the VM implementation
5. **Lazy Evaluation**: Pure functional evaluation with lazy semantics
6. **Side-Effect-Free**: All operations are pure and immutable

## Architecture

```
Browser (Azalea Cloud UI)
    ↓
CoolVM Component (React/TypeScript)
    ↓
CoolVM Service (TypeScript)
    ↓
API Endpoint (/api/coolvm)
    ↓
Vercel Serverless Function
    ↓
Haskell VM Runtime (via vercel-hs)
    ↓
CoolVM Execution Engine
```

## Components

### 1. Haskell VM Implementation (`src/CoolVM.hs`)

Modernized CoolVM with:
- JSON serialization support
- Web API integration
- Enhanced error handling
- Type-safe instruction set
- Pure functional execution

### 2. TypeScript Service (`src/services/coolVMService.ts`)

Service layer that:
- Manages VM instances
- Handles API communication
- Tracks VM state
- Provides program execution

### 3. React Component (`src/components/CoolVM/CoolVM.tsx`)

User interface featuring:
- Code editor for VM programs
- Real-time execution
- Output display
- Instruction reference
- Example programs

### 4. API Endpoint (`api/coolvm/index.ts`)

Vercel serverless function that:
- Creates VM instances
- Executes programs
- Returns VM state
- Handles errors

## VM Instructions

The CoolVM supports the following instructions:

- `push <value>` - Push value onto stack
- `pop` - Pop value from stack
- `add` - Add top two stack values
- `sub` - Subtract top two stack values
- `mul` - Multiply top two stack values
- `div` - Divide top two stack values
- `load <name>` - Load variable from memory
- `store <name>` - Store value to memory
- `jump <addr>` - Jump to address
- `jumpif <addr>` - Conditional jump
- `halt` - Stop execution

## Usage

### In Azalea Cloud UI

1. Select "CoolVM" provider from the sidebar
2. Write or load a VM program
3. Click "Execute Program"
4. View results in the output panel

### Example Program

```
push 10
push 20
add
push 5
mul
store result
load result
halt
```

This program:
1. Pushes 10 and 20 onto the stack
2. Adds them (result: 30)
3. Pushes 5
4. Multiplies (result: 150)
5. Stores in memory as "result"
6. Loads "result" back
7. Halts execution

## Integration with Vercel

The VM runs on Vercel's serverless platform using vercel-hs:

1. **Haskell Runtime**: vercel-hs provides Haskell runtime on Vercel
2. **Serverless Functions**: Each VM operation runs as a serverless function
3. **Stateless Execution**: VM state is serialized and passed between requests
4. **Scalable**: Automatically scales with demand

## Benefits

1. **Functional Programming**: Pure, side-effect-free execution
2. **Type Safety**: Strong typing prevents runtime errors
3. **Lazy Evaluation**: Efficient computation with lazy semantics
4. **Immutable State**: All state changes are pure transformations
5. **Educational**: Great for learning functional programming concepts

## Provider Changes

### Removed Providers
- **AzaleaSSHX**: Removed (sshx.io integration)
- **AzaleaSuper**: Removed (dual-instance mode)
- **AzaleaUltra**: Removed (triple-instance mode)

### Current Providers
- **AzaleaCloud**: Cloud shell with unlimited access
- **AzaleaLocal**: Standalone WebVM (conditionally shown if available)
- **CoolVM**: Functional virtual machine

## WebVM Availability

The AzaleaLocal provider (WebVM) is conditionally shown in the sidebar:
- If WebVM backend is available: Provider is shown
- If WebVM backend fails: Provider is hidden from sidebar (but code remains)

## Next Steps

1. **Full Haskell Integration**: Complete vercel-hs integration for native Haskell execution
2. **Advanced Features**: Add more VM instructions and capabilities
3. **Performance**: Optimize for large programs
4. **Debugging**: Add step-by-step execution mode
5. **Examples**: Add more example programs

## References

- CoolVM: https://github.com/MikeHaskel/CoolVM
- vercel-hs: https://github.com/ghiliweld/vercel-hs
- Vercel Serverless Functions: https://vercel.com/docs/functions

