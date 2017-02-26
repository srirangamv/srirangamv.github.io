---
layout: post
title: "Factory Method vs Factory Design Pattern"
name: "2017-02-26-factory-factory_method_design-pattern"
description: "Factory Method vs Factory Design Pattern"
date: 2017-02-26
---
<p>Though these two patterns are about creating objects, Here are differences between factory and factory method pattern.</p>
<table>
<tr>
<th>Factory Method</th>
<th>Factory</th>
</tr>
<tr>
<td>
1. We don't know the type of object needs to created.
2. Here selection of object is being created is deferred to child classes.
3. Child class will be responsible to create the object by providing it's own logic.
4. <b>E.g, Some object hierarchies like expenses, orders or assets when being created may be needs some specific logic to be implemented.</b></td>
<td>
1. We know the type of object needs to created.
2. Factory class knows and selects the type of object to be created.
3. Child class will not have any separate creation logic.
4. <b>E.g, Like an MVC controller factory, which upfront knows which child controller should be created similarly, Asp.Net handler factory knows which handler is to be created.</b></td>
</tr>
</table>
