---
layout: post
title: "JavaScript Reference Cheatsheet"
name: "2019-05-05-fast-and-furious-javascript"
description: "JavaScript Reference Cheatsheet"
date: 2019-05-05
---
<p>Here is the Javascript language reference sheet. Find code <a href="https://github.com/vwtt/jscheatsheet" target="_blank" title="javascript cheatsheet repository">here</a>.</p>
   
<div class="codepanel">
    <h3>Type System<h3>
    <p>Primary: number, boolean, string, symbol, undefined, null</p>
    {% highlight javascript %}
    typeof(8)
    typeof(true)
    typeof("true")
    typeof(Symbol())
    typeof(undefined)
    typeof(null)
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="javascript:myeval()">Run</a></li>
            <li><a href="javascript:cleareditor()">Clear</a></li>                
            <li><a href="#">More at Github</a></li>
        </ul>
    </div>

    <p>Reference: Object, Date, Array, Function</p>
    {% highlight javascript %}
    typeof(new Date())
    typeof([])
    typeof(function(){})
    typeof({})
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="javascript:myeval()">Run</a></li>
            <li><a href="javascript:cleareditor()">Clear</a></li>                
            <li><a href="#">More at Github</a></li>
        </ul>
    </div>

    <p>Experiment/Food for thought</p>
    {% highlight javascript %}
    typeof(new Number(6))
    typeof(Number(6))
    typeof(Number("5"))
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="javascript:myeval()">Run</a></li>
            <li><a href="javascript:cleareditor()">Clear</a></li>                
            <li><a href="#">More at Github</a></li>
        </ul>
    </div>
</div>

<!-- # Variables & Scope
# Operators
<div class="codepanel">
    <h3>Control Structures<h3>    
    {% highlight javascript %}
    
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="javascript:myeval()">Run</a></li>
            <li><a href="javascript:cleareditor()">Clear</a></li>                
            <li><a href="#">More at Github</a></li>
        </ul>
    </div>
</div>

# Functions
    function invocation pattens
        function call a(), 
        method call a.b(), 
        a.call
        a.apply

    IIFE (Immediately Invoked Function Expression) 
    Lambdas
    inline functions
    closures
    default arguments

    functinoal programming
        Pure functions      as long as same input goes to function, same output is expected no side-effects
        Function composition    f.g = f(g(x))
        Avoid shared state      Object.assign
        Avoid mutating state    Object.freeze
        Avoid side effects

        first class functions   function is data
        higher order functions  a function that can take a function as argument and can return a function
        imperative vs declarative

# Collections
    Array
    Map
    Set
    WeekMap
    WeekSet

# Iterables
# Objects

    Ways of creating Objects in Javascript
        Literals
        Factory/Functional (revealing pattern)
        Constructor
        Delegation (pseudo-prototype)
        Prototype chain
        ES5 way
        Class ES6 way
        Object.create
        Concatenative Object.assign
    Deep Copy & Shallow Copy

# Mutability
    Object.freeze

# Reactive Systems
    Push
    Pull

# Proxy & MutationObserver    

# Modules
    CommonJs    require-module.exports
    ES6         import-export
    AMD & UMD

# Promises

{% highlight javascript %}
const g = n => n + 1;
const f = n => n * 2;
const wait = time => new Promise(
  (resolve, reject) => setTimeout(
    resolve,
    time
  )
);
wait(300)
  .then(() => 20)
  .then(g)
  .then(f)
  .then(value => console.log(value)); // 42
{% endhighlight %}

# async & await

# Fetch & Axios

try this..
import { from } from 'most'
// After 1 second, logs 10
from([1, 2, 3, 4])
	.delay(1000)
	.reduce((result, y) => result + y, 0)
	.then(result => console.log(result)) -->

<script>
    function myeval(){
        let arr=[];
        const err=['you cheat!', 'yo dawg!'];
        const logger = function(m){ 
            arr.push(m);                 
            document.getElementsByClassName("result")[0].innerHTML = arr.join("<br>");
        };
        s=document.getElementsByClassName("code")[0].innerText;
        s=s.trim().replace(/console.log/g, 'logger');
        if(s.length===0)
            document.getElementsByClassName("result")[0].innerHTML = err[0];
        else if (s.length>500)
            document.getElementsByClassName("result")[0].innerHTML = err[1];
        else {
            eval(s);
        }
    }
    function cleareditor(){
        document.getElementsByClassName("code")[0].innerHTML = "";
    }
</script>    