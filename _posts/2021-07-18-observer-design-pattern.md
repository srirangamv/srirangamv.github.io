---
layout: post
title: "Observer Design Pattern"
name: "2021-07-18-observer-design-pattern"
description: "Simple example of Observer design pattern."
tags: "c#,.net,.net core,observer pattern,code,design patterns,UML,unified modeling language,technical article,blog,post"
date: 2021-07-18
---

<p>Observer design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://srirangamv.github.io/blog/design-patterns-overview" target="_blank">here</a>. The intent of Observer pattern is separating object construction and its represenation. Here builder knows how to build a complex object and we also need a Director class, essentially a helper class which know what to build. Director uses Builder class (one or more builder classes) and helps in building the complex object.</p>

<p>
    <figure>
      <img src="/images/ObserverPattern.png" alt="Observer Pattern UML Diagram" width="716px" height="185px" />
      <figcaption>Observer Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public interface IObservable
    {
        void Notify(double Price);
    }

    public class Ticker
    {
        private List<IObservable> clients;
        public double _price{get; private set;}

        public double Price
        {
            get
            {
                return _price;
            } 

            private set
            {
                _price =value;

                foreach(var client in clients)
                {
                    client.Notify(_price);
                }
            }
        }

        public void Subscribe(IObservable obj)
        {
            this.clients.Append(obj);
        }
    }
}

{% endhighlight %}