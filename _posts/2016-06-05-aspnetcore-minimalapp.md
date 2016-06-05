---
layout: post
title: "Asp.Net Core MVC minimal app setup step by step."
date: 2016-06-04
---

<p>Install .NET Core</p>

    Create a new .NET Core project: https://microsoft.com/net/core

    mkdir aspnetcoreapp
    cd aspnetcoreapp
    dotnet new


    Update the project.json file to add the Kestrel HTTP server package as a dependency:
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

    dotnet restore


    Update the code in Program.cs to setup and start the Web host:

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

Add startup.cs 

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

add below dependency

{% highlight javascript %}

        "Microsoft.AspNetCore.Mvc": "1.0.0-rc2-final"
        
{% endhighlight %}

dotnet restore        
dotnet build
dotnet run

http://localhost:5000

404 error

let's add developer error page by adding code below

{% highlight csharp %}

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        { 
            app.UseDeveloperExceptionPage();

            app.UseMvc();
        }

{% endhighlight %}

add below dependency
{% highlight javascript %}

"Microsoft.AspNetCore.Diagnostics": "1.0.0-rc2-final",

{% endhighlight %}

dotnet restore
dotnet build
dotnet run

http://localhost:5000

404 error

Create directory "Controllers"

add ProductsController.cs in Controllers folder.

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

also add Product.cs in the new folder Models

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
        
        dotnet build
dotnet run

http://localhost:5000/api/products

Output:
products.json
{% highlight javascript %}

[{"id":1221,"name":"aaa","price":120.0},{"id":1222,"name":"vvv","price":122.0},{"id":1223,"name":"nnn","price":123.0}]

{% endhighlight %}

http://localhost:5000/api/products/1100

Output:
1100.json

{% highlight javascript %}

{"id":1100,"name":"zzz","price":124.0}

{% endhighlight %}

Now add HomeController.cs to Controller folder.

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

dotnet build
dotnet run

http://localhost:5000/home

404 error

Let's add route.
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
        
dotnet build
dotnet run

http://localhost:5000/home

Output:

Hello from aspnetcore...


Let's a view to our app.

update HomeController.cs as shown below.

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

dotnet build
dotnet run

http://localhost:5000/home/index

Output:

Internal Server Error...



let's add developer error page by adding code below

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

add below dependency

{% highlight javascript %}
"Microsoft.AspNetCore.Diagnostics": "1.0.0-rc2-final",

{% endhighlight %}

dotnet restore
dotnet build
dotnet run

http://localhost:5000/home/index

Output:

An unhandled exception occurred while processing the request.

InvalidOperationException: The view 'Index' was not found. The following locations were searched:
 /Views/Home/Index.cshtml
 /Views/Shared/Index.cshtml

Microsoft.AspNetCore.Mvc.ViewEngines.ViewEngineResult.EnsureSuccessful(IEnumerable`1 originalLocations)


Now add view for HomeController's Index action.

Create a folder Views

add new _ViewStart.cshtml

{% highlight html %}

@{
    Layout = "_Layout";
}
{% endhighlight %}

Create new folder Shared and add new file _Layout.cshtml

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

Create another folder Home and add Index.cshtml file.

{% highlight html %}

@{
    ViewData["Title"] = "Index";
}

<h2>Index</h2>

<p>Hello from our View Template!</p>

{% endhighlight %}

dotnet build
dotnet run

http://localhost:5000/home/index

Output:
An unhandled exception occurred while processing the request.

InvalidOperationException: The view 'Index' was not found. The following locations were searched:
 /Views/Home/Index.cshtml
 /Views/Shared/Index.cshtml

Microsoft.AspNetCore.Mvc.ViewEngines.ViewEngineResult.EnsureSuccessful(IEnumerable`1 originalLocations)



Update Progra.cs

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

We had setup the root directory for our aspnetcore app.


dotnet build
dotnet run

http://localhost:5000/home/index

Output:

An unhandled exception occurred while processing the request.

InvalidOperationException: The Razor page '/Views/Home/Index.cshtml' failed to compile. Ensure that your application's project.json sets the 'preserveCompilationContext' compilation property.

Microsoft.AspNetCore.Mvc.Razor.Internal.DefaultRoslynCompilationService.Compile(RelativeFileInfo fileInfo, String compilationContent)



Update project.json file to add above property.

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

dotnet build
dotnet run

http://localhost:5000/home/index

Output:

Index

Hello from our View Template!


Now we have setup webapi and basic mvc controller with a view for ASp.Net Core application.

Please find the code at github.