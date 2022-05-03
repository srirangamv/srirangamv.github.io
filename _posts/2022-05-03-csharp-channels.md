---
layout: post
title: "Channels and concurrency in C#"
name: "2022-05-03-csharp-channels"
description: "channels and concurrency in csharp."
tags: "c#,.net,.net core,dotnet cli,threading,tasks,concurrency,channels,code,technical article,blog,post"
date: 2022-05-03
---

<p>Here is a sample code for channel communication between different tasks. Channels are introduced in .Net Core 3 and we can think channels is a thread safe queue so that concurrent processes coordinate and communicate themselves. In this example 2 tasks produces messages to a channel and third task reads them as available from the channel and prints to console. Combined with cancellation token this 3 tasks will stop communicating after a minute.</p>

{% highlight csharp %}
using System.Threading.Channels;

var ch = Channel.CreateUnbounded<string>();

var phrases = new List<string>{
    "how dy",
    "busy with life",
    "how abt you",
    "no pains no gains",
    "business as usual",
    "wassup",
    "world is small indeed",
    "so long",
};

var cts = new CancellationTokenSource();

async Task CreateChatTask(string name, int delay)
{
    var rnd = new Random();
    while (true)
    {
        var rp = rnd.Next(0, 7);
        // send a random chat phrase
        await ch.Writer.WriteAsync($"{name}: {phrases[rp]}");

        if (cts.Token.IsCancellationRequested)
        {
            break;
        }
        await Task.Delay(delay);
    }
};

var joe = Task.Run(async () => await CreateChatTask("joe", 4000));
var ann = Task.Run(async () => await CreateChatTask("ann", 2000));

var kate = Task.Run(async () =>
{
    while (!cts.Token.IsCancellationRequested
        && await ch.Reader.WaitToReadAsync())
    {
        Console.WriteLine(await ch.Reader.ReadAsync());
    }
});

cts.CancelAfter(TimeSpan.FromSeconds(60));
await Task.WhenAll(joe, ann, kate);
ch.Writer.Complete();
{% endhighlight %}

<b>Output:</b>
<p class="output">
joe: how dy<br>
ann: wassup<br>
...
</p>