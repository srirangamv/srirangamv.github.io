---
layout: post
title: "How to enable C# 7.1 support in VS Code"
name: "2018-05-13-enable_csharp7.1_features_vs_code"
description: "How to enable C# 7.1 support in VS Code."
date: 2018-05-13
---

<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;dotnet new console -o mycs71app</p><br>  
<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;code mycs71app</p><br>

<p>
    <figure>
      <img src="/images/Enable71_One.png" alt="Open Visual Studio Code Folder" width="489px" height="289px" />
      <figcaption>Visual Studio Code Folder</figcaption>
    </figure>    
</p>

<p>Replace below code in Program.cs</p>

{% highlight csharp %}
using System;
using System.Threading.Tasks;

namespace mycs71app
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await Task.Delay(0);

            Console.WriteLine("Hello World!");
        }
    }
}
{% endhighlight %}

<p>Add/Update highlighted entry in .csproj file and save</p>

<p>
    <figure>
      <img src="/images/Enable71_Two.png" alt="Open Visual Studio Code Folder" width="489px" height="289px" />
      <figcaption>Visual Studio Code Folder</figcaption>
    </figure>    
</p>

<p>Build and Run using dotnet commands as shown below using Integrated Terminal.</p>

<p class="cmd">PS C:\&gt;Users&gt;Dev1&gt;Desktop&gt;mycs71app&gt;dotnet build</p>
<p class="cmd">PS C:\&gt;Users&gt;Dev1&gt;Desktop&gt;mycs71app&gt;dotnet build</p>
<b>Output:</b>
<p>
    <figure>
      <img src="/images/Enable71_Three.png" alt="Open Visual Studio Code Folder" width="489px" height="289px" />
      <figcaption>Visual Studio Code Folder</figcaption>
    </figure>    
</p>