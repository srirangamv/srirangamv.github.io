---
layout: post
title: "Factory Design Pattern"
name: "2016-11-26-factory-design-pattern"
description: "Simple example of Factory design pattern."
tags: "c#,.net,.net core,factory design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2016-11-26
---

<p>Factory design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://viksrirangam.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>. The intent of Factory pattern is hiding creation of objects from the client by using a common interface. Client awares of all subclasses of family and instead client creating objects for these family of types it depends on common interface and requests for objects.</p>

<p>
    <figure>
      <img class="diagram" src="/images/FactoryPattern.png" alt="Factory Pattern UML Diagram" width="606px" height="448px" />
      <figcaption>Factory Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

using static System.Console;

namespace PatternsDemo
{
    public class ShapeFactory
    {
        public static T Get<T>() where T: Shape, new()
        {
            return new T();
        }
    }
    
    public abstract class Shape
    {
        public abstract void Draw();
        public abstract double Area{ get; }
    }
    
    public class Rectangle : Shape
    {
        public double Breadth{ get; set;}
        public double Length{ get; set;}
        
        public override double Area => Breadth * Length;
        
        public override void Draw()
        {
            WriteLine($"I'm a rectangle with breadth: {Breadth}, length: {Length} and area: {Area}");
        }
    }
    
    public class Circle : Shape
    {
        public double Radius{ get; set;}
        
        public override double Area => System.Math.PI * Radius * Radius;
        
        public override void Draw()
        {
            WriteLine($"I'm a circle with radius: {Radius} and area: {Area}");
        }
    }

    public static void Main(string[] args)
    {
        Rectangle rect = ShapeFactory.Get<Rectangle>();

        rect.Breadth = 200;
        rect.Length = 120;
        rect.Draw();

        Circle circ = ShapeFactory.Get<Circle>();

        circ.Radius = 70;
        circ.Draw();
    }
}

{% endhighlight %}

<b>Output:</b>
<p class="output">
I'm a rectangle with breadth: 200, length: 120 and area: 24000<br>
I'm a circle with radius: 70 and area: 15393.80400259
</p>