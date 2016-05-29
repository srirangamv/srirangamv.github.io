---
layout: post
title: "Map, Reduce and Filter in Javascript"
date: 2016-05-29
---

<p>Here is the Javascipt code mimicking map, reduce and filter functions.</p>

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

\s\s
<b>output:</b>
\s\s
\s\s
[ 2, 4, 6, 8, 10 ]
\s\s
[ 1, 4, 9, 16, 25 ]
\s\s
15
\s\s
120
\s\s
[ 1, 3, 5 ]
\s\s
[ 2, 4 ]
\s\s
20
