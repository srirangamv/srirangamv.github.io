---
layout: post
title: "Map, Reduce and Filter in Javascript"
date: 2016-05-29
---

<p>Here is the Javascipt code mimicking simple map, reduce and filter functions. PS for the purpose of understanding only. Please find the usage of the built-in functions <a href="http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/">here</a></p>

{% highlight javascript %}

function map(c, m) {
    var o = [];
    for (var i in c) {
        o.push(m(c[i]));
    }
    return o;
}

function reduce(c, s, r) {
    for (var i in c) {
        s = r(s, c[i]);
    }
    return s;
}

function filter(c, f) {
    var o = [];
    for (var i in c) {
        if (f(c[i]))
            o.push(c[i]);
    }
    return o;
}

var a = [1, 2, 3, 4, 5];

//mappers
var doubler = function (a) { return 2 * a; };
var square = function (a) { return a * a; };

//reducers
var add = function (a, b) { return a + b; };
var multiply = function (a, b) { return a * b; };

//filters
var odd = function (a) { return a % 2 == 1; };
var even = function (a) { return a % 2 == 0; };

//double mapper
console.log(map(a, doubler));

//square mapper
console.log(map(a, square));

//sum reducer
console.log(reduce(a, 0, add));

//multiply reducer
console.log(reduce(a, 1, multiply));

//odd filter
console.log(filter(a, odd));

//even filter
console.log(filter(a, even));

//sum of all squares of even numbers
console.log(reduce(map(filter(a, even), square), 0, add));
{% endhighlight %}

<p>
<b>output:</b>
<br>
<br>
[ 2, 4, 6, 8, 10 ]
<br>
[ 1, 4, 9, 16, 25 ]
<br>
15
<br>
120
<br>
[ 1, 3, 5 ]
<br>
[ 2, 4 ]
<br>
20
</p>