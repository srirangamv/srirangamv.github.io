---
layout: post
title: "Builder Design Pattern"
name: "2020-08-15-builder-design-pattern"
description: "Simple example of Builder design pattern."
tags: "c#,.net,.net core,builder design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2020-08-15
---

<p>Builder design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://viksrirangam.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>. The intent of Builder pattern is separating object construction and its represenation. Here builder knows how to build a complex object and we also need a Director class, essentially a helper class which know what to build. Director uses Builder class (one or more builder classes) and helps in building the complex object.</p>

<p>
    <figure>
      <img class="diagram" src="/images/BuilderPattern.png" alt="Builder Pattern UML Diagram" width="699px" height="181px" />
      <figcaption>Builder Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public class CarBuilder
    {
        public void BuildChasis(Car c){}
        public void BuildFrontSideDoor(Car c){}
        public void BuildBackSideDoor(Car c){}
        public void BuildBody(Car c){}
        public void BuildTop(Car c){}
        public void BuildCarTrain(Car c){}
        public void BuildDicky(Car c){}
    }

    // the complex object.
    public class Car
    {

    }

    public class Director
    {
        private CarBuilder _builder;
        public Director(CarBuilder b)
        {
            _builder = b;
        }

        public Car BuildToplessCar()
        {
            Car c = new Car();
            _builder.BuildChasis(c);
            _builder.BuildCarTrain(c);
            _builder.BuildBody(c);
            _builder.BuildDicky(c);
            return c;
        }

        public Car BuildDickylessCar()
        {
            Car c = new Car();
            _builder.BuildChasis(c);
            _builder.BuildCarTrain(c);
            _builder.BuildBody(c);
            return c;
        }

        /*...so on *...*/
    }
}

{% endhighlight %}