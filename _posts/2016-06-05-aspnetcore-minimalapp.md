---
layout: post
title: "Asp.Net Core minimal app setup, step by step."
date: 2016-06-05
---

<p>Install .NET Core from <a href="https://microsoft.com/net/core" title=".Net Core installer" target="_blank">here</a>.</p>

<p>Create a new .NET Core project by opening command prompt. "dotnet new" will create Program.cs and project.json file for you.</p>

<p class="cmd">c:\&gt;mkdir aspnetcoreapp</p><br>
<p class="cmd">c:\&gt;cd aspnetcoreapp</p><br>
<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet new</p>


<p>Update the <b><i>project.json</i></b> file to add the Kestrel HTTP server package as a dependency:</p>

{% highlight javascript %}

    {
      "version": "1.0.0-*",
      "buildOptions": {
        "emitEntryPoint": true
      },
      "dependencies": {
        "Microsoft.NETCore.App": {
          "type": "platform",
          "version": "1.0.0-rc2-3002702"
        },
        "Microsoft.AspNetCore.Server.Kestrel": "1.0.0-rc2-final"
      },
      "frameworks": {
        "netcoreapp1.0": {
          "imports": "dnxcore50"
        }
      }
    }
{% endhighlight %}

Restore the packages:

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet restore </p>


<p>Update the code in <b><i>Program.cs</i></b> to setup and start the Web host:</p>

{% highlight csharp %}

    using System;
    using Microsoft.AspNetCore.Hosting;

    namespace aspnetcoreapp
    {
        public class Program
        {
            public static void Main(string[] args)
            {
                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseStartup<Startup>()
                    .Build();

                host.Run();
            }
        }
    }

{% endhighlight %}

<p>Add new <b><i>startup.cs</i></b> file in the app directory.</p>

{% highlight csharp %}

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
 
namespace aspnetcoreapp
{
    public class Startup
    { 
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }
 
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        { 

            app.UseMvc();
        }
    }
}

{% endhighlight %}

<p>As we have added MVC service to the applicatoin which needs below dependency.</p>

{% highlight javascript %}

        "Microsoft.AspNetCore.Mvc": "1.0.0-rc2-final"
        
