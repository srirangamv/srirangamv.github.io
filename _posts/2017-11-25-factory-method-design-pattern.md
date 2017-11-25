---
layout: post
title: "Factory Method Design Pattern"
name: "2017-11-25-factory-mthod-design-pattern"
description: "Simple example of Factory Method design pattern."
date: 2017-11-25
---

<p>Factory design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://vwtt.github.io/blog/2016/11/20/design-patterns-overview" target="_blank">here</a>. The intent of Factory pattern is hiding creation of objects from the client by using a common interface. Client awares of all subclasses of family and instead client creating objects for these family of types it depends on common interface and requests for objects.</p>

<p>
    <figure>
      <img src="/images/FactoryMethodPattern.png" alt="Factory Method Pattern UML Diagram" width="606px" height="545px" />
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
            return new StockAsset();
        }
    }

    class ConcreteBondAsset : AssetFactory
    {
        public override IAsset Create()
        {
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