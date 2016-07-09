---
layout: post
title: "Asp.Net Core app, simple Authentication & Authorization."
name: "2016-06-19-aspnetcore-minimalapp-authentication-authorization"
description: "AspNet Core application security."
date: 2016-07-09
---

<p>
In this article we will create a simple aspnet core application and add authentication and authoorization to it.
We use cookie authentication middleware to persist the identity information once user is authenticated. Subsequent call to server this cookie middleware will create the identity from the cookie. To create the identity we use a simple username and password and we assume this user is validated and we will create identity. For authentication we are not using Asp.Net identity for the purpose of simplification.
</p>

<p>This sample will have anonymous home action "Index" and an "Update" action which requires authorization.</p>

<p>Create the application as shown below</p>

<p class="cmd">c:\&gt;mkdir aspnetcoreauth</p><br>
<p class="cmd">c:\&gt;cd aspnetcoreauth</p><br>
<p class="cmd">c:\&gt;aspnetcoreauth&gt;dotnet new</p>

<p>Update the <b><i>project.json</i></b> file to add the dependencies for MVC and cookie authentication.</p>

{% highlight javascript %}

    "Microsoft.AspNetCore.Server.Kestrel": "1.0.0",
    "Microsoft.AspNetCore.Mvc": "1.0.0",
    "Microsoft.AspNetCore.Mvc.TagHelpers": "1.0.0",
    "Microsoft.AspNetCore.Diagnostics": "1.0.0",
    "Microsoft.AspNetCore.Authentication.Cookies": "1.0.0",
    "Microsoft.AspNetCore.Authorization": "1.0.0"
    
{% endhighlight %}

Restore the packages:

<p class="cmd">c:\&gt;aspnetcoreauth&gt;dotnet restore </p>


<p>Update the code in <b><i>StartUp.cs</i></b> as shown below.</p>

{% highlight csharp %}

    using System;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using aspnetcoreauth.ViewModel;
    using aspnetcoreauth.Core.Security;

    namespace aspnetcoreauth
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
                services.AddSingleton<IIdentityHelper, IdentityHelper>();
                
                services.AddMvc();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                app.UseCookieAuthentication(new CookieAuthenticationOptions()
                {
                    AuthenticationScheme = "aspnetcoreauth",
                    LoginPath = new PathString("/Account/Login"),
                    AccessDeniedPath = new PathString("/Account/Forbidden"),
                    AutomaticAuthenticate = true,
                    AutomaticChallenge = true
                });

                if (string.Equals(env.EnvironmentName, "Development", StringComparison.OrdinalIgnoreCase))
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }

                app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });
            }
        }
    }

{% endhighlight %}

Add a new <i><b>HomeController.cs</b></i> file in the <i><b>Controllers</b></i> directory of the application.

{% highlight csharp %}

    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;


    namespace aspnetcoreauth.Controllers
    {
        public class HomeController : Controller
        {
            public IActionResult Index()
            {
                return View();
            }

            [Authorize]
            public IActionResult Update(){
                return View();
            }
        }
    }
    
{% endhighlight %}   

<p>Add respective <i><b>Index.cshtml</b></i> and <i><b>Update.cshtml</b></i> views as show below under "Views/Home" folder.</p>

...Index.cshtml
{% highlight html %}

@{
    ViewBag.Title = "Welcome Home!";
}

<h2>Index</h2>

<a asp-controller="Home" asp-action="Update">This needs authorization.</a>

{% endhighlight %}

...Update.cshtml
{% highlight html %}

@{
    ViewBag.Title = "You are authorized.";
}

<h2>You are authorized.</h2>

{% endhighlight %}

<p>Also add respective <i><b>Login.cshtml</b></i> and <i><b>Forbiddene.cshtml</b></i> views as show below under "Views/Account" folder.</p>

...Login.cshtml
{% highlight html %}

@model aspnetcoreauth.ViewModel.LoginInfo

@{
    ViewBag.Title = "Login";
}

<h2>Please login...</h2>

<form asp-controller="Account" asp-action="Login" method="post" class="form-horizontal" role="form">
    <div class="form-horizontal">
        <div asp-validation-summary="All" class="text-danger"></div>
        <div class="form-group">
            <label asp-for="UserName" class="col-md-2 control-label"></label>
            <div class="col-md-10">
                <input asp-for="UserName" class="form-control" />
                <span asp-validation-for="UserName" class="text-danger"></span>
            </div>
        </div>
        <input type="hidden" id="ReturnUrl" asp-for="ReturnUrl" />
        <div class="form-group">
            <label asp-for="Pwd" class="col-md-2 control-label"></label>
            <div class="col-md-10">
                <input asp-for="Pwd" class="form-control" type="password" />
                <span asp-validation-for="Pwd" class="text-danger"></span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Login" class="btn btn-default" />
            </div>
        </div>
    </div>
