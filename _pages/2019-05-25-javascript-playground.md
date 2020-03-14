---
layout: editor
title: "JavaScript Playground"
name: "2019-05-25-javascript-playground"
description: "JavaScript Reference Cheatsheet"
date: 2019-05-05
permalink: /javascript_Reference/
---
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Extra+Condensed&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Fira Sans Extra Condensed', sans-serif;
    }

    .codeboxwrapper {
      width: 100%;
      min-height: 400px;
      background-color: aliceblue;
      overflow: hidden;
    }

    .codeboxwrapper .codebox {
      min-height: 250px;
      color: #000;
      overflow: auto;
      padding: 5px 10px 5px 10px;
      counter-reset: line;
    }

    .codeboxwrapper .codebox div:before {
      counter-increment: line;
      content: counter(line);
      display: inline-block;
      border-right: 1px solid #ddd;
      padding: 0 .5em;
      margin-right: .5em;
      color: #888
    }

    .codeboxwrapper .output {
      min-height: 130px;
      color: #ccc;
      background-color: #333;
      overflow: auto;
      padding: 5px 10px 5px 10px;
    }

    .codeboxwrapper ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: grey;
      min-height: 20px;
    }

    .codeboxwrapper ul li {
      float: left;
    }

    .codeboxwrapper ul li a {
      display: block;
      color: white;
      text-align: center;
      padding: 10px;
      text-decoration: none;
    }

    .codeboxwrapper ul li a:hover {
      background-color: #111111;
    }
  </style>

<div class="codeboxwrapper">
    <div id="codebox" class="codebox" contenteditable="true">
      function HelloWorld() {
      console.log("Hello World!");
      }
      HelloWorld();
    </div>
    <!--each line should be wrapped in div tag. all the spans will be inside this tag.-->
    <ul>
      <li><a href="#" onclick="myeval(this)">Run</a></li>
      <li><a href="#" onclick="cleareditor(this)">Clear</a></li>
      <li><a href="https://github.com/vwtt/jscheatsheet">More at Github</a></li>
    </ul>
    <div class="output">
      
    <div>
<div>

<!--<div class="codepanel">
    <h3>Type System<h3>
    <p>Primary Types: number, boolean, string, symbol, undefined, null</p>
    {% highlight javascript %}
    console.log(typeof(8));
    typeof(true)
    typeof("true")
    typeof(Symbol())
    typeof(undefined)
    typeof(null)
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="#" onclick="myeval(this)">Run</a></li>
            <li><a href="#" onclick="cleareditor(this)">Clear</a></li>                
            <li><a href="https://github.com/vwtt/jscheatsheet">More at Github</a></li>
        </ul>
    </div>
    
    <p>Reference Types: Object, Date, Array, Function</p>
    {% highlight javascript %}
    typeof(new Date())
    typeof([])
    typeof(function(){})
    console.log(typeof({}));
    {% endhighlight %}
    <div class="controlpanel">
        <ul>
            <li><a href="#" onclick="myeval(this)">Run</a></li>
            <li><a href="#" onclick="cleareditor(this)">Clear</a></li>                
            <li><a href="https://github.com/vwtt/jscheatsheet">More at Github</a></li>
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
            <li><a href="#" onclick="myeval(this)">Run</a></li>
            <li><a href="#" onclick="cleareditor(this)">Clear</a></li>                
            <li><a href="https://github.com/vwtt/jscheatsheet">More at Github</a></li>
        </ul>
    </div>
</div>

# Variables & Scope
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
        // memoize decorator with single argument
function memoize(f) {
    var obj = {};
    function wrapper(x) {
        obj[x] ? obj[x] : obj[x] = f(x);
        console.table(obj);
        return obj[x];
    }

    return wrapper;
}

// memoize decorator with arguments
function memoize(f) {
    var obj = {};
    function wrapper() {
        var arg_str = JSON.stringify(arguments);
        obj[arg_str] = obj[arg_str] || f.apply(f, arguments);
        console.table(obj);
        return cache[arg_str];
    }

    return wrapper;
}

// currying
function add(x) {
    return function (y) {
        return x + y;
    }
}

var increment = add(1);
increment(5);
increment(6);

var incrementbydozen = add(12);
incrementbydozen(5);
incrementbydozen(6);

