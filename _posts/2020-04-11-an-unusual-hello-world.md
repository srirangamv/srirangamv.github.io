---
layout: post
title: "An Unusual Hello World Program"
name: "2020-04-11-an-unusual-hello-world"
description: "An Unusual Hello World Program using Dynamic Code Execution with C#"
date: 2020-04-11
---
<p>Here is a simple way of implementing enums in JavaScript with ES6 Proxies.</p>

<p class="cmd">
cd rosylindemo<br\>
md rosylindemo<br\>
dotnet new console<br\>
code .<br\>
</p>

on Terminal => dotnet add package Microsoft.CodeAnalysis.CSharp.Scripting

{% highlight csharp %}
using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Scripting;

namespace HelloRoslyn
{
    public class Globals
    {
        public string Name;
    }

    public class Program
    {
        public static async Task Main()
        {
            var script = @"$""Hello {Name}!""";            

            var globals = new Globals { Name = "World" };

            var result = await CSharpScript.EvaluateAsync(script, globals: globals) as string;

            Console.WriteLine(result);

            RunMultipleTimes();
        }

        public static async void RunMultipleTimes()
        {
            var code = @"$""Hello {Name}!""";

            var script = CSharpScript.Create<string>(code, globalsType: typeof(Globals));
            script.Compile();


            for (int i = 1; i <= 10; i++)
            {
                var param = $"World {i}";
                var str = (await script.RunAsync(new Globals { Name = param})).ReturnValue;
                Console.WriteLine(str);
            }
        }
    }
}
{% endhighlight %}

<p class="cmd">
dotnet build<br/>
dotnet run<br/>
</p>

<b>Output:</b>
<p class="output">
Hello World!
Hello World 1!
Hello World 2!
Hello World 3!
Hello World 4!
Hello World 5!
Hello World 6!
Hello World 7!
Hello World 8!
Hello World 9!
Hello World 10!
</p>

************************CodeDom example************************
open visual studio
create new console app targeting .NET 4.5 framework


{% highlight csharp %}
using System;
using System.CodeDom.Compiler;
using System.Reflection;
using System.Text;

namespace CodeDomDemo
{
    class Program
    {
        public static void Main(string[] args)
        {
            var script = @"
                using System;

                namespace Hello 
                {
                    public class Program
                    {
                        public static string Main(string parameter) 
                        { 
                            return string.Format(""Hello {0}!"", parameter);
                        } 
                    } 
                }";

            object[] method_params = new object[]
                {
                    "World"
                };

            var greeting = Execute(script, method_params) as string;

            Console.WriteLine(greeting);
        }

        static object Execute(string script, object[] method_params)
        {
            object result = null;

            CodeDomProvider code_provider = CodeDomProvider.CreateProvider("C#");

            CompilerParameters parameters = new CompilerParameters();
            parameters.GenerateInMemory = true;
            parameters.GenerateExecutable = false;

            CompilerResults results = code_provider.CompileAssemblyFromSource(parameters, script);

            if (results.Errors.Count > 0)
            {
                foreach (CompilerError compiler_error in results.Errors)
                {
                    StringBuilder errors = new StringBuilder();
                    errors.Append(
                        "Line: " + compiler_error.Line + ", " +
                        "Error Number: " + compiler_error.ErrorNumber +
                        ", " + compiler_error.ErrorText + "\n");

                    throw new Exception(errors.ToString());
                }
            }
            else
            {
                Assembly loAssembly = results.CompiledAssembly;
                object loObject = loAssembly.CreateInstance("Hello.Program");
                if (loObject == null)
                {
                    throw new Exception("Couldn't load class.");
                }
                
                try
                {
                    result = loObject.GetType().InvokeMember(
                                     "Main", BindingFlags.InvokeMethod,
                                     null, loObject, method_params) as string;
                    
                }
                catch (Exception loError)
                {
                    throw new Exception(loError.Message);
                }
            }

            return result;
        }
    }
}
{% endhighlight %}

<b>Output:</b>
<p class="output">
Hello World!
</p>