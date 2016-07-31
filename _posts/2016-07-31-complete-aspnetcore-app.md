---
layout: post
title: "AspNet Core Application"
name: "2016-07-31-complete-aspnetcore-app"
description: "AspNet Core Application"
date: 2016-07-31
---

<p>
In this article, we will create a complete aspnet core application and add authentication and authoorization to it.
We use cookie authentication middleware to persist the identity information once user is authenticated. Subsequent calls to server are authenticated by this cookie middleware by creating identity from authetication cookie. To create the identity we use a dummy username and password form and we assume this user is validated against a data store. For authentication we are not using Asp.Net identity for the purpose of simplification.
</p>

<p>
    <a href="#section1">Introduction</a><br>
    <a href="#section2">Repository</a><br>
    <a href="#section3">Unit Of Work</a><br>
    <a href="#section4">Unit Testing</a><br>
</p>
<h2><a name="section1">Introduction</a></h2>
<p>
    <br>
    <img src="/images/BlipkartArchitecture.png" alt="Blipkart Architecture Diagram" width="400" height="600" />
</p>    
<h2><a name="section2">Repository</a></h2>
...section 2...
<h2><a name="section3">Unit Of Work</a></h2>
...section 3...
<h2><a name="section4">Unit Of Work</a></h2>
...section 4...

<p>
Please find the complete code at <a href="https://github.com/vwtt/aspnetcoreapp" title="code download path">here</a>.</p>