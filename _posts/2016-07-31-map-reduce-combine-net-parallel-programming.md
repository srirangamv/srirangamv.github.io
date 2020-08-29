---
layout: post
title: "Map, Reduce and Combine with .Net Parallel Programming"
name: "2016-07-30-map-reduce-combine-net-prallel-programming"
description: "Map, Reduce and Combine with .Net Parallel Programming"
tags: "c#,.net,.net core,threading,multi threading,program to processor cores,cpu cores,code,technical article,blog,post"
date: 2016-07-31
---

<p>Here is a simpe word count program using .Net parallel programming which maps a subset of lines to each thread for processing and this thread reduces lines to a dictionary to keep the word count. And a combiner function merges this local dictionaries with global result. Essentially, reducing phase executed on different cores of processor parallelly.</p>
<!--more-->

{% highlight csharp %}

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

using static System.Console;

namespace netcoreapp
{    
    public class Program
    {
        public static void Main(string[] args)
        {
            ConcurrentDictionary<string, int> globalResult = new ConcurrentDictionary<string, int>();
            
            Parallel.ForEach<string[], Dictionary<string, int>>(
                GetLines(), 
                () => new Dictionary<string, int>(),
                (words, loopState, localResult) => //reducer
                {
                    foreach(var word in words)
                    {
                        if(!localResult.ContainsKey(word))
                        {
                            localResult[word] = 1;
                        }else
                        {
                            localResult[word] += 1;
                        }   
                    }       

                    return localResult;
                },
                (local) => { //combiner
                    foreach(var keyword in local.Keys)
                    {
                        if(!globalResult.ContainsKey(keyword))
                        {
                            globalResult[keyword] = local[keyword];
                        }else
                        {
                            globalResult[keyword] += local[keyword];
                        }   
                    }  
                }
            );
            
            WriteLine($"Word\t\t:Count");
            foreach(var keyword in globalResult.Keys)
            {
                WriteLine($"{keyword}\t\t\t\t:{globalResult[keyword]}");
            }
        }
        
        //mapper
        public static IEnumerable<string[]> GetLines()
        {
            foreach(var line in File.ReadLines("inputtext.txt"))
            {
                yield return line.Split(new char[]{' '});
            }
        }
    }
}

{% endhighlight %}

<b>Output:</b>
<p class="output">
Word    :Count
<br>
The             :5
...
</p>