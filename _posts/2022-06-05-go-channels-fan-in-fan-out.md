---
layout: post
title: "Simple implementation for fan-in fan-out of channels in Go"
name: "2022-06-05-go-channels-fan-in-fan-out"
description: "simple implementation for fan-in fan-out of channels in Go."
tags: "go,multi-threading,coroutines,concurrency,channels,fan-in,fan-out,green threads,http server,server side events,code,technical article,blog,post"
date: 2022-06-05
---

<p>Here is a sample code for fan-in fan-out of channels in Go. Producer creates 1000 integers, we split these numbers into two odd, even number channels, two functions will consume these two channels. For examples, odd numbers will be squared and even numbers will be cubed. And these two output channels will be joined into single channel and ultimately all these squares & cubes will be summed.</p>

{% highlight go %}
package main

import (
	"fmt"
	"sync"
)

func producer() <-chan int {

	ch := make(chan int)

	go func() {
		for i := 1; i <= 10; i++ {
			ch <- i
		}

		close(ch)
	}()

	return ch
}

func summer(ch <-chan int) int {

	s := 0
	for i := range ch {
		s += i
	}

	return s
}

func squarer(odds <-chan int) <-chan int {

	ch := make(chan int)

	go func() {
		for i := range odds {
			ch <- i * i
		}

		close(ch)
	}()

	return ch
}

func cuber(evens <-chan int) <-chan int {

	ch := make(chan int)

	go func() {
		for i := range evens {
			ch <- i * i * i
		}

		close(ch)
	}()

	return ch
}

func splitter(ch <-chan int) (<-chan int, <-chan int) {

	od := make(chan int)
	ev := make(chan int)

	go func() {
		for i := range ch {
			if i%2 == 0 {
				ev <- i
			} else {
				od <- i
			}
		}

		close(od)
		close(ev)
	}()

	return od, ev
}

func joiner(od <-chan int, ev <-chan int) <-chan int {

	ch := make(chan int)
	var wg sync.WaitGroup

	wg.Add(2)
	go func() {
		for i := range od {
			ch <- i
		}

		wg.Done()
	}()

	go func() {
		for i := range ev {
			ch <- i
		}

		wg.Done()
	}()

	go func() {
		wg.Wait()
		close(ch)
	}()

	return ch
}

func main() {
	p := producer()
	o, e := splitter(p)
	oo := squarer(o)
	ev := cuber(e)
	s := joiner(oo, ev)
	sum := summer(s)
	fmt.Println(sum)
}

{% endhighlight %}
<b>Output:</b>
<p class="output">
125667166500
</p>