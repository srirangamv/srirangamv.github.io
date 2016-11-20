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

### Creational Patterns
<p>
These patterns are based on how the objects are created and constructed to solve a problem. For example having only object is a common problem and singleton pattern in this category provides a documented sample for you to design a class which is signlton and multiple objects cannot be created for that. Below are the list of creational patterns.
</p>

    * Abstract Factory
    * Builder
    * Factory
    * Prototype
    * Singleton

### Structural Patterns
<p>
These design patterns are based on how class and object composed of and structured using object oriented techniques. For example some times we need to deal with incompatible interfaces and an adapter pattern in this category addresses this issue with providing another interface that could act like a bridge between this two incompatible types. Below are the list of structural patterns.
</p>

    * Adapter
    * Bridge
    * Composite
    * Decorator
    * Facade
    * Flyweight
    * Proxy
    
### Behavioral Patterns
<p>
These design patterns are based how objects behaves. For example some times we need to notify certain state changes of an object to several other objects. Observer pattern addresses this issue and provide guideline for implementing this issue. Below are the list of behavioral patterns.
</p>

    * Chain of responsibility
    * Command
    * Interpreter
    * Iterator
    * Mediator
    * Memento
    * Observer
    * State
    * Strategy
    * Template method
    * Visitor