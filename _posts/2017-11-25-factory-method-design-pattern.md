---
layout: post
title: "Factory Method Design Pattern"
name: "2017-11-25-factory-mthod-design-pattern"
description: "Simple example of Factory Method design pattern."
tags: "c#,.net,.net core,factory design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2017-11-25
---

<p>Factory Method design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://viksrirangam.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>. The intent of Factory Method pattern is hiding creation of objects from the client by using a common interface. Client awares of all subclasses of family and instead client creating objects for these family of types it depends on common interface and requests for objects. The difference between Factory and Factory Method pattern is here we can have creation logic defer to the sub class. Thus allowing us to initialize the object via a common interface.</p>

<p>
    <figure>
      <img class="diagram" src="/images/FactoryMethodPattern.png" alt="Factory Method Pattern UML Diagram" width="700px" height="630px" />
      <figcaption>Factory Method Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

using static System.Console;

namespace PatternsDemo
{
    interface IAsset
    {
        void Print();
    }

    class StockAsset : IAsset
    {
        public void Print()
        {
            Console.WriteLine("Stock asset!");
        }
    }

    class BondAsset : IAsset
    {
        public void Print()
        {
            Console.WriteLine("Bond asset!");
        }
    }

    abstract class AssetFactory
    {
        public abstract IAsset Create();

        public static T Get<T>() where T : AssetFactory, new()
        {
            return new T();
        }
    }

    class ConcreteStockAsset : AssetFactory
    {
        public override IAsset Create()
        {
			//object creation customization
            return new StockAsset();
        }
    }

    class ConcreteBondAsset : AssetFactory
    {
        public override IAsset Create()
        {
			//object creation customization
            return new BondAsset();
        }
    }

    public class Demo
    {
        public static void Main(string[] args)
        {
            IAsset bond = AssetFactory.Get<ConcreteBondAsset>().Create();
            bond.Print();

            IAsset stock = AssetFactory.Get<ConcreteStockAsset>().Create();
            stock.Print();
        }
    }
}

{% endhighlight %}

<b>Output:</b>
<p class="output">
Bond asset!<br>
Stock asset!
</p>