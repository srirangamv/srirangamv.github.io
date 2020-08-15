---
layout: post
title: "S.O.L.I.D Priciples"
name: "2020-08-16-solid-priciples"
description: "Simple example for demonstrating S.O.L.I.D Priciples."
date: 2020-08-16
---

# Single Responsibility Principle
<p>We should have only one reason to modify a class.</p>

{% highlight csharp %}

namespace SolidPrinciples
{
    public class NonSRP
    {
        public int Temparature{get; private set;}

        public NonSRP(int _t)
        {
            this.Temparature = _t;
        }

        public int ConvertToFor()
        { 
            //responsibility 1. primary
            return this.Temparature * 5/32;
        }

        public void SaveToFile()
        { 
            //responsibility 2. secondary. can be moved to a separate class.
            // some way
        }

        public void SaveToDatabase()
        { 
            //responsibility 3. secondary. can be moved to a separate class.
            // some way
        }

        public void DoPilates()
        { 
            //responsibility 4. unnecessary. nothing to do with this class.
            // some way
        }
    }

{% endhighlight %}

# Open Closed Principle
<p>consider long chains of if..else or switch cases inside classes.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    public class NonOCP
    { 
        //this class is open for modification. and not extensible.
        public double Price{get; private set;}
        public double DiscountedPrice{get; private set;}

        public void CalculatePrice(int a)
        {
            switch(a)
            {
                case 1:
                    // 1 specific functionality
                    this.DiscountedPrice =  0.2 * this.Price;
                    break;
                case 2:
                    // 2 specific functionality
                    this.DiscountedPrice =  0.3 * this.Price;
                    break;
                case 3:
                    // 3 specific functionality
                    this.DiscountedPrice =  0.4 * this.Price;
                    break;

                default:
                    // default functionality
                    this.DiscountedPrice =  0.05 * this.Price;
                    break;
            }
        }
    }

    public class OCP
    {
        public double Price{get; private set;}
        public double DiscountedPrice{get; private set;}
        
        public void CalculatePrice(IDiscountStrategy strategy)
        {
            this.DiscountedPrice =  strategy.applyDiscount(this.Price);
        }
    }

    public interface IDiscountStrategy
    {
        public double applyDiscount(double price);
    }

    public class OneTypeDiscount : IDiscountStrategy
    {
        public double applyDiscount(double price){
            return 0.2 * price;
        }
    }
    
    //... we can have N number of discount strategies. without distrubing the any existing classes.
    public class NthTypeDiscount : IDiscountStrategy
    {
        public double applyDiscount(double price)
        {
            return 0.99 * price;
        }
    }

{% endhighlight %}

# Lislov Substituition Principle
<p>all sub classes replaceable using base absrtaction. wrong abstraction applied.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    public class Driver
    {        
        public static void Main()
        {
            List<Base> arr = new List<Base>()
            {
                new A(),
                new A(),
                new A(),
                new B(),
                new B(),
                //new C(), //this not replacable.
                new D()
            };

            foreach(Base element in arr)
            {
                element.BaseFunc();
            }

            (new D()).BaseFunc();

            var birds = new List<Bird>()
            {
                new Parrot(),
                new Parrot(),
                new Pigeon(),
                new Kiwi() // not replacable. not a perfect abstraction.
            };

            foreach(Bird bird in birds)
            {
                bird.Fly();
            }
        }
    }

    public abstract class Bird
    {
        public abstract void Fly();
    }

    public class Parrot : Bird
    {
        public override void Fly()
        {
            Console.WriteLine("flying..");
        }
    }

    public class Pigeon : Bird
    {
        public override void Fly()
        {
            Console.WriteLine("flying..");
        }
    }

    public class Kiwi : Bird
    {
        public override void Fly()
        {
            throw new Exception("we won't do that in Newzeland.");
        }
    }

    public class Base
    {
        public virtual void BaseFunc()
        {
            ThisMustBeCalled();
        }

        public void ThisMustBeCalled()
        {
            Console.WriteLine("calling a protocal");
        }
    }

    public class A: Base
    {
        public override void BaseFunc()
        {
            // do sub stuff
            base.BaseFunc();
        }
    }    

    public class B: Base
    {
        public override void BaseFunc()
        {
            // do sub stuff
            base.BaseFunc();
        }
    }

    public class C: Base
    {
        public override void BaseFunc()
        {
            throw new Exception("we don't do that here.");
        }
    }

    public class D: Base
    {
        public new void BaseFunc()
        {
            Console.WriteLine("calling D");
            throw new Exception("we don't do that here.");
        }
    }

{% endhighlight %}

# Interface Segregation Principle
<p>not giving more details via interfaces/abstraction.<p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{

    public interface NonISPBankAccount
    {
        double getBalance();
        double deposit(double d);
        double withdraw(double d);

        double transfer(Account to, double d);
    }

    public interface ISPBankAccountPart1
    {
        public double getBalance();
        public double deposit(double d);
    }

    public interface ISPBankAccountPart2
    {
        public double withdraw(double d);

        public double transfer(Account to, double d);
    }

    public class Account : NonISPBankAccount
    { 
        //bad non isp
        public double getBalance()
        {
            return 0.0;
        }

        public double deposit(double d)
        {
            return d;
        }

        public double withdraw(double d)
        {
            return -d;
        }

        public double transfer(Account to, double d)
        {
            return -d;
        }
    }

    public class Account2 : ISPBankAccountPart1, ISPBankAccountPart2 
    { 
        //good isp
        public double getBalance()
        {
            return 0.0;
        }
        public double deposit(double d)
        {
            return d;
        }
        public double withdraw(double d)
        {
            return -d;
        }

        public double transfer(Account to, double d)
        {
            return -d;
        }
    }

    public class InterestCalculator
    { 
        //bad
        public void CalculateInterest(ICollection<NonISPBankAccount> accounts)
        {
            foreach(var account in accounts)
            {
                account.deposit(account.getBalance() * 0.4);
                //probable misuse.//this calculator doesn't need to have access to withdraw/transfer.
                account.withdraw(5); 
            }
        }
    }

    public class InterestCalculator2
    { 
        //good
        public void CalculateInterest(ICollection<ISPBankAccountPart1> accounts)
        {
            foreach(var account in accounts)
            {
                account.deposit(account.getBalance() * 0.4);
                //cannot misuse.//this calculator doesn't have access to withdraw/transfer.
                //account.withdraw(5); //will not work.
            }
        }
    }

{% endhighlight %}

# Dependency Inversion Principle
<p>try to decouple the classes. removing hard dependencies among classes.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    public class Dependency
    {

    }

    public class NonDIPUsageOfDependency
    {
        //creating a hard dependency. hence not testable. mockable.
        private Dependency dep = new Dependency();

        public NonDIPUsageOfDependency()
        {

        }
    }

    //this testable. injectable. works well with DI containers.
    //coding to abstraction.
    public interface IDependentServices
    {

    }

    public class LooselyDependency : IDependentServices
    {

    }    
    
    public class DIPUsageOfDependency
    {
        private IDependentServices dep;
        public DIPUsageOfDependency(IDependentServices _d)
        {
            this.dep = _d;
        }
    }
}

{% endhighlight %}