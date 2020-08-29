---
layout: post
title: "Factory Method vs Factory Design Pattern"
name: "2017-02-26-factory-factory_method_design-pattern"
description: "Factory Method vs Factory Design Patterns."
tags: "c#,.net,.net core,factory method design pattern,factory design pattern,code,design pattern,UML,unified modeling language,technical article,blog,post"
date: 2017-02-26
---
<p>Though these two patterns are about creating objects, Here are differences between factory and factory method pattern.</p>
<table class="datatable">
<tr>
<th>Factory Method</th>
<th>Factory</th>
</tr>
<tr>
<td>
<ol>
<li>We don't know the type of object needs to created.</li>
<li>Here selection of object is being created is deferred to child classes.</li>
<li>Child class will have it's own logic.</li>
<li><b>E.g, Some object hierarchies like expenses, orders or assets when being created may be needs some specific logic to be implemented.</b></li>
</ol>
</td>
<td>
<ol>
<li>We know the type of object needs to created.</li>
<li>Factory class knows and selects the type of object to be created.</li>
<li>Child class will not have any separate creation logic.</li>
<li><b>E.g, Like an MVC controller factory, which upfront knows which child controller should be created similarly, Asp.Net handler factory knows which handler is to be created.</b></li>
</ol></td>
</tr>
</table>
