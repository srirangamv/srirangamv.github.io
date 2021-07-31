---
layout: post
title: "How to enable C# 7.1 support in VS Code?"
name: "2018-05-13-enable_csharp7.1_features_vs_code"
description: "How to enable C# 7.1 support in VS Code."
tags: "c#,.net,.net core,editor,visual studio code,code,technical article,blog,post"
date: 2018-05-13
---

<p>Create a new console project mycs71app using dotnet CLI and open it with VS Code as shown below. To enable C#7.1 new language features in the project we need to edit project file.</p>

<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;dotnet new console -o mycs71app</p>
<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;code mycs71app</p>

<p>Open folder in VS Code and replace below code in Program.cs. Here we are trying async Main which needs C#7.1.</p>

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

<p>Add/Update highlighted entry in .csproj file and save it.</p>

<p>
    <figure>
      <img class="diagram" src="/images/Enable71_Two.png" alt="Visual Studio Code Folder" width="833px" height="460px" />
      <figcaption>Visual Studio Code Editing</figcaption>
    </figure>    
</p>

<p>Build and Run using dotnet commands as shown below using VS Code's Integrated Terminal.</p>

<p class="cmd">PS C:\&gt;Users&gt;Dev1&gt;Desktop&gt;mycs71app&gt;<span style="color:yellow">dotnet</span> build</p>
<p class="cmd">PS C:\&gt;Users&gt;Dev1&gt;Desktop&gt;mycs71app&gt;<span style="color:yellow">dotnet</span> run</p>
<b>Output:</b>
<p>
    <figure>
      <img class="diagram" src="/images/Enable71_Three.png" alt="Visual Studio Code Folder" width="833px" height="460px" />
      <figcaption>Visual Studio Code Execution</figcaption>
    </figure>    
</p>