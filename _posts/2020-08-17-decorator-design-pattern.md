---
layout: post
title: "Decorator Design Pattern"
name: "2020-08-17-decorator-design-pattern"
description: "Simple example of Decorator design pattern."
tags: "c#,.net,.net core,decorator design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2020-08-17
---

<p>Decorator design pattern is a most often used software design pattern. Please refer to the overview of design patterns <a href="http://viksrirangam.github.io/blog/design-patterns-overview" title="sofware design patterns using c#" target="_blank">here</a>. The intent of Decorator pattern is adding new or additional  responsibilities to objects dynamically without modifying original object. Usually, the new class provide new functionality/responsibility by wrapping the original object.</p>

<p>
    <figure>
      <img class="diagram" src="/images/DecoratorPattern.png" alt="Decorator Pattern UML Diagram" width="656px" height="166px" />
      <figcaption>Decorator Pattern UML Diagram</figcaption>
    </figure>    
</p>

{% highlight csharp %}

namespace PatternsDemo
{    
    public class Fibonacci
    {
        public int GetFibonacci(int n)
        {
            int a = 0, b = 1, c = 0;

            while(n>2)
            {
                c = a + b;
                a=b;
                b=c;
                n--;
            }

            return c;
        }
    }

    public class MemoizedFibonacci
    {
        private Fibonacci fibonacci= new Fibonacci();
        
        private Dictionary<int, int> dict= new Dictionary<int, int>();

        public int GetFibonacci(int n)
        {
            if(dict.ContainsKey(n))
            {
                return dict[n];
            }
            else
            {
                var ret = fibonacci.GetFibonacci(n);
                dict[n] = ret;
                return ret;
            }
        }
    }
}

{% endhighlight %}