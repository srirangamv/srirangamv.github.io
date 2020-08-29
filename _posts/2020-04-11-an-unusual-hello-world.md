---
layout: post
title: "An Unusual Hello World Program"
name: "2020-04-11-an-unusual-hello-world"
description: "An Unusual Hello World Program using Dynamic Code Execution with C#"
tags: "c#,.net,.net core,hello world,reflection,meta programming,dynamic code compilation,code,technical article,blog,post"
date: 2020-04-11
---
<p>Here we will discuss two C# programs which executes a dynamic C# code to print the familiar "Hello World!" message to the console. First one is using Rosalyn platform targeting modern applications with .NET core. he second one is a legacy .NET console application using CodeDOM API.</p>

<p>First program, using Rosalyn scripting APIs, we will print the mesage to the console window. Rosalyn is nickname for .NET Compiler Platform whcih exposed API for compiler services. Using these APIs we can run simple scripts to entire programs. Build syntax trees, anlyze them, compile them and finally execute them. We can use many .NET language compiler services in self hosted programs and execute the code which is dynamically created. In this sample we will execute a simple script consist of interpolated string by passing the values required for it dynamically. Also we compile the same script for multiple execution and execute using a loop for many times passing different parameter each time. Let's ger started by creating a new dotnet core console application.</p>

<p>Run the commands as shown below. Creating application folder and initiating a dotnet core console and application and open the same in VS code editor.</p>
<p class="cmd">
cd rosylindemo<br/>
md rosylindemo<br/>
dotnet new console<br/>
code .<br/>
</p>

<p>once VS Code opens the code fodler from the view menu select terminal and add the below package executing below command. "RunScript" method executes a simple C# statement dynamically by passing runtime parameters in this "Name". And "RunMultipleTimes" method executes the same C# statement compiling first so that we can run multiple times without much overhead. We pass parameters to statement dynamically inside the loop.</p>
<p class="cmd">
dotnet add package Microsoft.CodeAnalysis.CSharp.Scripting
</p>

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
            RunScript();
            RunMultipleTimes();
        }

        public static void RunScript()
        {
            var script = @"$""Hello {Name}!""";            

            var globals = new Globals { Name = "World" };

            var result = await CSharpScript.EvaluateAsync(script, globals: globals) as string;

            Console.WriteLine(result);
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
Hello World!<br/>
Hello World 1!<br/>
Hello World 2!<br/>
Hello World 3!<br/>
Hello World 4!<br/>
Hello World 5!<br/>
Hello World 6!<br/>
Hello World 7!<br/>
Hello World 8!<br/>
Hello World 9!<br/>
Hello World 10!<br/>
</p>

<p>The second program, targetted for classic .NET applications. .NET Framework provides a mechanism called the Code Document Object Model (CodeDOM) using this we can compile dynamic code and generate assemblies from within a .NET program itself. This dynamic assembly generation can be done using any of .NET programming languages at run time, based on a single model that represents the code to execute. Open visual studio create new console app targeting .NET 4.5 framework. Here, we compile C# program and generate a .NET assembly and execute the same assembly to print the "Hello World" on the screen.</p>


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
                StringBuilder errors = new StringBuilder();
                foreach (CompilerError compiler_error in results.Errors)
                {                    
                    errors.Append(
                        "Line: " + compiler_error.Line + ", " +
                        "Error Number: " + compiler_error.ErrorNumber +
                        ", " + compiler_error.ErrorText + "\n");                    
                }

                throw new Exception(errors.ToString());
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