---
layout: post
title: "An aspnet core application with Entity Framework Core, Repository, UoW and Unit Testing."
name: "2016-07-31-complete-aspnetcore-app"
description: "AspNet Core Application with Unit Of Work and Repositiry patterns."
date: 2016-07-31
---

<h3><a name="section1">Introduction</a></h3>
<p>
    In this article, we will see an aspnet core shopping cart minimal application which uses entity framework core as backend, simple authentication and authoorization. Also data access layer is accessed by repositories and co-ordinated by a unit of work. See below block diagram for the interaction between the layers and components. Please find the complete code at <a href="https://github.com/vwtt/aspnetcorecompleteapp" title="code download path">here</a>.
</p>
<p>
    <figure>
      <img src="/images/BlipkartArchitecture.png" alt="Blipkart Architecture Diagram" width="50%" height="50%" />
      <figcaption>Blipkart Architecture Diagram</figcaption>
    </figure>    
</p>    
<h3><a name="section2">Repository</a></h3>
<p>
A repository is the place we can keep all the data access logic. This helps us in resusing the code and eleminate duplication of data access logic. Each repository will be independent and can be tested with a in-memory DbContext.
</p>
<h3><a name="section3">Unit Of Work</a></h3>
<p>
A Unit Of Work coordinates multiple repository changes on a single DbContext. We ensure DbContext is scoped and only one DBContext is avialable for both repositoties and unit of work object. A service which make changes to two or more repositories can be committed co-ordinately with the help of Unit Of Work.
</p>
<h3><a name="section4">ViewModels</a></h3>
<p>ViewModels are mapped entities to domain enties with required additional properies or merged domain enties that controllers and views use. Creating view models will make data access de coupled from actual domain classes and data access.</p>
<h3><a name="section5">Services</a></h3>
<p>Services are the bridge between UI layer of the application and data access layer. Thus keeping the controllers and views separate and independent from data access layer with the help of viewmodels. Controllers and views passes data using view models to services. Services translate this viewmodels to domain model entities and persists the domain data.</p>
<h3><a name="section6">Unit Testing</a></h3>
<p>MSTest framework is used as a unit test runner for all the unit tests and Moq is the mocking framework for stubs and mocks.</p>

{% highlight javascript %}
//file: project.json

{
  "version": "1.0.0-*",
  "testRunner": "mstest",
  "buildOptions": {
    "emitEntryPoint": false
  },
  "dependencies": {
    "Microsoft.NETCore.App": {
      "type": "platform",
      "version": "1.0.0"
    },
    "Blipkart": "1.0.0-*",
    "dotnet-test-mstest": "1.0.1-preview",
    "MSTest.TestFramework": "1.0.0-preview",
    "moq.netcore": "4.4.0-beta8",
    "Microsoft.AspNetCore.TestHost": "1.0.0"
  },
  "frameworks": {
    "netcoreapp1.0": {
      "imports": [
        "dotnet5.6",
        "dnxcore50",
        "portable-net45+win8"
        ]
    }
  }
}
{% endhighlight %}

<h3><a name="section7">Integration Testing</a></h3>
<p>Microsoft.AspNetCore.TestHost is used for integration tests.</p>

How to run application:
<p class="cmd">c:\&gt;Blipkart&gt;Blipkart&gt;dotnet restore</p><br>  
<p class="cmd">c:\&gt;Blipkart&gt;Blipkart&gt;dotnet ef database update</p><br>
<p class="cmd">c:\&gt;Blipkart&gt;Blipkart&gt;dotnet run</p>

How to run tests:
<p class="cmd">c:\&gt;Blipkart&gt;Blipkart.tests&gt;dotnet test</p>