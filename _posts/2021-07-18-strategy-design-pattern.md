---
layout: post
title: "Strategy Design Pattern"
name: "2021-07-18-strategy-design-pattern"
description: "Simple example of Strategy design pattern."
tags: "c#,.net,.net core,strategy pattern,code,design patterns,UML,unified modeling language,technical article,blog,post"
date: 2021-07-18
---

<p>Strategy design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://srirangamv.github.io/blog/design-patterns-overview" target="_blank">here</a>. The intent of Strategy pattern is deferring separate algorithm into sub class.  A client uses these concrete strategy implementation depending on the situation, instead of embedding different algorithms into client class and use them based on a condition. we can introduce as many strategy classes/implemntation in the future without touching the client object.</p>

<p>
    <figure>
      <img src="/images/StrategyPattern.png" alt="Strategy Pattern UML Diagram" width="655px" height="185px" />
      <figcaption>Strategy Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public interface IDiscoutStrategy
    {
        double Apply(double d);
    }

    public class FestivalDisount : IDiscoutStrategy
    {
        public double Apply(double d)
        {
            return d * (1 - 0.05);
        }
    }

    // ...we can have n number of strategy
    public class StudentDisount : IDiscoutStrategy
    {
        public double Apply(double d)
        {
            return d * (1 - 0.15);
        }
    }

    public class Order
    {
        public double BasketAmount{get; private set;}

        public double AmountToPay{get; private set;}        
    }

    public class OrderService
    {
        public void ApplyDiscount(Order order, IDiscoutStrategy strategy)
        {
            AmountToPay = strategy.Apply(order.BasketAmount);
        }
    }
}

{% endhighlight %}