---
layout: post
title: "Design Patterns Overview"
name: "2016-11-20-design-patterns-overview"
description: "Introduction to Design Patterns"
date: 2016-11-20
---

<p>A design pattern is a templated solution created and well documented earlier for a generic and a recurring problem in software design. This documented solution can readily be used to solve the recurring problem.</p>

<p>
There are three categories of design patterns based on the type of problem it addresses.
</p>

##### Creational Patterns
<p>
These patterns are based on how the objects are created and constructed to solve a problem. For example having only object is a common problem and singleton pattern in this category provides a documented sample for you to design a class which is signlton and multiple objects cannot be created for that. Below are the list of creational patterns.
</p>

    1. Abstract Factory
    2. Builder
    3. Factory
    4. Prototype
    5.Singleton

##### Structural Patterns
<p>
These design patterns are based on how class and object composed of and structured using object oriented techniques. For example some times we need to deal with incompatible interfaces and an adapter pattern in this category addresses this issue with providing another interface that could act like a bridge between this two incompatible types. Below are the list of structural patterns.
</p>

    1. Adapter
    2. Bridge
    3. Composite
    4. Decorator
    5. Facade
    6. Flyweight
    7. Proxy
    
##### Behavioral Patterns
<p>
These design patterns are based how objects behaves. For example some times we need to notify certain state changes of an object to several other objects. Observer pattern addresses this issue and provide guideline for implementing this issue. Below are the list of behavioral patterns.
</p>

    1. Chain of responsibility
    2. Command
    3. Interpreter
    4. Iterator
    5. Mediator
    6. Memento
    7. Observer
    8. State
    9. Strategy
    10. Template method
    11. Visitor