---
layout: post
title: "Bridge Design Pattern"
name: "2021-07-18-bridge-design-pattern"
description: "Simple example of Bridge design pattern."
tags: "c#,.net,.net core,bridge pattern,code,design patterns,UML,unified modeling language,technical article,blog,post"
date: 2021-07-18
---

<p>Builder design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://vwtt.github.io/blog/design-patterns-overview" target="_blank">here</a>. The intent of Builder pattern is separating object construction and its represenation. Here builder knows how to build a complex object and we also need a Director class, essentially a helper class which know what to build. Director uses Builder class (one or more builder classes) and helps in building the complex object.</p>

<p>
    <figure>
      <img src="/images/BridgePattern.png" alt="Bridge Pattern UML Diagram" width="716px" height="185px" />
      <figcaption>Bridge Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{
//Bridge: Separates an object’s interface from its implementation
//It's about letting implementations evolve independently. 

    public class WindowsThread
    {
        public void Run(Action a)
        {
            a();
        }
    }

    public class UnixThread
    {
        public void Apply(Action a)
        {
            a();
        }
    }

    public class LinuxThread
    {
        public void Execute(Action a)
        {
            a();
        }
    }

    public interface IThread
    {
        void Create();
        void Run(Action a);
    }

    public class PosixThreadThatWorksWithWondowsThread: IThread
    {
        private WindowsThread _t;

        public void Create()
        {
            _t = new WindowsThread();
        }

        public void Run(Action a)
        {
            _t.Run(a);
        }
    }

    public class PosixThreadThatWorksWithLinuxThread: IThread
    {
        private LinuxThread _t;

        public void Create()
        {
            _t = new LinuxThread();
        }

        public void Run(Action a)
        {
            _t.Execute(a);
        }
    }

    public class PosixThreadThatWorksWithUnixThread: IThread
    {
        private UnixThread _t;
        
        public void Create()
        {
            _t = new UnixThread();
        }

        public void Run(Action a)
        {
            _t.Apply(a);
        }
    }
}

{% endhighlight %}