function cube(x) { return x * x * x; }
function square(x) { return x * x; }
memcuber = memoize(cube)
memsquarer = memoize(square)

// compose
var compose = function (f, g) {
    return function (x) {
        return g(f(x));
    };
};

function addone(x) { return x + 1; }
function square(x) { return x * x; }

// creates a pipe of addone and then square
var plusonetosquare = compose(addone, square)

plusonetosquare(5)
plusonetosquare(6)
plusonetosquare(7)

var replacer = function (what, replacement) {
    return function (str) { return str.replace(what, replacement); };
}

var tolower = function (str) {
    return str.toLowerCase();
}

var snakeCase = compose(replacer(/\s+/ig, '_'), toLowerCase);

snakeCase("The Very Long Anaconda");

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
            w3CodeColor(document.getElementById("codebox"));

            function w3CodeColor(elmnt, mode) {
              var lang = (mode || "js");
              var elmntObj = (document.getElementById(elmnt) || elmnt);
              var elmntTxt = elmntObj.innerHTML;
              var tagcolor = "mediumblue";
              var tagnamecolor = "brown";
              var attributecolor = "red";
              var attributevaluecolor = "mediumblue";
              var commentcolor = "green";
              var cssselectorcolor = "brown";
              var csspropertycolor = "red";
              var csspropertyvaluecolor = "mediumblue";
              var cssdelimitercolor = "black";
              var cssimportantcolor = "red";
              var jscolor = "black";
              var jskeywordcolor = "mediumblue";
              var jsstringcolor = "brown";
              var jsnumbercolor = "red";
              var jspropertycolor = "black";
              //elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
              if (!lang) { lang = "html"; }
              if (lang == "html") { elmntTxt = htmlMode(elmntTxt); }
              if (lang == "css") { elmntTxt = cssMode(elmntTxt); }
              if (lang == "js") { elmntTxt = jsLineMode(elmntTxt.trim()); } //jsMode(elmntTxt)
              elmntObj.innerHTML = elmntTxt;

              function extract(str, start, end, func, repl) {
                var s, e, d = "", a = [];
                while (str.search(start) > -1) {
                  s = str.search(start);
                  e = str.indexOf(end, s);
                  if (e == -1) { e = str.length; }
                  if (repl) {
                    a.push(func(str.substring(s, e + (end.length))));
                    str = str.substring(0, s) + repl + str.substr(e + (end.length));
                  } else {
                    d += str.substring(0, s);
                    d += func(str.substring(s, e + (end.length)));
                    str = str.substr(e + (end.length));
                  }
                }
                this.rest = d + str;
                this.arr = a;
              }
              function htmlMode(txt) {
                var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
                comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
                rest = comment.rest;
                while (rest.indexOf("&lt;") > -1) {
                  note = "javascript";
                  startpos = rest.indexOf("&lt;");
                  if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") { note = "css"; }
                  if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") { note = "javascript"; }
                  endpos = rest.indexOf("&gt;", startpos);
                  if (endpos == -1) { endpos = rest.length; }
                  done += rest.substring(0, startpos);
                  done += tagMode(rest.substring(startpos, endpos + 4));
                  rest = rest.substr(endpos + 4);
                  if (note == "css") {
                    endpos = rest.indexOf("&lt;/style&gt;");
                    if (endpos > -1) {
                      done += cssMode(rest.substring(0, endpos));
                      rest = rest.substr(endpos);
                    }
                  }
                  if (note == "javascript") {
                    endpos = rest.indexOf("&lt;/script&gt;");
                    if (endpos > -1) {
                      done += jsMode(rest.substring(0, endpos));
                      rest = rest.substr(endpos);
                    }
                  }
                }
                rest = done + rest;
                for (i = 0; i < comment.arr.length; i++) {
                  rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
                }
                return rest;
              }
              function tagMode(txt) {
                var rest = txt, done = "", startpos, endpos, result;
                while (rest.search(/(\s|<br>)/) > -1) {
                  startpos = rest.search(/(\s|<br>)/);
                  endpos = rest.indexOf("&gt;");
                  if (endpos == -1) { endpos = rest.length; }
                  done += rest.substring(0, startpos);
                  done += attributeMode(rest.substring(startpos, endpos));
                  rest = rest.substr(endpos);
                }
                result = done + rest;
                result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
                if (result.substr(result.length - 4, 4) == "&gt;") {
                  result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
                }
                return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
              }
              function attributeMode(txt) {
                var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
                while (rest.indexOf("=") > -1) {
                  endpos = -1;
                  startpos = rest.indexOf("=");
                  singlefnuttpos = rest.indexOf("'", startpos);
                  doublefnuttpos = rest.indexOf('"', startpos);
                  spacepos = rest.indexOf(" ", startpos + 2);
                  if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
                    endpos = rest.indexOf(" ", startpos);
                  } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
                  } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
                  }
                  if (!endpos || endpos == -1 || endpos < startpos) { endpos = rest.length; }
                  done += rest.substring(0, startpos);
                  done += attributeValueMode(rest.substring(startpos, endpos + 1));
                  rest = rest.substr(endpos + 1);
                }
                return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
              }
              function attributeValueMode(txt) {
                return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
              }
              function commentMode(txt) {
                return "<span style=color:" + commentcolor + ">" + txt + "</span>";
              }
              function cssMode(txt) {
                var rest = txt, done = "", s, e, comment, i, midz, c, cc;
                comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
                rest = comment.rest;
                while (rest.search("{") > -1) {
                  s = rest.search("{");
                  midz = rest.substr(s + 1);
                  cc = 1;
                  c = 0;
                  for (i = 0; i < midz.length; i++) {
                    if (midz.substr(i, 1) == "{") { cc++; c++ }
                    if (midz.substr(i, 1) == "}") { cc--; }
                    if (cc == 0) { break; }
                  }
                  if (cc != 0) { c = 0; }
                  e = s;
                  for (i = 0; i <= c; i++) {
                    e = rest.indexOf("}", e + 1);
                  }
                  if (e == -1) { e = rest.length; }
                  done += rest.substring(0, s + 1);
                  done += cssPropertyMode(rest.substring(s + 1, e));
                  rest = rest.substr(e);
                }
                rest = done + rest;
                rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
                rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
                for (i = 0; i < comment.arr.length; i++) {
                  rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
                }
                return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
              }
              function cssPropertyMode(txt) {
                var rest = txt, done = "", s, e, n, loop;
                if (rest.indexOf("{") > -1) { return cssMode(rest); }
                while (rest.search(":") > -1) {
                  s = rest.search(":");
                  loop = true;
                  n = s;
                  while (loop == true) {
                    loop = false;
                    e = rest.indexOf(";", n);
                    if (rest.substring(e - 5, e + 1) == "&nbsp;") {
                      loop = true;
                      n = e + 1;
                    }
                  }
                  if (e == -1) { e = rest.length; }
                  done += rest.substring(0, s);
                  done += cssPropertyValueMode(rest.substring(s, e + 1));
                  rest = rest.substr(e + 1);
                }
                return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
              }
              function cssPropertyValueMode(txt) {
                var rest = txt, done = "", s;
                rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
                while (rest.search(/!important/i) > -1) {
                  s = rest.search(/!important/i);
                  done += rest.substring(0, s);
                  done += cssImportantMode(rest.substring(s, s + 10));
                  rest = rest.substr(s + 10);
                }
                result = done + rest;
                if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
                  result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
                }
                return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
              }
              function cssImportantMode(txt) {
                return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
              }
              function jsLineMode(txt) {
                var res = [];
                var lines = txt.trim().split('\n');
                for (var i = 0; i < lines.length; i++) {
                  res.push(`<div>${jsMode(lines[i].trim())}</div>`);
                }
                return res.join('\n');
              }
              function jsMode(txt) {
                var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
                for (i = 0; i < rest.length; i++) {
                  cc = rest.substr(i, 1);
                  if (cc == "\\") {
                    esc.push(rest.substr(i, 2));
                    cc = "W3JSESCAPE";
                    i++;
                  }
                  tt += cc;
                }
                rest = tt;
                y = 1;
                while (y == 1) {
                  sfnuttpos = getPos(rest, "'", "'", jsStringMode);
                  dfnuttpos = getPos(rest, '"', '"', jsStringMode);
                  compos = getPos(rest, /\/\*/, "*/", commentMode);
                  comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
                  numpos = getNumPos(rest, jsNumberMode);
                  keywordpos = getKeywordPos("js", rest, jsKeywordMode);
                  dotpos = getDotPos(rest, jsPropertyMode);
                  if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) { break; }
                  mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
                  if (mypos[0] == -1) { break; }
                  if (mypos[0] > -1) {
                    done += rest.substring(0, mypos[0]);
                    done += mypos[2](rest.substring(mypos[0], mypos[1]));
                    rest = rest.substr(mypos[1]);
                  }
                }
                rest = done + rest;
                for (i = 0; i < esc.length; i++) {
                  rest = rest.replace("W3JSESCAPE", esc[i]);
                }
                return "<span style=color:" + jscolor + ">" + rest + "</span>";
              }
              function jsStringMode(txt) {
                return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
              }
              function jsKeywordMode(txt) {
                return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
              }
              function jsNumberMode(txt) {
                return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
              }
              function jsPropertyMode(txt) {
                return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
              }
              function getDotPos(txt, func) {
                var x, i, j, s, e, arr = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
                s = txt.indexOf(".");
                if (s > -1) {
                  x = txt.substr(s + 1);
                  for (j = 0; j < x.length; j++) {
                    cc = x[j];
                    for (i = 0; i < arr.length; i++) {
                      if (cc.indexOf(arr[i]) > -1) {
                        e = j;
                        return [s + 1, e + s + 1, func];
                      }
                    }
                  }
                }
                return [-1, -1, func];
              }
              function getMinPos() {
                var i, arr = [];
                for (i = 0; i < arguments.length; i++) {
                  if (arguments[i][0] > -1) {
                    if (arr.length == 0 || arguments[i][0] < arr[0]) { arr = arguments[i]; }
                  }
                }
                if (arr.length == 0) { arr = arguments[i]; }
                return arr;
              }
              function getKeywordPos(typ, txt, func) {
                var words, i, pos, rpos = -1, rpos2 = -1, patt;
                if (typ == "js") {
                  words = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete",
                    "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import",
                    "in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static",
                    "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
                }
                for (i = 0; i < words.length; i++) {
                  pos = txt.indexOf(words[i]);
                  if (pos > -1) {
                    patt = /\W/g;
                    if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
                      if (pos > -1 && (rpos == -1 || pos < rpos)) {
                        rpos = pos;
                        rpos2 = rpos + words[i].length;
                      }
                    }
                  }
                }
                return [rpos, rpos2, func];
              }
              function getPos(txt, start, end, func) {
                var s, e;
                s = txt.search(start);
                e = txt.indexOf(end, s + (end.length));
                if (e == -1) { e = txt.length; }
                return [s, e + (end.length), func];
              }
              function getNumPos(txt, func) {
                var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
                for (i = 0; i < txt.length; i++) {
                  for (j = 0; j < arr.length; j++) {
                    c = txt.substr(i, arr[j].length);
                    if (c == arr[j]) {
                      if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
                        continue;
                      }
                      endpos = i;
                      if (startpos < endpos) {
                        word = txt.substring(startpos, endpos);
                        if (!isNaN(word)) { return [startpos, endpos, func]; }
                      }
                      i += arr[j].length;
                      startpos = i;
                      i -= 1;
                      break;
                    }
                  }
                }
                return [-1, -1, func];
              }
            }

        
    function myeval(tgt){
        let arr=[];
        const err=['you cheat!', 'yo dawg!'];
        r=tgt.parentElement.parentElement.nextElementSibling;        
        if(!r){
            r=document.createElement("div");
            tgt.parentElement.parentElement.parentElement.appendChild(r);
        }
        const logger = function(m){ 
            arr.push(m);                 
            r.innerHTML = arr.join("<br>");
        };
        s=tgt.parentElement.parentElement.previousElementSibling.innerText;
        s=s.trim().replace(/console.log/g, 'logger');
        if(s.length===0)
            r.innerHTML = err[0];
        else if (s.length>500)
            r.innerHTML = err[1];
        else {
            eval(s);
        }
    }
    function cleareditor(tgt){
        r=tgt.parentElement.parentElement.nextElementSibling;
        r.innerHTML = "";
    }
</script>    