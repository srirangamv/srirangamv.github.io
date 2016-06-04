---
layout: post
title: "Recursive and memoized Fibonacci series"
date: 2016-06-04
---

<p>Below is the sample code for recursive and memoized version of fibonacci series in C#. </p>


{% highlight csharp %}
using System;
using System.Collections.Generic;

namespace FibonacciDemo{
	class Program{
		public static void Main(string[] args){
			Fibonacci fibonacciSeries = new Fibonacci();
		
			Console.WriteLine(fibonacciSeries[0]);
			Console.WriteLine(fibonacciSeries[1]);
			Console.WriteLine(fibonacciSeries[2]);
			Console.WriteLine(fibonacciSeries[3]);						
			Console.WriteLine(fibonacciSeries[10]);	 //4th, 5th, ..10th fibonacci numbers are calculated and stored.							
			Console.WriteLine(fibonacciSeries[10]); //10th fibonacci number will be fetched from store.
			Console.WriteLine(fibonacciSeries[10]); //10th fibonacci number will be fetched from store.
			
			Console.ReadKey();
		}
	}
	
            /* this should be a singleton*/
	class Fibonacci{
		private Dictionary<int, int> store 
			= new Dictionary<int, int>()
						{
							{
								0, 1	
							},
							{
								1, 1	
							}
						};
	    														
		public int this[int i]{
			get{				
				if(!store.ContainsKey(i)){
					store[i] = this[i - 1] + this[i - 2];
				}
				
				return store[i];
			}
			private set{
				store[i] = value;
			}
		}
	}
}
{% endhighlight %}


<p>Code below will not work as store is private hence, we cannot modify/alter it.</p>
{% highlight csharp %}
			Console.WriteLine(fibonacciSeries.store);
{% endhighlight %}

<p>also we cannot set the fibonacci value from outside explicitely as the indexer property is of private set.</p>
{% highlight csharp %}
			fibonacciSeries[11] = 144;
{% endhighlight %}