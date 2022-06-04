---
layout: post
title: "Functional programming in C#"
name: "2022-02-19-functional-programming-csharp"
description: "A simple C# program to convert a string to capitalize every word."
keywords: "c#,extension methods in .net,.net core,.net sdk,functional programming,technical article,blog,post"
date: 2022-02-19
---

Inspired by [rescript pipe operator](https://rescript-lang.org/docs/manual/latest/pipe).

<p>Create a new console project mycsapp using dotnet CLI and open it with VS Code.</p>

<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;dotnet new console -o mycsapp</p>
<p class="cmd">C:\&gt;Users&gt;Dev1&gt;Desktop&gt;code mycsapp</p>

<p>Open folder in VS Code and replace below code in Program.cs.</p>

{% highlight csharp %}
Func<string, string> capitalize = s => s.Substring(0, 1).ToUpper() + s.Substring(1);

public static class Extensions
{
    public static string[] Split(this string src, char byChar)
    {
        return src.Split(new char[]{ byChar });
    }

    public static IEnumerable<string> Map(this string[] src, Func<string, string> transform)
    {
        foreach(var str in src)
        {
            yield return transform(str);
        }
    }

    public static string Join(this IEnumerable<string> src, char glue)
    {
        return string.Join(glue, src);
    }
}

var res = "hello world"
              .Split(' ')
              .Map(capitalize)
              .Join(' ');
                
Console.WriteLine(res);
{% endhighlight %}

<p class="cmd">PS C:\&gt;Users&gt;Dev1&gt;Desktop&gt;mycsapp&gt;<span style="color:yellow">dotnet</span> run</p>
<b>Output:</b>
<p class="output">
Hello World
</p>