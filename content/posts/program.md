---
title: "Computer Program"
date: 2022-05-13T22:37:09+06:00
draft: false
toc: true
images:
  - "img/mother_board.webp"
tags:
  - basic
---

A ***Computer Program*** is a sequence of instructions written in a *programing language* which can be executed or interpreted in a computer system.

When we engineers/programmers/developers write any program in any programing language of our choice, we actually write in very human-readable language.
This is called source code.
We can understand what source code is describing; but the computer only knows binary & it can only execute programs which is written in machine instructions.

## Instruction Set Architecture (ISA)

Suppose we have loaded two integer values into `a` & `b` addresses of computer memory.
Now you want to add their values & save the result into `c` memory address.
Only the central processing unit AKA ***CPU*** has the power to do the adding by using the arithmetic logic unit AKA ***ALU***.
But how do you let cpu know to do the operation?
On the top of it, if you have intel cpu in one machine & amd cpu on another; they can execute same operation differently according to their architecture.

Here the instruction set architecture (ISA) comes to rescue. ISA provides an abstraction layer which cpu can read, decode, understand the command & execute it.
ISA defines ***Instructions***, which are *binary string* with a predefined structure.
Every instruction has *opcode* (Operation code) at its beginning, by reading this cpu can understand what operation it should perform.
After the opcode follow supporting data/memory address which cpu may need to complete the operation (It is also predefined for specific opcode).

For example, lets say for our machine ISA, the specified opcode length is 6; & the addition instruction opcode is `000001`. & for addition instruction, we also need provide *first param's memory address*, *second param's memory address*, *to save the result memory address* in order. Lets assume the address value of `a`, `b` & `c` are `1122`, `3456`, `9976`.
So the instruction for it will be,

```bin
000001112234569976
```

This instruction is loaded on the memory & process triggered, so that cpu can look at it.
CPU will read the instruction & understand what we want to do, add `a` & `b`s' values & save the result in `c` address.

There are various types of ISA.
A cpu can implement an ISA for its operations.
A common classification of ISA is by architectural complexity.
Some well known ISA are, complex instruction set computer AKA ***CISC***, reduced instruction set computer AKA ***RISC***, minimal instruction set computer AKA ***MISC***.

Although machine instructions are only way to execute the computer program, it is near to impossible for us human to write complex programs in all binary instructions.
To make it more convenient for us, the programming language comes in.
Programming languages add more abstraction layers over the ISA to make the process more easier.
There are mainly two types of programming languages, low-level, high-level programming languages.

{{< image src="/img/mother_board.webp" alt="motherBoard" position="center" style="border-radius: 8px;" >}}

## Low level programming language

Low level programming languages provides little or no abstraction over the [ISA](#instruction-set-architecture-isa) commands.
The language commands are very similar to the processor's instructions.
These languages are also described as `close to the hardware`, because of the little-to-no abstraction between the actual instructions.
As a result low level programming languages are very fast & have a small memory footprint.
But these languages are also normally *non-portable* as they are optimized to run on specific system architectures.
[Machine code](#machine-code), [Assembly](#assembly) are the examples of low level programming language.

### Machine code

Machine code is a strictly numeriacal language, as a result very primitive & very low human-readable.
It consists cpu instructions in it, meaning there is no abstraction between machine code &  [ISA](#instruction-set-architecture-isa) commands.
It is also called ***the lowest level programming language***, as other upper languages use compiler/interpreter/[assembler](#assembler) to convert them into machine code & that machine code is actually get executed on the system.
Machine code is actually hardware-dependent, so it is not-portable.
As machine code can be executed directly, it is the fastest language.

### Assembly

Assembly is another [low level programming language](#low-level-programming-language), which is very close to [Machine code](#machine-code) with a twist.
Assembly language has *statements*, & these statements are 1-to-1 conversion of corresponding *machine instructions*.
But, instead of being full binary, assembly use fix english language keywords & numeric values to describe the instructions & their parameters, then these statements are converted to [machine code](#machine-code) using a tool named [assembler](#assembler).
Then the machine code get executed.
Because of this extra abstraction, assembly is little bit easier to read; & as the statements are 1:1 representation of instructions, the over-head of conversion is very low.

#### Assembler

Assembler is a program which reads [Assembly](#assembly) language source code, converts every statements to machine code.
Similar to machine code, assembly language starts every statement with an *opcode* & required *params*.
But, instead of binary, these opcode & params are in human-readable english language.
It's the job of assembler to covert this english keywords to corresponding binary representation & generate machine code.

## High level programming language

High level programming languages have strong abstraction between them & [low level programming language](#low-level-programming-language).
High level programming languages are very much human readable, so they are very easy write, read & manage.
They also tend to automate various low level functionality like *pointer arithmetic*, *memory manipulation* & hide them under the abstraction layer.

To execute any high level language program, the source code at first converted into a [low level programming language](#low-level-programming-language) (typically [Assembly](#assembly)) using a program tool called [Compiler](#compiler), which then converted into [Machine code](#machine-code) by [Assembler](#assembler) & get executed.
So, every new machine, these language programs need to be complied to the machine specific low level language first.

Some other high level languages use [Interpreter](#interpreter) instead of compiler, which directly execute instructions by reading the source code.

Some other languages (ex: Java, Kotlin) use even more complex [Interpreter](#interpreter) process.
They first complied the source code into an intermediate form (for jdk based languages, java bytecode). This intermediate form then can be executed under a specific virtual environment (for example, Java Runtime Environment (JRE)). These languages are usually very slow because of this complex execution process, but this enable for these languages to be complied once run everywhere.

### Compiler

Compiler is a computer program, which can translate a programing language source code to another programming language.
It is generally used to convert [high level programming language](#high-level-programming-language) source code to [low level programming language](#low-level-programming-language).

There are various types of compiler. For example, *cross-compiler* is called for those compilers who can covert source code to executable code other than own platform (For example, compiling android app from the PC).
Another one is *de-compiler*, which translates executable file / low level programming language source code to high level programming language.

### Interpreter

Interpreter is a program that directly execute system instructions by reading source code of any high level language.
Interpreter use various strategies to execute instructions.

- It can directly *parse* the source code & perform its behavior.
- It can directly translate the source code to any executable object code & execute.
- It can execute any pre-compiled bytecode (made by a [Compiler](#compiler)) in a specific virtual machine (the java way).

Lisp, Perl, Raku, Python, Ruby are the popular example of interpreted languages.

## Mid level programming language

Now a days some [High level programming language](#high-level-programming-language)s are called mid level programming languages which have some specific features of [low level programming language](#low-level-programming-language).
C & Rust are the prime example of them.

For example, C is called mid level language because,

- Easy to understand (high level language feature)
- Machine independent (high level language feature)
- Coverts to assembly code
- Supports pointer arithmetic (low level language feature)
- Supports manual memory management (low level language feature)

These mid level languages are also normally *general purpose language* & *system language*, because they can provide best of the two worlds.

## Very high level programming language

Some [High level programming language](#high-level-programming-language) are called ***Very high level programming language*** as they provide very high level of abstraction.
They are normally domain specific scripting language, meaning they work on a specific application environment & can be run by bot to automate tasks.
Normally, programmers use these languages as their productivity tools.

Python, Perl, Ruby, Visual Basic are some example of Very high level programming language.

## Execution of Computer Program

When any language's source code is compiled/interpreted/assembled into *executable* format, the resulting instructions are saved into a file in the hard drive.
When the execution of the program is called, the instructions are loaded from file to the *computer memory* by the operating system.
Then cpu just read through the instructions one by one & execute the commands.
