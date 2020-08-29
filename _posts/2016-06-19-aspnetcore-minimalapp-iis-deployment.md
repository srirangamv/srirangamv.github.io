---
layout: post
title: "Asp.Net Core app, IIS deployment."
name: "2016-06-19-aspnetcore-minimalapp-iis-deployment"
description: "Deploying AspNet Core application to IIS."
tags: "c#,.net core,asp.net core,mvc,dotnet cli,IIS,middleware,code,technical article,blog,post"
date: 2016-06-19
---

<p>
So far we have run aspnet core application using the new Kestel web server. Please find the previous article <a href="http://vwtt.github.io/blog/2016/06/05/aspnetcore-minimalapp" target="_blank">here</a> and code <a href="https://github.com/vwtt/aspnetcoreminapp" target="_blank">here</a> to start with. Let's deploy this application to IIS. 
You need to prepare your IIS for AspNet core application deployment. <br><br>Firstly,  install AspNet Core module  from <a href="https://go.microsoft.com/fwlink/?LinkId=798480" title="AspNet Core Windows Hosting" target="_blank">here</a>.
Make sure ASpNetCoreModule is listed in the IIS modules after the installation. In order to run aspnet core application on IIS we need to do some changes to the application.
<br><br>Below are the changes:
</p>

<p>Update the <b><i>project.json</i></b> file to add the AspNet Core IIS integration package as a dependency:</p>

{% highlight javascript %}

    "Microsoft.AspNetCore.Server.IISIntegration": "1.0.0-rc2-final"
    
{% endhighlight %}

Restore the packages:

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet restore </p>


<p>Update the code in <b><i>Program.cs</i></b> to use IIS integration as shown below.</p>

{% highlight csharp %}

    using System;
    using System.IO;
    using Microsoft.AspNetCore.Hosting;

    namespace aspnetcoreapp
    {
        public class Program
        {
            public static void Main(string[] args)
            {    
                		
                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseIISIntegration()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseStartup<Startup>()
                    .Build();

                host.Run();
            }
        }
    }

{% endhighlight %}

Add a new web.config file in the roor directory of the application.

{% highlight csharp %}

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
      <system.webServer>
        <handlers>
          <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModule" resourceType="Unspecified" />
        </handlers>
        <aspNetCore processPath="dotnet" arguments=".\aspnetcoremvcapp.dll"  stdoutLogEnabled="true"  stdoutLogFile=".\logs\stdout" />
      </system.webServer>
    </configuration>
    
{% endhighlight %}    

<p>Update the <b><i>project.json</i></b> file so that <b><i>Views</i></b> folder and <b><i>web.config</i></b> files are published.</p>

{% highlight javascript %}

    "publishOptions": {
    "include": [
      "Views",
      "web.config"
    ]
   }
    
{% endhighlight %}

<p>Now publish the aspnet core application with below command. </p>

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet publish -c release -o c:\aspnetcoreapp</p>

<p>Your application is now published to <b><i>c:\aspnetcoreapp folder</i></b>. 
<br>Now goto IIS mangement console and create a new site pointing to this folder. Change your apppool's <b>.Net Framework Version</b> to "<b>No Managed Code</b>". 
<br>AspNet core applications donot run inside IIS and will be run as a separate process  so we have changed apppool not to use .Net Framework for executing the application and aspNetCoreModule is responsible for bridging IIS and Kesterl web server where actually your aspnetcore app is running.
</p>

Launch the browser with http://localhost

<b>Output:</b>
<p class="output">
Index
<br>
Hello from our View Template!
</p>



