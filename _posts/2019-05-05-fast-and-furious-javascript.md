---
layout: post
title: "JavaScript Reference Cheatsheet"
name: "2019-05-05-fast-and-furious-javascript"
description: "JavaScript Reference Cheatsheet"
date: 2019-05-05
---
<p>Here is the Javascript language reference sheet. Find code <a href="https://github.com/vwtt/PythonCheatSheet" target="_blank" title="javascript cheatsheet repository">here</a>.</p>

# Type System
    Primary
        number, boolean, string, symbol, undefined, null
    Reference 
        Object, Date, Array, Function

# Variables & Scope

# Operators

# Control Structures

# Functions

    function invocation pattens
        function call a(), 
        method call a.b(), 
        a.call
        a.apply

    IIFE (Immediately Invoked Function Expression) 

    Lambdas

    inline functions

    closures

    default arguments

    functinoal programming
        Pure functions      as long as same input goes to function, same output is expected no side-effects
        Function composition    f.g = f(g(x))
        Avoid shared state      Object.assign
        Avoid mutating state    Object.freeze
        Avoid side effects

        first class functions   function is data
        higher order functions  a function that can take a function as argument and can return a function
        imperative vs declarative


# Collections
    Array
    Map
    Set
    WeekMap
    WeekSet

# Iterables

# Objects

    Ways of creating Objects in Javascript
        Literals
        Factory/Functional (revealing pattern)
        Constructor
        Delegation (pseudo-prototype)
        Prototype chain
        ES5 way
        Class ES6 way
        Object.create
        Concatenative Object.assign

    Deep Copy & Shallow Copy

# Mutability
    Object.freeze

# Reactive Systems
    Push
    Pull

# Proxy & MutationObserver    

# Modules
    CommonJs    require-module.exports
    ES6         import-export
    AMD & UMD

# Promises

{% highlight javascript %}
const g = n => n + 1;
const f = n => n * 2;
const wait = time => new Promise(
  (resolve, reject) => setTimeout(
    resolve,
    time
  )
);
wait(300)
  .then(() => 20)
  .then(g)
  .then(f)
  .then(value => console.log(value)); // 42
{% endhighlight %}

# async & await

# Fetch & Axios




