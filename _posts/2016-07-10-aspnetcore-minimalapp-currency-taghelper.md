---
layout: post
title: "Asp.Net Core app, Currency tag helper"
name: "2016-07-10-aspnetcore-minimalapp-currency-taghelper"
description: "AspNet Core Currency tag helper."
tags: "c#,.net core,asp.net core,mvc,dotnet cli,razor,MVC tag helpers,code,technical article,blog,post"
date: 2016-07-10
---

<p>
In this article, we will create a simple aspnet core MVC tag helper to display currency for any tag where "currency" attribute is attached. The usage of this taghelper in the any view is as follows.
</p>

{% highlight html %}
    <h4 currency>1221.00</h4>
    (OR)
    <h4 currency>@Html.DiplayFor(item=>item.Price)</h4>

{% endhighlight %}

Output of the tag looks like this.
<p class="output">
Rs. 1221.00
</p>

<p>Below is the code for the currency tag helper. Here we are appending &lt;span&gt; to the output.</p>

{% highlight csharp %}

    using System;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Razor.TagHelpers;

    namespace SampleApp.Core.UI
    {
        [HtmlTargetElement(Attributes = CurrencyAttributeName)]
        public class CurrencyTagHelper : TagHelper
        {
            private const string CurrencyAttributeName = "currency";

            public override void Process(TagHelperContext context, TagHelperOutput output)
            {
                string content = @"<span>Rs. </span>";

                output.PreContent.AppendHtml(content);

                if (output.Attributes.ContainsName(CurrencyAttributeName))
                {
                    output.Attributes.RemoveAll(CurrencyAttributeName);
                }

                base.Process(context, output);
            }
        }
    }

{% endhighlight %}

<p>After you created the Tag Helper, import the same with below code. Here we added type "SampleApp.Core.UI.CurrencyTagHelper" from assembly "SampleApp".</p>

..._ViewImports.cshtml
{% highlight html %}

@addTagHelper "*, Microsoft.AspNetCore.Mvc.TagHelpers"
@addTagHelper "SampleApp.Core.UI.CurrencyTagHelper, SampleApp"

{% endhighlight %}