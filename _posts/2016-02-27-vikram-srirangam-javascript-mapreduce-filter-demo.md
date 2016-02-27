---
layout: post
title: "Map, Reduce and Filter in Javascript"
date: 2016-02-27
---

<p>I see map, reduce and filters are built-in functions in Python. See below sample code using those functions.</p>

```python
square = lambda a: a * a
cube = lambda a: a * a * a

print(cube(5))

s = [1, 2, 3, 4, 5]

print(map(lambda a: a * a, s))
print(map(cube, s))
print(reduce(lambda s, x: s + x, map(lambda a: a * a, s)))
print(filter(lambda a: a > 10, map(square, s)))
```
<p>
<b>output:</b>
125
[1, 4, 9, 16, 25]
[1, 8, 27, 64, 125]
55
[16, 25]
</p>

<p>I tried to create those functions for Javascript and listed them below.</p>

```javascript

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

```
<p>
<b>output:</b>
[ 2, 4, 6, 8, 10 ]

[ 1, 4, 9, 16, 25 ]

15

120

[ 1, 3, 5 ]

[ 2, 4 ]
20
</p>
