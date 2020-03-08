---
layout: post
title: "Advanced Python"
name: "2019-03-08-advanced_python_notes.md"
description: "Advanced Python language concepts."
date: 2019-03-08
---

<p>Here is the python language reference sheet for advanced concepts. Find code <a href="https://github.com/vwtt/PythonCheatSheet" target="_blank" title="python cheatsheet repository">here</a>.</p>

{% highlight python %}

# Learn Python in a Jiffy
#installation

print("Hello World!")

# This is a comment. And will be ignored by Python.
print("Comments are for humans.") # This is also a comment.

"""This is also a
perfect example of
multi-line comments"""

# Printing
#	The value conversion will use the ``alternate form'' (where defined below).
#0	The conversion will be zero padded for numeric values.
#-	The converted value is left adjusted (overrides the "0" conversion if both are given).
# 	(a space) A blank should be left before a positive number (or empty string) produced by a signed #conversion.
#+	A sign character ("+" or "-") will precede the conversion (overrides a "space" flag).

#d	Signed integer decimal.	
#i	Signed integer decimal.	
#o	Unsigned octal.	(1)
#u	Unsigned decimal.	
#x	Unsigned hexadecimal (lowercase).	(2)
#X	Unsigned hexadecimal (uppercase).	(2)
#e	Floating point exponential format (lowercase).	
#E	Floating point exponential format (uppercase).	
#f	Floating point decimal format.	
#F	Floating point decimal format.	
#g	Same as "e" if exponent is greater than -4 or less than precision, "f" otherwise.	
#G	Same as "E" if exponent is greater than -4 or less than precision, "F" otherwise.	
#c	Single character (accepts integer or single character string).	
#r	String (converts any python object using repr()).	(3)
#s	String (converts any python object using str()).	(4)
#%	No argument is converted, results in a "%" character in the result.	

print('%(language)s has %(#)06d quote types.' % \
          {'language': "Python", "#": 2})

print("." * 40)

