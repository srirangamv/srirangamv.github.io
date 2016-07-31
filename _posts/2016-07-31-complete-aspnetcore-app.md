---
layout: post
title: "An aspnet core application with Entity Framework Core, Repository, UoW and Unit Testing."
name: "2016-07-31-complete-aspnetcore-app"
description: "AspNet Core Application"
date: 2016-07-31
---

<p>
    <a href="#section1">Introduction</a><br>
    <a href="#section2">Repository</a><br>
    <a href="#section3">Unit Of Work</a><br>
    <a href="#section4">ViewModels</a><br>    
    <a href="#section5">Service</a><br>
    <a href="#section6">Unit Testing</a><br>
    <a href="#section6">Integration Testing</a><br>    
</p>
<h3><a name="section1">Introduction</a></h3>
<p>
    <p>
        In this article, we will create an aspnet core application and add authentication and authoorization to it.
        We use cookie authentication middleware to persist the identity information once user is authenticated. Subsequent calls to server are authenticated by this cookie middleware by creating identity from authetication cookie. To create the identity we use a dummy username and password form and we assume this user is validated against a data store. For authentication we are not using Asp.Net identity for the purpose of simplification.
    </p>
    <figure>
      <img src="/images/BlipkartArchitecture.png" alt="Blipkart Architecture Diagram" width="450" height="600" />
      <figcaption>Blipkart Architecture Diagram</figcaption>
    </figure>    
</p>    
<h3><a name="section2">Repository</a></h3>
<p>
A repository is the place we can keep all the data access logic. This helps in code resuse and eleminate duplication of data access logic. Each repository will be independent and can be tested with a in-memory DbContext.
</p>
<h3><a name="section3">Unit Of Work</a></h3>
<p>
A Unit Of Work is coordinates multiple repository changes on a single DbContext. We ensure DbContext is scoped and only one DBContext is avialable for both repositoties and unit of work object. A service which make changes to two or more repositories can be committed co-ordinately with the help of Unit Of Work.
</p>
<h3><a name="section4">ViewModels</a></h3>
ViewModels are mapped entities to domain enties with required additional properies or merged domain enties that controllers and views use for rendering pages. Creating view models will make data access de coupled from actual domain classes.
<h3><a name="section5">Services</a></h3>
Services are the bridge between UI layer of the application and data access layer. Thus keeping the controllers and views separate from data access layer with the help of viewmodels. Controllers and views passes data using view models to services.
Services translate this viewmodels to domain entities and persists/reads the domain data.
<h3><a name="section6">Unit Testing</a></h3>
...unit testing...
<h3><a name="section7">Integration Testing</a></h3>
...integration testing...

<p>
Please find the complete code at <a href="https://github.com/vwtt/aspnetcorecompleteapp" title="code download path">here</a>.</p>