---
layout: post
title: "C# on GitHub Blog post"
date: 2016-02-20
---

testing sample c# code.

```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        public int SampleProperty { set; get; }
        public void Print()
        {
            Console.WriteLine("Sample");
        }
        public int AddTwo(int aa, int bb)
        {
            return aa + bb;
        }
        public Program(int val)
        {
            a = SampleProperty = val;
        }
        public delegate int GetSum(int one, int two);
        public event GetSum OnGetSum;
        int a = 6;
        const double g = 4.5;
        public static void Main()
        {
            Program p = new Program(5);
            p.OnGetSum += p.AddTwo;
            if (p.OnGetSum != null)
                p.a = p.OnGetSum(5, 6);
            GetSum gs = new GetSum(p.AddTwo);
            gs(56, 65);

            Program q = new Program(8);
            Program c = p + q;
        }
        public int this[int i]
        {
            get
            {
                return a;
            }
            set
            {
                a = value;
            }
        }
        public static Program operator +(Program pp, Program qq)
        {
            return new Program(qq.a + pp.a);
        }
    }
}

```