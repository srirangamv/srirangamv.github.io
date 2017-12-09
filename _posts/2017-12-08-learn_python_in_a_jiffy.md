---
layout: post
title: "Learn Python In A Jiffy"
name: "2017-12-08-learn_python_in_a_jiffy"
description: "Learn Python In A Jiffy."
date: 2017-12-08
---

<p>Here is a python language reference cheat sheet. Find code <a href="https://github.com/vwtt/PythonCheatSheet" target="_blank" title="python cheatsheet repository">here</a>.</p>
<p>
    <figure>
      <img src="/images/PythonBanner.png" alt="Learn Python In a Jiffy" width="800px" height="269px" />
      <figcaption>Learn Python In a Jiffy</figcaption>
    </figure>    
</p>

{% highlight python %}

# Learn Python in a Jiffy
import sys
from math import sqrt
from functools import reduce

print(sys.version) #Python version
print(__name__) #module name 

#ceremonial hello world program
s = str("Hello World!")
print(s) # now that baby shower is completed

#data types
size = -2
istrue = False

print(type(s))
print(type(size))
print(type(3.14))
print(type(istrue))
print(type(True))

#conditional statements
if size < 0:
    print('number is negative')
elif size > 0:
    print('number is positive')
else:
    print('number is zero')

str = "Madam"
i = 1

#loops
while i <= 10:
    print(i)
    i = i + 1

i = 0
while i < 10:
    i+=1
    if(i % 2 == 0):
        continue
    print(i)    

i = 1
while True:
    if(i > 5):
        break
    print(i)
    i+=1    

for j in str:
    print(j)

#built-in collections - list
lst = [1,2,3,4,5,6,7]

print(lst)
print(lst[:2]) #two element from start
print(lst[-2:]) #two element from end
print(lst[::3]) #start to end with stride 3

revstr = str[::-1] #start to end with stride -1
print("palindrome" if str.lower() == revstr.lower() else "not palindrome")

#comprehensions
odds = [x for x in lst if x % 2 == 1]
evens = [x for x in lst if x % 2 == 0]
squares = [x * x for x in lst]

print(odds)
print(evens)
print(squares)

#with lambda - anonymous function
odds = filter(lambda x: x % 2 == 1, lst)
oddsquares = map(lambda x: x ** 2, odds)
sumofoddsquares = reduce(lambda x, y: x + y, oddsquares)

print(sumofoddsquares)

#built-in collections - dictionary
weeks = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday"
    }
print(weeks[6])
for i in lst:
    print(weeks[i])
    
#built-in collections tuple
unitconverterindex = (1, 0.621371, 0.539957) #immutable list
print("eight kilometers are %f miles and %f nutical miles"
      % (unitconverterindex[1] * 5, unitconverterindex[2] * 5))

(male, female) = range(2) #deconstruction
print(male)
print(female)

#built-in collections - set
aset = {1, 2, 3}
print(aset)

anotherset = {2, 3, 4}
print(aset.union(anotherset))

#methods
def greeter(name):
    """This method takes name as parameter and greets with a Hello"""
    print("Hello %s" % name)

greeter("Joe")

def greeterwithsalutation(name, salutation="Mr"):
    """This method takes name as parameter and default parameter salutation greets with a Hello"""
    print("Hello %s %s" % (salutation, name))

greeterwithsalutation("Foo")
greeterwithsalutation("Bar", "Mrs")

def greetall(*names):
    """This method takes arbitary names as parameter and greets with a Hello"""
    print("Hello\n")
    for name in names:
        print("\t%s" % name)

greetall("Foo", "Bar")
greetall("Foo", "Bar", "Baz")
greetall("Foo", "Bar", "Baz", "Qux")

def trysomething(a, b):
    """This method takes two numbers divides throws exception"""
    try:
        print(a/b)
        raise ValueError('oops!')
    except ZeroDivisionError as err:
        print(repr(err))    
    except ValueError as err:
        print(err.args)
    except:
        print("some error")
    finally:
        print("cleaning the mess")

trysomething(5, 2)
trysomething(5, 0)

def sequencegenerator(n):
    """This method generates 1 to 10 numbers"""
    for i in range(n):
        yield i

for i in sequencegenerator(5):
    print(i)
    
for i in sequencegenerator(0):
    print(i)
else:
    print("no elements in the sequence")
    
#classes, objects and inheritance
class Shape:
    """This is Shape class"""
    pass

class Rectangle(Shape):
    """This is Rectangle and is inherited from Shape class"""    
    def __init__(self, l, b):
        self.Length=l
        self.Breadth=b    
    def GetArea(self):
        return self.Length*self.Breadth

r=Rectangle(3,5)
print(isinstance(r,Shape))
print(isinstance(r,Rectangle))
print(r.GetArea())
del r.Breadth
if(hasattr(r, "Breadth")):
    print(r.GetArea())
else:
    print("This rectangle have Breadth property deleted")
        
#operators of python
print((1 + 1, 2 * 2, 3 - 2, 56 / 29.8, 56 // 29.8, 5 % 3, 5 ** 4))
print((1 > 2, 1 < 2, 1 <= 2, 1 >= 2, 1 == 2, 1 != 2))
print((1 > 2 and 2 < 3, 1 > 2 or 2 < 3, not 1 > 2))
print((4 & 2, 2 | 3, ~255, 4 ^ 2, 2 >> 1, 4 << 1))
size*=-1 #2
size+=1 #3
size*=13 #39
size-=3 #36
size/=3 #12
size%=2 #0
size//4 #0
size**=2 #0
size=int(4)
size&=5 #4
size|=2 #6
size^=16 #22
size<<=1 #44
size>>=2 #11
print(size)
print((istrue is False, size is not -2))
print(("World" in s, 5 not in [1, 2, 3]))


{% endhighlight %}

<b>Output:</b>
<p class="output">
</p>