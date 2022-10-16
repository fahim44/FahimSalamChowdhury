---
title: "Optional in Java"
date: 2021-01-01T18:09:06+06:00
draft: false
toc: true
images:
tags:
  - java
---

**Java 8** has some cool features introduced on it's release, for example, *lamda*, *method reference* etc. 
One of the major features is *Optional*. 
Today, we will discuss what optional is, why it is introduced & basic use case of it.

## The Billion Dollar Mistake
[Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), developer of [quicksort algorithm](https://en.wikipedia.org/wiki/Quicksort), invented [null reference](https://en.wikipedia.org/wiki/Null_pointer) in 1965. 
In 2009, he described it as a [Billion Dollar Mistake](https://en.wikipedia.org/wiki/Tony_Hoare#Apologies_and_retractions) & apologized for inventing it. 
Now what is **Null Reference** & why is it called **The Billion Dollar Mistake**?

According to wikipedia,
> In computing, a null pointer or null reference is a value saved for indicating that the pointer or reference does not refer to a valid object.

If you are familier with *java* or any of its close cousins, you should read out the following example easily:
```java
String name = null;
System.out.println(name.length());
```
Can you guess what the output here will be? 
Yes, you are right, it will throw the infamous `NullPointerException` here. 
Because `name` is not initialized here & we are calling `String.length()` on it without check! So, the null safe solution of this issue is,
```java
String name = null;
if(name != null) {
  System.out.println(name.length());
}
```
Now why I have reffered NullPointerException as **infamous exception** you may ask. 
Because it is very common senario. 
If you have some experience with any mordern programming language (especially java), you probably encountered with it before. 
It's so common, for some cases, you might write hundreds of null checking blocks, still may miss some cases.
Again, we programmers are forgetful in nature, we miss the null check all the time, we love to test our code with the happy case senario only & ship it to production. 
And in production, our piece of code faces-off against unwanted null reference and throws nullPointerException.

## Null Safety & Optional
Mordern languages, for example **Kotlin** provides [Null Safety](https://kotlinlang.org/docs/reference/null-safety.html) (**?** operator), to solve the null-reference problem. For example, previous problem can be solved in kotlin like,
```kotlin
var name : String? = null
name?.let {
  print(it)
}
```
Null Safety in Kotlin using [Safe Call Operator](https://kotlinlang.org/docs/reference/null-safety.html#safe-calls) (`?.`) is very easy to use & understandable. 

Sadly java still doesn't have any operator like the Kotlin's safe call operator. 
Instead Java-8 introduced **[Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)** wrapper class.
Optional is a final class under the *java.util* package.
It is a generic class which actually wraps around the actual value & provides the null reference safety & some additional operations regarding the null safety. Let's solve the problem with java optional.
```java
Optional<String> nameOptional = Optional.empty();
nameOptional.ifPresent(name -> System.out.println(name.length()));
```
What The Heck!!! why are we using optional here for? 
The vanilla java solution (the *`if(name != null)`* check solution) is more simple and easy to understand solution. 
What is the benifit to use optional instead?

The reason is my friend to forcefully remind us the issue.
The `if (object != null)` checking solution is all perfect; no doubt about it.
But that solution is valid when we are not forgetful.
Suppose we have two blocks of code where the can-be-null object is used, but forget to check null in one of the blogs instead; then the null safety is guaranteed again.
```java
String name = null;
if(name != null) {
  System.out.println(name.length());
}
....
....
....
Integer k = name.length() + 1;
```
But if we wrap the object with optional, we must check for null everytime we need to use the object.
It is very tedious I know, but better secured.

## Optional in Java
Now, we will see how we can create new optional & some use-cases of it.

- ### Creating Optional
  Optional provides some static method which can be used as it's builder methods.

  - To create an empty optional, we can use `Optional.empty()` static method. Empty optional means that the *wrapped object* has no valid value.
    ```java
    Optional<String> nameOptional = Optional.empty();
    ```

  - If any object has value for sure, we can wrap the object with optional using `Optional.of(...)` static method. It takes the object as param. When using `of` static method, we must be sure that object can't be null, if it becomes null for any case, `of` method will throw `NullPointerException`.
    ```java
    Optional<String> nameOptional = Optional.of("Altair");
    ```

  - If any object has value or is null, we can wrap the object with optional using `Optional.ofNullable(...)` static method. It takes the object-in-question as param.
    ```java
    Optional<String> invalidNameOptional = Optional.ofNullable(null);
    Optional<String> validNameOptional   = Optional.ofNullable("Altair");
    ```

- ### Checking Optional's value
  - If any Optional object has value present in it, `Optional.isPresent()` method will return `true`, otherwise `false`.
    ```java
    Optional<String> nameOptional = Optional.of("Altair");
    if (nameOptional.isPresent()) {
      System.out.println("This message should be printed.");
    }
    ```
  - As revert of *isPresent* method, `Optional.isEmpty()` method will return `true` when optional object has no value in it, otherwise `false`.
    ```java
    Optional<String> nameOptional = Optional.empty();
    if (nameOptional.isEmpty()) {
      System.out.println("name is empty. This message should be printed.");
    }
    ```

- ### Unwrapping Optional's value
  If any `Optional` is not empty, we can unwrap the Optional's Object using `Optional.get()` method.
    ```java
    Optional<String> nameOptional = Optional.of("Altair");
    String name = nameOptional.get();
    Assert.assertEquals(name, "Altair");
    ```
- ### Conditional blocks
  - If we execute some logic whenever an Optional is not empty, we can use `Optional.ifPresent(...)` method, which takes a `Consumer` as param, which is invoked only when Optional has value.
    ```java
    Optional<String> nameOptional = Optional.of("Altair");
    nameOptional.ifPresent(name -> {
      System.out.println(name);
    });
    ```

  - When Optional is empty, we want to unwrap the Optional and pass an object as default value, we can use `Optional.orElse(...)`. This method takes an object which is the default value that we want to pass if the optional is empty.
    ```java
    Optional<String> nameOptional = Optional.empty();
    String name = nameOptional.orElse("anonymous");
    Assert.assertEquals(name, "anonymous");
    ```

  - `Optional.orElseGet(...)` is similar to `orElse(...)` method; the main difference is `orElse()` takes an object which will be returned if the the Optional is empty, and `orElseGet()` takes a `Supplier` interface as param, which will only be invoked when the Optional is empty.
  
    As `orElse` method directly returns the object provided to it, the default object should always be initiated before-hand when we use this.
    On the other hand, the default object only be created when Optional is empty when using `orElseGet`.
    That's why, when we deal with some *IO* operation / heavy Object (expensive object to be initiated) as default value, it is better to use `orElseGet` instead of `orElse`.
    ```java
    Optional<String> nameOptional = Optional.empty();
    String name = nameOptional.orElseGet(() -> "anonymous");
    Assert.assertEquals(name, "anonymous");
    ```

  - `Optional.orElseThrow(...)` is similar to `orElseGet`, the difference is instead of returning default value when Optional is empty, `orElseThrow` will throw an exception. It takes a supplier as param which, provides the exception to be thrown.
    ```java
    Optional<String> nameOptional = Optional.empty();
    String name = nameOptional.orElseThrow(CustomException::new);
    ```
    **java 10** also has a no-arg `orElseThrow` method, which throws `NoSuchElelementException`.
    ```java
    Optional<String> nameOptional = Optional.empty();
    String name = nameOptional.orElseThrow();
    ```
  
  - From **Java 9**, there is a new method called `Optional.or(...)`, which is similar to `orElseGet` as functionality but default in return type.
  Where, `orElse` and `orElseGet` unwrapped the optional object, `or` method doesn't unwrap & return the `Optional<Type>`, so that we can perform further Optional related actions on it.
    ```java
    Optional<String> nameOptional = Optional.empty();
    Optional<String> anotherOptional = nameOptional.or(() -> "anonymous");
    Assert.assertEquals(anotherOptional.get(), "anonymous");
    ```
  - > If Optional not empty, do this... else, do that
    
    This is a common scenerio of Optional. To cover this flow into lamda, **Java 9** introduced `ifPresentOrElse(...)` method. It takes *Consumer* which is invoked when optional in not empty, and *Runnable* as second param which's `run` method is invoked when the optional is empty.
      ```java
      Optional<String> nameOptional = Optional.of("Altair");
      nameOptional.ifPresentOrElse(name -> System.out.println(name),
                                     () -> System.out.println("No name found!!!"));
      ```

- ### Filtering & Mapping
  - To test and filter out value, we can use `Optional.filter(...)` method. 
  It takes `Predicate` as param and return Optional. 
  If Optional is not empty, the pedicate's test method is invoked.
  If test method return true, filter method will return the `Optional<value>`, otherwise return `Optional.empty()`.
    ```java
    Optional<String> nameOptional = Optional.of("Altair").filter(name -> name.equals("John"));
    Assert.assertEquals(nameOptional.isPresent(), false);
    ```
  
  - For non-empty Optional, `Optional.map(...)` method transform the value to another value. 
  It takes `Function` as param.
  `Function`'s `apply` method takes the optional's value and returned new object of the expected type.
    ```java
    Optional<String> nameOptional = Optional.of("Altair");
    Optional<Integer> lengthOptional = nameOptional.map(String::length);
    ```

  - `Optional.flatMap(...)` is same as `Optional.map(...)`. 
  The difference is *map*'s *Function.apply* method takes unwrapped value; where *flatMap* takes Optional wrapped value, unwrap it first, then transfrom it.

    Suppose we have the following,
    ```java
    public class Hero {
      
      private String name;

      public Hero(String name) {
        this.name = name;
      }

      public Optional<String> getName() {
        return Optional.ofNullable(name);
      }
    }
    ```
    Here, want A hero's name's *length* as optional.
    If we use `map` method here:
    ```java
    Optional<Hero> heroOptional = Optional.of(new Hero("Altair"));
    Optional<Optional<String>> nameOptionalWrapper = heroOptional.map(Hero::getName);
    Optional<String> nameOptional = nameOptionalWrapper.orElse(Optional.empty());
    Optional<Integer> nameLengthOptional = nameOptional.map(String::length);
    ```
    In this case, if we use `flatMap` instead:
    ```java
    Optional<Hero> heroOptional = Optional.of(new Hero("Altair"));
    Optional<String> nameOptional = heroOptional.flatMap(Hero::getName);
    Optional<Integer> nameLengthOptional = nameOptional.map(String::length);
    ```

  - **Java 9** introduced `Optional.stream()` method. 
  It treats optional instance as a `Stream`. 
  So we can use various `Stream API` functionality for optional, such as *collect*, *map*, *filter*, *flatMap* etc.
    ```java
    List<String> nameList = Optional.of("Altair").stream().collect(Collectors.toList());
    ```

## Conclusion
Optional is one of the powerful tools of Java's arsenal.
We can construct complex logic by chaining various optionals functionalities together as it empathizes Stream API flow.
But, we need to be careful with using optional. 
Using optional in unnecessary places can create some boiler-plate code. 
Again optional is not meant to used as method param, because *Optional Wrapper* can be null just like any other java object. 
So stick it in your mind, 

**Use Optional as method return type, Never use Optional as method's param type.**