{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet restore </p> <br>  
<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000

<b>Output:</b>
<p class="error">
404 error
</p>


<p>As we don't have any default mvc controller and action, we get a 404 not found error. So let's add a controller.

Create a new directory <b><i>Controllers</i></b> in app directory. And add new <b><i>ProductsController.cs</i></b> in Controllers folder.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using aspnetcoreapp.models;

namespace aspnetcoreapp.controllers
{	
	[Route("api/[controller]")]
    public class ProductsController : Controller
    {        
        [HttpGet]
        public ObjectResult Get()
        {
            var products = new List<Product>(){
            	new Product(){
            		id=1221, name="aaa", price=120.00
            	},
            	new Product(){
            		id=1222, name="vvv", price=122.00
            	},
            	new Product(){
            		id=1223, name="nnn", price=123.00
            	}
            };
            return Ok(products);
        }
        
        [HttpGet("{id:int}")]
        public ObjectResult Get(int id)
        {
            return Ok(new Product(){
            		id=id, name="zzz", price=124.00
            	});
        }
    }
}

{% endhighlight %}

<p>also create a new directory <b><i>Models</i></b> and add new <b><i>Product.cs</i></b> in the new folder "Models".</p>

{% highlight csharp %}

namespace aspnetcoreapp.models
{
	public class Product{
		public int id{get; set;}
		public string name{get; set;}
		public double price{get; set;}		
	}
}	
        
{% endhighlight %}
        

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with  http://localhost:5000/api/products

<b>Output:</b>
<p class="output">
products.json
</p>
{% highlight javascript %}

[{"id":1221,"name":"aaa","price":120.0},{"id":1222,"name":"vvv","price":122.0},{"id":1223,"name":"nnn","price":123.0}]

{% endhighlight %}


Launch the browser with http://localhost:5000/api/products/1100

<b>Output:</b>
<p class="output">
1100.json
</p>

{% highlight javascript %}

{"id":1100,"name":"zzz","price":124.0}

{% endhighlight %}

<p>We have successfully created a Web API controller. Now let's add <b><i>HomeController.cs</i></b> to Controller folder.</p>

{% highlight csharp %}

using System;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcoreapp.controllers
{
    public class HomeController : Controller
    {
        public string Hello()
        {
            return "Hello from aspnetcore...";
        }
    }
}

{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000/home (OR) http://localhost:5000/home/hello

<b>Output:</b>
<p class="error">
404 error
</p>


<p>Let's add route definition to <b><i>StartUp.cs</i></b>. </p>

{% highlight csharp %}

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        { 
        app.UseDeveloperExceptionPage();

            app.UseMvc(routes =>
					{
					    routes.MapRoute(
					        name: "default",
					        template: "{controller=Home}/{action=Hello}/{id?}");
					});
        }
       
{% endhighlight %} 
        
<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000/home

<b>Output:</b>
<p class="output">
Hello from aspnetcore...
</p>

<p>Let's add another action with a view to <b><i>HomeController.cs</i></b> as shown below.</p>

{% highlight csharp %}

using System;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcoreapp.controllers
{
    public class HomeController : Controller
    {
        public string Hello()
        {
            return "Hello from aspnetcore...";
        }
        
        public IActionResult Index(){
        		return View();        	
        }
    }
}

{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Now launch the browser with http://localhost:5000/home/index

<b>Output:</b>
<p class="error">
Internal Server Error...
</p>

<p>Add developer error page to <b><i>StartUp.cs</i></b> as below.</p>

{% highlight csharp %}

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        { 
            app.UseDeveloperExceptionPage();

            app.UseMvc(routes =>
					{
					    routes.MapRoute(
					        name: "default",
					        template: "{controller=Home}/{action=Hello}/{id?}");
					});
        }
        
{% endhighlight %}

<p>also add below dependency to <b><i>project.json</i></b> file.</p>

{% highlight javascript %}
    
    "Microsoft.AspNetCore.Diagnostics": "1.0.0-rc2-final"

{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet restore</p><br>
<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000/home/index

<b>Output:</b>
<p class="error">
An unhandled exception occurred while processing the request.<br></br>
<br></br>
InvalidOperationException: The view 'Index' was not found. The following locations were searched:<br></br>
 /Views/Home/Index.cshtml<br></br>
 /Views/Shared/Index.cshtml<br></br>
<br></br>
Microsoft.AspNetCore.Mvc.ViewEngines.ViewEngineResult.EnsureSuccessful(IEnumerable`1 originalLocations)
</p>

<p>Now add the view for HomeController's Index action.</p>

Create folder <b><i>Views</i></b> in the app directory. And add new <b><i>_ViewStart.cshtml</i></b> file.

{% highlight html %}

@{
    Layout = "_Layout";
}
{% endhighlight %}

<p>Create new folder Shared inside Views folder and add new file <b><i>_Layout.cshtml</i></b>.</p>

{% highlight html %}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title</title>
</head>
<body>
    @RenderBody()
</body>
</html>

{% endhighlight %}

<p>Create another folder Home inside Views folder and add <b><i>Index.cshtml</i></b> file.</p>

{% highlight html %}

@{
    ViewData["Title"] = "Index";
}

<h2>Index</h2>

<p>Hello from our View Template!</p>

{% endhighlight %}


<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000/home/index

<b>Output:</b>
<p class="error">
An unhandled exception occurred while processing the request.<br></br>
<br></br>
InvalidOperationException: The view 'Index' was not found. The following locations were searched:<br></br>
 /Views/Home/Index.cshtml<br></br>
 /Views/Shared/Index.cshtml<br></br>
<br></br>
Microsoft.AspNetCore.Mvc.ViewEngines.ViewEngineResult.EnsureSuccessful(IEnumerable`1 originalLocations)
</p>

<p>Update <b><i>Program.cs</i></b> to setup Root directory for the app.</p>

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
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}

{% endhighlight %}


<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run</p>

Launch the browser with http://localhost:5000/home/index

<b>Output:</b>
<p class="error">
An unhandled exception occurred while processing the request.<br>
<br>
InvalidOperationException: The Razor page '/Views/Home/Index.cshtml' failed to compile. Ensure that your application's project.json sets the 'preserveCompilationContext' compilation property.<br>
<br>
Microsoft.AspNetCore.Mvc.Razor.Internal.DefaultRoslynCompilationService.Compile(RelativeFileInfo fileInfo, String compilationContent)<br>
</p>


<p>Update <b><i>project.json</i></b> file to add above property.</p>

{% highlight javascript %}

{
  "version": "1.0.0-*",
  "buildOptions": {
   "preserveCompilationContext": true,
    "emitEntryPoint": true
  },
  "dependencies": {
    "Microsoft.NETCore.App": {
      "type": "platform",
      "version": "1.0.0-rc2-3002702"
    },
    "Microsoft.AspNetCore.Mvc": "1.0.0-rc2-final",
    "Microsoft.AspNetCore.Diagnostics": "1.0.0-rc2-final",
     "Microsoft.AspNetCore.Server.Kestrel": "1.0.0-rc2-final"
  },
  "frameworks": {
    "netcoreapp1.0": {
      "imports": "dnxcore50"
    }
  }
}

{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreapp&gt;dotnet run

Launch the browser with http://localhost:5000/home/index
</p>

<b>Output:</b>
<p class="output">
Index
<br>
Hello from our View Template!
</p>

<p>Now we have setup webapi and basic mvc controller with a view for ASp.Net Core application.

Please find the complete code at <a href="https://github.com/vwtt/aspnetcoreminapp" title="code download path">here</a>.</p>