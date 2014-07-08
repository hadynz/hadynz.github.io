---
layout: post
title: Sitecore login redirecting to self
date: 2013-03-21
categories: ['blog']
comments: true
meta: true
image:
  feature: covers/sitecore-cover.jpg
quote:
    text: Disassociating, mindfulness, transcendence-whatever the label-it's a sort of loophole in our contract with reality, a form of self-rescue.
    title: One Hundred Names for Love
    author: Diane Ackerman,
---
This is one of those issues that you tell people in a morning stand-up that you'd definitely get done before lunch
and that you were jumping on another item in the backlog but then you instead end up pulling your hair for the 
entire day.

I ran into a seemingly random issue were upon login into Sitecore, I was greeted with the following .Net error:

~~~
Object of type 'System.Int32' cannot be converted to type 'System.Web.Security.Cryptography.Purpose'
~~~

A quick google search returned many results and 
[many of them](http://www.sitecore.net/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2012/09/Object-of-type-System-Int32-cannot-be-converted-to-type-System-Web-Security-Cryptography-Purpose.aspx)
recommended to set `Login.RememberLastLoggedInUserName = false`.

Sure enough, the error went away but instead I ran into a weirder problem - the login form keeps posting to itself
and showing a blank login form?! I swear my login credentials were typed with one finger and were correct.

After much trial and error, I finally ran into the following Sitecore fixed that seemed to have fixed the problem. By 
adding the following method to `Website\Global.asax` just before the `</script>` tag:

{% highlight csharp %}
public void FormsAuthentication_OnAuthenticate(object sender, FormsAuthenticationEventArgs args)
{
   args.User = Sitecore.Context.User;
}
{% endhighlight %}

So what exactly does the above snippet do?

Well Sitecore eventually caught up to this problem and [documented](https://kb.sitecore.net/articles/538600) that it 
is a known problem with `< Sitecore 6.6.0 Update 1` when running under .NET Framework 4.5 and under the `Forms`
authentication mode.