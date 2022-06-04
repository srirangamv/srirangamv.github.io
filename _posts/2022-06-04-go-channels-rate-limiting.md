---
layout: post
title: "Simple rate limiter implementation with channels in Go"
name: "2022-06-04-go-channels-rate-limiting"
description: "simple rate limiter implementation with channels in Go."
tags: "go,multi-threading,coroutines,concurrency,channels,green threads,http server,server side events,code,technical article,blog,post"
date: 2022-06-04
---

<p>Here is a sample code for rate limiting implementation in Go using channels. Producer creates work load continuously and sends items to channel, worker processes a single request received over a channel and main method allows only 3 requests to go worker channel per a second & all else will be ignored.</p>

{% highlight go %}
package main

import (
	"fmt"
	"time"
)

func producer(ch chan<- int) {
	var i int

	for {
		ch <- i
		i++
		time.Sleep(100 * time.Millisecond)
	}
}

func worker(ch <-chan int) {
	for {
		fmt.Println("Processing ", <-ch)
		time.Sleep(33 * time.Millisecond)
	}
}

func main() {
	p := make(chan int, 1000)
	w := make(chan int)
	tok := make(chan int, 3)
	t := time.NewTicker(1 * time.Second)

	defer func() {
		t.Stop()
		close(p)
		close(w)
		close(tok)
	}()

	go func() {
		for a := range t.C {
			fmt.Println("ticked", a)
			tok <- 1
			tok <- 2
			tok <- 3
		}
	}()

	go producer(p)
	go worker(w)
	go worker(w)
	go worker(w)

	//limiter
	go func() {
		for {
			select {
			case <-tok:
				w <- <-p
			default:
				<-p // fmt.Println("ignoring ", <-p)
			}
		}
	}()

	time.Sleep(20 * time.Second)
}
{% endhighlight %}