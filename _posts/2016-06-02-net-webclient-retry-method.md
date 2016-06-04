---
layout: post
title: "Retry functions for .Net's weblcient."
date: 2016-06-02
---

<p>Below is the sample code for reusable retry functions for .Net's webclients. Helpful in accessing a web resource and handling error and retry mechanism efficiently.</p>


{% highlight csharp %}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading;

namespace ConsoleApplication3
{
    class Program
    {
        private const int MAX_RETRY_CALLS = 3;
        private const double LONG_WAIT = 5;
        private const double SHORT_WAIT = 1;
        private static readonly TimeSpan longWait = TimeSpan.FromSeconds(LONG_WAIT);
        private static readonly TimeSpan shortWait = TimeSpan.FromSeconds(SHORT_WAIT);

        private void Retry<T>(Action<T> retryAction) where T : WebClient, new()
        {
            var retryCount = 0;
            using (var ctx = new T())
            {
                for (; ; )
                {
                    try
                    {
                        retryAction(ctx);
                        break;
                    }
                    catch (WebException ex)
                    {
                        if (ex.Status != WebExceptionStatus.Timeout)
                            throw;

                        retryCount++;
                        if (retryCount < MAX_RETRY_CALLS)
                        {
                            Console.WriteLine("waiting for a sec...");
                            Thread.Sleep(ex.Status == WebExceptionStatus.Timeout ?
                                                                    longWait : shortWait);
                        }
                        else
                        {
                            Console.WriteLine("max calls reached");
                            //return;
                            break;
                        }
                    }
                }
            }
        }

        private string Retry<T>(Func<T, string> retryAction) where T : WebClient, new()
        {
            string result = String.Empty;

            var retryCount = 0;
            using (var ctx = new T())
            {
                for (; ; )
                {
                    try
                    {
                        result = retryAction(ctx);
                        break;
                    }
                    catch (WebException ex)
                    {
                        if (ex.Status != WebExceptionStatus.Timeout)
                        {
                            break;
                        }

                        retryCount++;
                        if (retryCount < MAX_RETRY_CALLS && ex.Status == WebExceptionStatus.Timeout)
                        {
                            Console.WriteLine("waiting for a sec...");
                            Thread.Sleep(ex.Status == WebExceptionStatus.Timeout ?
                                                                    longWait : shortWait);
                        }
                        else
                        {
                            Console.WriteLine("max calls reached");
                            break;
                        }
                    }
                }
            }

            return result;
        }

        static void Main(string[] args)
        {
            Program p = new Program();

            var action = new Action<WebClient>(p.DoAction);            
            p.Retry(action);


            var dfunc = new Func<WebClient, String>(p.GetResult);
            Console.WriteLine(p.Retry(dfunc));

            Console.ReadKey();
        }

        public void DoAction(WebClient ctx)
        {
            Console.WriteLine("trying..");
            ctx.DownloadString("http://localhost:3000/api/employees");
        }

        public string GetResult(WebClient ctx)
        {
            Console.WriteLine("trying..");
            return ctx.DownloadString("http://localhost:3000/api/employees");
        }
    }
}
{% endhighlight %}