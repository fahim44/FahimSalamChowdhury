---
title: "Tail Recursion"
date: 2022-05-10T17:28:37+06:00
draft: true
toc: true
images:
  - "/img/russian_doll.webp" 
tags:
  - basic
  - recursion
---

**Recursion** is a very interesting *trick* which can replace loops for many programing problems.
Recursion makes the algorithm easier for the programmer, but it has a major con.
It's permormance & memory heavy.
Because of these, many programmer hate recursion.
But there is a new kid in the block, called ***Tail Recursion***; which can be seen in some mordern compilers; which can resolve the memory problem a-lot.
In the blog we will discuss about what is resursion, how it is worked under the hood, the issue of recursion, what is tail recursion & how it can resolve the memory issue.

{{< image src="/img/russian_doll.webp" alt="tail" position="center" style="border-radius: 8px;" >}}

## Recursion

**Recursion**'s text definition is `The repeated application of a recursive procedure or definition`.
In the computer science field, Recursion occurs when a method/function calls itself.
Recursion works similar to looping.
Let's try to understand recursion by example of factorial.
We need to find out factorial to any given integer number `n`, aka `n!` (`n`>0).
`n! = n*(n-1)*(n-2)*....3*2*1`, means we need to multiply with previous number until we reach 1.

First let's solve this by loop.

```java
void findFactorial(int n) {
  int result = 1;
  while(n > 0) {
    result *= n;
    n--;
  }
  return result;
}
```

Now let's try recursion to solve this problem.

```java
void factorial(int n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial(n-1);
}

void findFactorial(int n) {
  return factorial(n);
}
```

In this example `factorial` method is the *recursive function/method*, because on the 4th line it is calling itself.

For many complex problems, recursive solution helps programmer to visualize easily, as it breaks down the logic into small piece.
You may argue loop do the same thing; but in loop, the logic continues inside the loop & you have to maintain the loops end condition, which can be sometime tricky to visualize.
Comparing to recursive function, the logic is separated, which human brain can catch easily.

Similar to loop, recursive function requires an end condition, or it will run for infinite time & at last will through `OutOfMemoryException`.
In the above example, `if(n==1) return 1;` is the end condition.

### Inner working of recursion

To learn how recursion works in computer system, we need to know the call stack first.

#### The call stack

The call stack is actually a ***stack*** data-structure.
The computer use call stack internally to manage memory of the programs.
Let's describe it with a example.

```java
int method2(int y) {
  y-=10;
  return y-1;
}

void method1(int x) {
  x++;
  int y = method2(x+2);
  x+=y;
}

public static void main(String[] args) {
  method1(100);
}
```

When we run the above java program, the `main` method is *loaded on the memory* (for java progams, the `main` method is the entry point).
The method loaded on the memory means, the system *marks* some limit in the memory itself




in the computer system, a chunk of memory is allocated in the **call stack** (*stack push* operation).
This memory is called ***the stack frame***.
This stack frame also holds the *method scoped* variables' (aka local variables) value (or, memory address in the heap for non-primitive objects).
So, this stack frame holds the `args` variable.

The `main` called `method1` method with param `x=100`.
So, again stack-push operation happens in call stack for `method1`, & the latest memory-block holds variable `x` with value `100`.

Now, our program moves to executing `method1`, but it is not completed executing `main` method yet!
`main` actually moves a pause state, it will be resumed after we completed executing `method1`.
Computer follow the **FILO** (First In Last Out, stack's priciple) in the call stack, pause existing method execution when new memory for any method call is pushed, resume it after all top items above it are poped.
After completing execution, call stack pop the memory from the stack & de-allocate it.

In the 1st line of method1, x's value increased by 1.
So, the value of x in the memory-block is updated from x=100 to x=101.

Now, method1 calls method2 with param (x+2=101+2=103).
So, here y=103.
As a result, call stack has a new memory block push for method2 with y=103 variable.
method1's execution goes to paused state & metho2's execution started.
Remember, method1's x's value is also reserved inside method1's memory block.
so x=101 remains although y=103.

In the first line of method2, y's value is decresed by 10, so new y's value is (103-10=93).
So, inside the memory block for method2, y's value updated to 93, but, x's value inside method1's memory remains 101!

In the next line of method2, returns y-1 (93-1=92).
Here couple of things happened. First of all we are not setting (y-1) to any variable (or updating y), as a result method2's y's value in memory remains unchanged.
Next with the `return` statement, the method2's execution is ended, meaning the memory allocation for method2 will be *poped* from the call stack.
Before poping, the return value (92), is setted in method1's new variable y.

Now, we have 2 y in the memory!

