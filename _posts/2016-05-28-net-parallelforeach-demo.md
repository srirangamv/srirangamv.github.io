---
layout: post
title: "Parallel.ForEach demo for finding if a number is prime."
name: "2016-05-28-net-parallelforeach-demo"
description: "Finding if a number is prime parallelly."
date: 2016-05-28
---

<p>Here is a sample code for finding if a number is prime using a Parallel.ForEach loop.  It also uses CancellationToken to avoid  execution of other threads once the number is found divided by any thread.</p>


{% highlight csharp %}
namespace ParallelPrimeFinder
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    class Program
    {
        static void Main()
        {
            long n=48541266581;
            int[] nums = Enumerable.Range(2, Convert.ToInt32(Math.Sqrt(n)) + 1).ToArray();
            
            CancellationTokenSource cts = new CancellationTokenSource();

           // Use ParallelOptions instance to store the CancellationToken
            ParallelOptions po = new ParallelOptions();
            po.CancellationToken = cts.Token;
            po.MaxDegreeOfParallelism = System.Environment.ProcessorCount;

            try
            {
                Parallel.ForEach(nums, po, (num) =>
                {
                    Console.WriteLine("finding prime on Thread: {0}", Thread.CurrentThread.ManagedThreadId);
                    if (n % num == 0)
                    {
                        Console.WriteLine("{0} is not a prime as is divided by {1}. Thread: {2}", n, num, Thread.CurrentThread.ManagedThreadId);
                        cts.Cancel();
                    }

                    po.CancellationToken.ThrowIfCancellationRequested();                    
                });
            }
            catch (OperationCanceledException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                cts.Dispose();
            }

            Console.ReadKey();
        }
    }
}
{% endhighlight %}