# Numbers and Math
print(12 + 3)
print(12 - 3)
print(12 * 3)
print(12 / 5)
print(12 // 5)
print(12 % 5)
print(2 ** 3)

# Variables and Assignment
temp_celcius = 37
temp_fahrenheit = (temp_celcius * 9 / 5) + 32
print('temparature %d celcius = %f farhenheit' % (temp_celcius, temp_fahrenheit))

# Comparison
my_age = 38
your_age = 24
print(my_age < your_age)
print(my_age <= your_age)
print(my_age > your_age)
print(my_age >= your_age)
print(my_age == your_age)
print(my_age != your_age)

print('Am I younger to you? %s', my_age < your_age)
print('Car' > 'Apple') # works on strings too. dictionary order

# Logical
my_nationality = 'Indian'
my_age = 20
eligible_to_vote = my_age >= 18 and my_nationality == 'Indian'
not_eligible_to_vote = not eligible_to_vote 

print('Am I eligible to vote in India? %s', eligible_to_vote)
print('Am I not eligible to vote in India? %s', not_eligible_to_vote)

num = 15
is_divisible_by_3_or_5 = num % 3 == 0 or num % 5 == 0
print('Is this numberAm %d is divisble by 3 or 5 %s', (num, is_divisible_by_3_or_5))


# Assignment
x = 5	
x += 3	# x = x + 3	
x -= 3	# x = x - 3	
x *= 3	# x = x * 3	
x /= 3	# x = x / 3	
print(x)

x = 2
x **= 3	# x = x ** 3
x //= 3	# x = x // 3		
x %= 3	# x = x % 3	
print(x)

x = 1
x |= 7	# x = x | 7
x &= 3	# x = x & 3	
print(x)

x = 1	
x <<= 3	# x = x << 3
x >>= 1	# x = x >> 3
x ^= 3	# x = x ^ 3	
print(x)

# Identity
a = "Vikram"
b = "Vikram"
print(a is b)
print(a is not b)

# Membership
c = 'ram'
print(c in a)
print(c not in a)

# Bitwise

# Basic Data Types
my_age = 36
my_weight = 136.5 # pounds
my_name = "James Tong"
married = False

print(type(my_age))
print(type(my_weight))
print(type(my_name))
print(type(married))

# Statements

class A:
    pass

a = A()
print(isinstance(a, A))
print(isinstance(a, object))

#raise A() # TypeError

class B(BaseException):
    pass

raise B("First Exception")

# Collections

# Methods

# Classes and Objects
from datetime import date

class Person: 
    def __init__(self, name, age): 
        self.name = name 
        self.age = age 
      
    # a class method to create a Person object by birth year. 
    @classmethod
    def fromBirthYear(cls, name, year): 
        return cls(name, date.today().year - year) 
      
    # a static method to check if a Person is adult or not. 
    @staticmethod
    def isAdult(age): 
        return age > 18
        
    @property
    def a(self):
        return self.propa
    
    @a.setter
    def a(self, value):
        self.propa = value
        
    @a.deleter
    def a(self):
        print("deleting")
        del self.propa
  
p = Person("Vikram", 34)
#print(p.a)
p.a=23
print(p.a)
del p.a
#print(p.a)

# Iterators
nums = [1, 2, 3]
it = iter(nums)

#print(dir(it))

print(next(it))
print(next(it))
print(next(it))
# print(next(it)) # will throw StopIteration

#f = open('/etc/fstab')
#print(f is f.__iter__())

# Generator Expressions
for i in range(10):
    print(i)

for i in [1, 2, 3, 4, 5, 6]:
    print(i)
    
for i in [j for j in [1, 2, 3, 4, 5, 6] if j % 3 == 0]:
    print(i)
   
print('.' * 20) 

# Generators
def simple_generator(): # produces 1 6 8
    a = 1
    yield a
    a += 5
    yield a
    a += 2
    yield a

it = simple_generator()
print(next(it))
print(next(it))
print(next(it))

for i in simple_generator():
    print(i)
    
# Generators (Bidirectional communication)
it.send(12)
it.throw(IndexError)
it.close()

# Functions
def add(a, b):
    return a+b
    
c = add(1, 2)
print(c)

########### First Class Object ###########

def add(a, b):
    return a + b
    
def mul(a, b):
    return a * b
    
def subtract(a, b):
    return a - b

def divide(a, b):
    return a / b
    
def domathop(op, a, b):
    return op(a, b)

c = domathop(add, 1, 2)
print(c)
c = domathop(mul, 1, 2)
print(c)
c = domathop(subtract, 1, 2)
print(c)
c = domathop(divide, 1, 2)
print(c)

############ Inline Functions #############
def doallmathop(a, b):
    def add(a, b):
        return a + b
        
    def mul(a, b):
        return a * b
        
    def subtract(a, b):
        return a - b
    
    def divide(a, b):
        return a / b
        
    print(add(a, b))
    print(mul(a, b))
    print(subtract(a, b))
    print(divide(a, b))

doallmathop(1, 2)    

############ function returning function ############
def multiply(a, b):
    return a * b
    
def doubler(a):
    return multiply(a, 2)
    
c = doubler(4)
print(c)
c = doubler(7)
print(c)

# Decorators
def hello():
    return 'hello'
    
def worldgreeter(func):
    def wrapper():
        return func() + ' ' + 'world!'
    
    return wrapper
    
helloworldgreeter = worldgreeter(hello)
print(helloworldgreeter())

@worldgreeter
def sayhitoworld():
    return 'hi'
    
print(sayhitoworld())

class WordProcessor(object):
    PLUGINS = []
    def process(self, text):
        for plugin in self.PLUGINS:
            text = plugin().cleanup(text)
        return text

    @classmethod
    def plugin(cls, plugin):
        cls.PLUGINS.append(plugin)

@WordProcessor.plugin
class CleanMdashesExtension(object):
    def cleanup(self, text):
        return text.replace('&mdash;', u'\N{em dash}')

# Context Managers

class worldgreeter:
  def __init__(self):
    self.msg = 'hello world!'

  def __enter__(self):
    return self.msg
    
  def __exit__(self, *args):
     # clean resources
    self.msg = None

with worldgreeter() as msg:
    print(msg)

@contextlib.contextmanager
def worldgreeter(<arguments>):
    msg = 'hello world!'
    try:
        yield msg
    finally:
        msg = None
    
with worldgreeter() as msg:
    print(msg)

# Keywords
"""
False	class	finally	is	return
None	continue	for	lambda	try
True	def	from	nonlocal	while
and	del	global	not	with
as	elif	if	or	yield
assert	else	import	pass	 
break	except	in	raise
"""
{% endhighlight %}