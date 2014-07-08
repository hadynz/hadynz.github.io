---
layout: post
title: Object Eval Extension
date: 2012-10-22 -1726
categories: ['blog']
tags: ['code gem']
comments: true
meta: true
quote:
    text: Every extension of knowledge arises from making the conscious the unconscious.
    author: Friedrich Nietzsche
---
How often do you litter your code with long if-statement tests to guard against accessing a null reference of a
property's parent like so:

{% highlight csharp %}
if (Person != null && !string.IsNullOrEmpty(Person.FirstName)) {
    var firstName = Person.FirstName;
}
{% endhighlight %}

Surely we could come up with a more elegant method in C# to break out of this cumbersome pattern that adds
unnecessary bloat for other humans to read your actual business logic.

I came across a great pattern that solves this exact problem with a lot of elegance by leveraging of .NET's 
[default keyword](http://msdn.microsoft.com/en-us/library/xwth0h0d.aspx). So the above example, could simply
be re-written as follows:

{% highlight csharp %}
var firstName = Person.Eval(p => p.FirstName);
{% endhighlight %}

The secret is in creating a **chainable** extension method that tries to either evaluate a property or return
its **default value** if it fails a null check. 

Check out the following gist for the complete example. It is one of those code gems that I always end up 
introducing to any project that I work on.

### Eval Extension Gist
{% gist hadynz/f7db6c9669b1f4520952 EvalExtension.cs %}
