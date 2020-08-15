---
layout: post
title: "S.O.L.I.D Priciples"
name: "2020-08-16-solid-priciples"
description: "Simple example for demonstrating S.O.L.I.D Priciples."
date: 2020-08-16
---

# Single Responsibility Principle

<p>We should have only one reason to modify a class. Essentially, we have to make a class responsible for only one thing. In practice, we stuff more responsibilities in a single class. This should be avoided. We can break the responsibilitis into multiple classes. Below is a Temparature conversion class, handling additional responsiblities like saving to file or database. Keeping the responsibilities separate in different classes allow us making changes easier in the future.</p>

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

<p>Consider long chains of if..else or switch cases inside classes, this makes the class vulnerable to changes in the future and thus it may interrupt or break the already exisitng functionality. Below class NonOCP has a switch statement, which makes it open to modification in the future. E.g. for a new a case, we may have to modify this class by adding another case. This class is not adhere to open closed principle. What this principle tells that a class should be open for extention and closed for modification. See the example class OCP, which wraps each switch case into a class of IDiscountStrategy thus we can always extend the class by creating new sub class but base class itself is closed for modification. Without modifying the any class but by creating a new sub class we are safely extending the functionality. Here we can have N number of discount strategies, without distrubing any of the existing classes.</p>

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
    
    public class NthTypeDiscount : IDiscountStrategy
    {
        public double applyDiscount(double price)
        {
            return 0.99 * price;
        }
    }

{% endhighlight %}

# Lislov Substituition Principle

<p>When, we are creaing an hierarchy, we should make sure that all sub classes replaceable using base absrtaction. Some times wrong abstraction applied and a subclass is created. This wrongly abstracted class will break this principle. Consider a real example of Bird abstraction, most of the birds will fly. But in the case of Kiwi which is a bird and cannot fly. This makes Kiwi a wrong abstraction here.This principle make sures that when we dealing with abstraction, all the sub classes should adhere to the abstracted behavior. Otherwise a client class which depends on this abstraction will fail by one or two wrongly abstracted sub classes.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    public class Driver
    {        
        public static void Main()
        {
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
            throw new Exception("we won't do this in Newzeland.");
        }
    }

{% endhighlight %}

# Interface Segregation Principle

<p>We should not force a client class with more details it needed from the class. Giving more details will create a chance of client misusing the functionality. This principle tells about not giving more details via interfaces/abstraction to the client classes. Cleanly separated interfaces or abstraction will make sure this principle followed. Consider the interface NonISPBankAccount whcih wraps all the functionality into a signle abstraction and when this interface used by InterestCalculator client class, probable misuse can happen. InterestCalculator need not have access to transfer method. All it needs is how to get balance and deposit the interest amount into the account.<p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    //bad non isp
    public interface NonISPBankAccount
    {
        double GetBalance();
        double Deposit(double d);
        double Withdraw(double d);
        double Transfer(Account to, double d);
    }

    public class Account : NonISPBankAccount
    {        
        public double GetBalance()
        {
            return 0.0;
        }

        public double Deposit(double d)
        {
            return d;
        }

        public double Withdraw(double d)
        {
            return -d;
        }

        public double Transfer(Account to, double d)
        {
            return -d;
        }
    }

    public class InterestCalculator
    {
        public void CalculateInterest(ICollection<NonISPBankAccount> accounts)
        {
            foreach(var account in accounts)
            {
                account.Deposit(account.getBalance() * 0.4);
                // probable misuse.
                // this calculator doesn't need to have access to withdraw/transfer.
                account.Withdraw(5);         // bad.
            }
        }
    }

    //good isp
    public interface ISPBankAccountPart1
    {
        public double GetBalance();
        public double Deposit(double d);
    }

    public interface ISPBankAccountPart2
    {
        public double Withdraw(double d);

        public double Transfer(Account to, double d);
    }

    public class Account2 : ISPBankAccountPart1, ISPBankAccountPart2 
    {        
        public double GetBalance()
        {
            return 0.0;
        }

        public double Deposit(double d)
        {
            return d;
        }

        public double Withdraw(double d)
        {
            return -d;
        }

        public double Transfer(Account to, double d)
        {
            return -d;
        }
    }

    public class InterestCalculator2
    {        
        public void CalculateInterest(ICollection<ISPBankAccountPart1> accounts)
        {
            foreach(var account in accounts)
            {
                account.Deposit(account.getBalance() * 0.4);
                //cannot misuse.//this calculator doesn't have access to withdraw/transfer.
                account.Withdraw(5); //good //will not work. 
            }
        }
    }

{% endhighlight %}

# Dependency Inversion Principle

<p>A client class should not directly depend implementations of a class. It should depend on abstractions. This principle tries to decouple the classes by removing hard dependencies among classes. A client class directly creates a dependency class makes the changes difficult. As the implementation changes, client class may break. Depending on the abstraction removes this dependency. Both classes can have independent and will works fine as long as the abstraction is not broken.</p>

{% highlight csharp %}

using System;
using System.Collections.Generic;

namespace SolidPrinciples
{
    public class Dependency
    {

    }

    // bad
    public class NonDIPUsageOfDependency
    {
        //creating a hard dependency. hence not testable.
        private Dependency dep = new Dependency();

        public NonDIPUsageOfDependency()
        {

        }
    }
    
    // good
    public interface IDependentServices
    {

    }

    //coding to abstraction.
    public class Dependency : IDependentServices
    {

    }    

    // this testable. injectable. works well with DI containers.    
    public class DIPUsageOfDependency
    {
        // client class dependent on abstraction. not implementation.
        private IDependentServices dep;

        public DIPUsageOfDependency(IDependentServices _d)
        {
            this.dep = _d;
        }
    }
}

{% endhighlight %}