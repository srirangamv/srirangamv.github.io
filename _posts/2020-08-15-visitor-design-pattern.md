---
layout: post
title: "Visitor Design Pattern"
name: "2020-08-15-visitor-design-pattern"
description: "Simple example of Visitor design pattern."
date: 2020-08-15
---

<p>Visitor design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://vwtt.github.io/blog/design-patterns-overview" target="_blank">here</a>. The intent of Visitor pattern is allowing another class to read the data from another several classes without violating object orientation rules. Here the several classes implements a common interface using that these classes share the internal data to the external client (in this case client is a visitor). Take a real example of a food inspector visiting several hotels, restaurants and other food chains for inspection.</p>

<p>
    <figure>
      <img src="/images/VisitorPattern.png" alt="Visitor Pattern UML Diagram" width="716px" height="185px" />
      <figcaption>Visitor Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public class FoodInfo
    {
        public string FoodItem{get;set;}
        public DateTime PurchaseDate{get;set;}
        public string SecretInfo{get;set;}
    }

    public interface IVisitor{

        ICollection<FoodInfo> Visit();
    }

    public class Hotel : IVisitor
    {
        List<FoodInfo> foodInfos=new List<FoodInfo>()
        {
            new FoodInfo(){ FoodItem="one", SecretInfo="masala", PurchaseDate=DateTime.Now},
            new FoodInfo(){ FoodItem="two", SecretInfo="some seed oil", PurchaseDate=DateTime.Now}
        };

        public ICollection<FoodInfo> Visit()
        {            
            return foodInfos.Select(a=>new FoodInfo(){FoodItem = a.FoodItem, PurchaseDate = a.PurchaseDate}).ToList();            
        }
    }

    public class Restaurant: IVisitor
    {
        List<FoodInfo> foodInfos=new List<FoodInfo>()
        {
            new FoodInfo(){ FoodItem="three", SecretInfo="masala", PurchaseDate=DateTime.Now},
            new FoodInfo(){ FoodItem="four", SecretInfo="some seed oil", PurchaseDate=DateTime.Now}
        };

        public ICollection<FoodInfo> Visit()
        {            
            return foodInfos.Select(a=>new FoodInfo(){FoodItem = a.FoodItem, PurchaseDate = a.PurchaseDate}).ToList();            
        }
    }

    public class FoodInspector
    {
        public void Inspect(IVisitor foodChain)
        {
            var list = foodChain.Visit();
            foreach(var food in list)
            {
                Console.WriteLine(food.PurchaseDate);
            }
        }
    }
}

{% endhighlight %}