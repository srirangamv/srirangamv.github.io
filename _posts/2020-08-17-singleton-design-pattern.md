---
layout: post
title: "Singleton Design Pattern"
name: "2020-08-17-singleton-design-pattern"
description: "Simple example of Singleton design pattern."
tags: "c#,.net,.net core,singleton pattern,code,design patterns,UML,unified modeling language,technical article,blog,post"
date: 2020-08-17
---

<p>Singleton design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://srirangamv.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>. The intent of Singleton pattern is to restricting many instances of a class and make sure only one instance is created and used all the places. Some cases, you wanted to centeralize logic in only one place to generate a sequence of numbers which should be unique across the application. Or you may want to provide centralized access to a costly/shared resource inside the application.</p>

<p>
    <figure>
      <img src="/images/SinglePattern.png" alt="Singleton Pattern UML Diagram" width="426px" height="205px" />
      <figcaption>Singleton Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public class SomeSpecialIdGenerator
    {
        private static Lazy<SomeSpecialIdGenerator> _instance = new Lazy<SomeSpecialIdGenerator>(
            ()=> new SomeSpecialIdGenerator()
        );

        public static SomeSpecialIdGenerator Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        private SomeSpecialIdGenerator()
        {

        }

        public string GetNextId()
        {
            return "guid-123456789";
        }
    }
}

{% endhighlight %}