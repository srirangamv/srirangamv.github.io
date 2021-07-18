---
layout: post
title: "Chain of Responsibility Design Pattern"
name: "2020-08-15-chainofresponsibility-design-pattern"
description: "Simple example of chain of responsibility design pattern."
tags: "c#,.net,.net core,chain of responsibility design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2020-08-15
---

<p>The intent of Chain of Responsibility pattern is separating object construction and its represenation. Here builder knows how to build a complex object and we also need a Director class, essentially a helper class which know what to build. Director uses Builder class (one or more builder classes) and helps in building the complex object.</p>
<p>Builder design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://srirangamv.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>.<p>

<p>
    <figure>
      <img src="/images/BuilderPattern.png" alt="Builder Pattern UML Diagram" width="716px" height="185px" />
      <figcaption>Builder Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
    public class PayLoad
    {
        public int data{get;set;}
    }

    public abstract class IHandler
    {
        public IHandler next;
        
        public abstract void Handle(PayLoad payLoad);
    
        public void Execute(PayLoad payLoad)
        {
            Handle(payLoad);

            if(next != null)
            {
                next.Handle(payLoad);
            }

        }
    }

    public class CoR
    {
        private IHandler _chain;

        public void Use(IHandler next)
        {
            if(_chain == null)
            {
                _chain = next;
            }
            else
            {
                IHandler temp = _chain;
                while(temp.next != null)
                    temp = temp.next;

                temp.next = next;
            }
        }

        public void Run(PayLoad payLoad)
        {
            IHandler temp = _chain;
            
            while(temp != null)
            {
                temp.Handle(payLoad);
                temp = temp.next;
            }   
            Console.WriteLine(payLoad);
        }

        public static void Main()
        {
            var chain = new CoR();
            
            // we can create as many responsibilities
            chain.Use(new Resp1());
            chain.Use(new Resp2());
            chain.Use(new Resp3());

            chain.Run(new PayLoad(){ data=6});
        }
    }

    public class Resp1: IHandler
    {
        public override void Handle(PayLoad payLoad)
        {
            payLoad.data = payLoad.data * 2;
        }
    }

    public class Resp2: IHandler
    {
        public override void Handle(PayLoad payLoad)
        {
            payLoad.data = payLoad.data * 5;
        }
    }

    public class Resp3: IHandler
    {
        public override void Handle(PayLoad payLoad)
        {
            payLoad.data = payLoad.data * 3;
        }
    }
}

{% endhighlight %}