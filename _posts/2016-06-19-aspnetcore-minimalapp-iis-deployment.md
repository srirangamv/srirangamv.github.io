---
layout: post
title: "Asp.Net Core minimal app, IIS deployment."
date: 2016-06-19
---

<p>
So far we have run aspnet core application using the new Kestel web server. Let's deploy the application to IIS. 
You need to prepare your IIS for AspNet core application deployment. Firstly,  install AspNet Core module  from <a href="https://go.microsoft.com/fwlink/?LinkId=798480" title="AspNet Core Windows Hosting" target="_blank">here</a>.
Make sure ASpNetCoreModule is listed in the IIS modules after the installation. In order to run aspnet core application on IIS we need to do some changes to the application.
Below are the changes:
</p>

<p>Update the <b><i>project.json</i></b> file to add the AspNet Core IIS integration package as a dependency:</p>

Your project.json file looks like this now.

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

<p>Now publish the aspnet core application with below command. </p>

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet publish -c release -o c:\aspnetcoreapp</p>

<p>Your application is now published to c:\aspnetcoreapp folder. Copy your Views folder and web.config file to this published folder. 
Now goto IIS manger and create a new site pointing to this folder. Change your apppool's .Net Framework Version to "No Managed Code". 
AspNet core application donot run inside IIS and will be run as a separate process  so we have changed apppool not to use .Net Framework for executing the application and aspNetCoreModule is responsible for bridging IIS and Kesterl web server where actually your aspnetcore app is running.
</p>

Launch the browser with http://localhost

<b>Output:</b>
<p class="output">
Index
<br>
Hello from our View Template!
</p>