</form>


{% endhighlight %}

...Forbidden.cshtml
{% highlight html %}

@{
    ViewBag.Title = "Unauthorized";
}

<h2>You are not authorized.</h2>

{% endhighlight %}

<p class="cmd">c:\&gt;aspnetcoreauth&gt;dotnet run</p>

Launch the browser with http://localhost:5000

<b>Output:</b>
<p class="output">
Index
<br>
<a href="#">This needs authorization. </a>
</p>

<p>Click the link which invokes action "Update" on HomeController. As this action is decorated with [Authorize] attribute, cookie middleware now tries to redirect the user to "Login" page which is configured in the <i><b>StartUp.cs</b></i></p>

<b>Output:</b>
<p class="output">
<h2>Please login...</h2>

<form>
                <label class="col-md-2 control-label" for="UserName">User Name</label>
                    <input class="form-control" type="text" data-val="true" data-val-required="The User Name field is required." id="UserName" name="UserName" value="" />
                <br/>    
            <label class="col-md-2 control-label" for="Pwd">Password</label>
                <input class="form-control" type="password" data-val="true" data-val-required="The Password field is required." id="Pwd" name="Pwd" />
                <br/>
                <input type="submit" value="Login" class="btn btn-default" />
            </div>
        </div>
    </div>
    </form>
</p>

{% highlight csharp %}

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginInfo loginInfo)
    {
        if(ModelState.IsValid){
            //assuming user name and password is validated. Now create identity.
            var Claims = new Dictionary<string, string>();

            var principal = _identityHelper.CreateIdentity(loginInfo.UserName, "", Claims);

            await HttpContext.Authentication.SignInAsync("aspnetcoreauth", principal);
        }

        return RedirectToAction("Update", "Home");
    }
    
    public async Task<IActionResult> LogOff()
    {
        await HttpContext.Authentication.SignOutAsync("aspnetcoreauth");

        return RedirectToAction("Index", "Home");
    }
    
{% endhighlight %}  

<p>User is now authenticated as the identity is created and persisted with cookie middleware. So you will be able to see Home/Update page.</p>

<b>Output:</b>
<p class="output">
<h2>You are authorized.</h2>
</p>

<p>Let's change the [Authorize] attribute to [Authorize(Policy = "EmployeeOnly")]</p> and <i><b>StartUp.cs</b></i> to add an authorize policy to be used.

{% highlight csharp %}

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<IIdentityHelper, IdentityHelper>();

        services.AddMvc();

        services.AddAuthorization(options =>
        {
            options.AddPolicy("EmployeeOnly", policy => policy.RequireClaim("EmployeeNumber"));
        });
    }

{% endhighlight %}  

<p class="cmd">c:\&gt;aspnetcoreauth&gt;dotnet run</p>

Launch the browser with http://localhost:5000/Home/Update

<b>Output:</b>
<p class="output">
You are not authorized.
</p>

<p>You are shown <i><b>Forbidden page</b></i> as required "EmployeeNumber" is missing on the user identity. So let's add required claims to the dummy identity. Please update the Login action as shown below.</p>

{% highlight csharp %}

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginInfo loginInfo)
    {
        if(ModelState.IsValid){
            //assuming user name and password is validated. Now create identity.
             var Claims = new Dictionary<string, string>(){
                        ["EmployeeNumber"] = "1221"
                    };

            var principal = _identityHelper.CreateIdentity(loginInfo.UserName, "", Claims);

            await HttpContext.Authentication.SignInAsync("aspnetcoreauth", principal);
        }

        return RedirectToAction("Update", "Home");
    }
    
{% endhighlight %} 

<p class="cmd">c:\&gt;aspnetcoreauth&gt;dotnet run</p>

Launch the browser with http://localhost:5000 and click on the link so that Login page is shown enter credentials. You will be successfully redirected to "Home/Update" action.

<b>Output:</b>
<p class="output">
You are authorized.
</p>

<p>Add a LogOff action to the Action controller as shown below.</p>

{% highlight csharp %}

    
    
{% endhighlight %} 


Navigate the browser to http://localhost:5000/Account/LogOff

<p>Now cookie middleware removes the authentication cookie if you visit "Home/Update" action, you will be propmpted for login credentials as you are signed off from the application.</p>


<p>Please find the complete code <a href="https://github.com/vwtt/aspnetcoreauth">here</a> for this atricle.</p>