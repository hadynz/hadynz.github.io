---
layout: posts
title: "DalekJS: Test if an element has focus"
description: "How to test if an element has focus in DalekJS"
keywords: "dalekjs, testing, focus, workaround"
date: 2014-07-11 10:42
categories: ['blog']
tags: ['dalekjs', 'testing']
comments: true
meta: true
quote:
    text: "You cannot depend on your eyes when your imagination is out of focus."
    author: Mark Twain
---
### Introducing DalekJS
We are currently making a big push at work to try and automate testing of all our front end code and try and
achieve as much code coverage as possible.

Besides writing unit tests, we wanted to write UI tests to test our components and their behaviour in the
browser. Selenium was an obvious candidate for this work, but we all just knew that none of us developers would
want to maintain Selenium tests and run them after every change in the code.

We needed something that was quick to run, and allowed us to failed our cost fast; oh and fun to write as well!
This where DalekJS comes into the picture. It has come into life when another group of very smart people went
down the Selenium path and ran into a whole lot of problems before deciding to solve the problem properly and in
turn creating DalekJS for all of us to use. I definitely would reccomend their 
"[This ain't Selenium](http://dalekjs.com/pages/getStarted.html)" write-up that shares a great learning lesson
for all software development teams out there.

### Test for element focus in DalekJS
Anyway, so not getting into too much detail about how DalekJS should be used (that is a write-up for another time),
I was writing some tests and needed a way to test if a given element on the page has focus.

DalekJS currently does not support such an assert requirement. However, DalekJS provides the powerful 
[`.execute`](http://dalekjs.com/docs/actions.html#meth-execute) action which allows for any JavaScript function to be
executed within the browser context.

Not wanting to be dependent on any other JavaScript framework like JQuery to determine if an element selector has
focus, I wrote the following helper method to test for focus by using the native
[`document.activeElement`](http://devdocs.io/dom/document.activeelement) function available in browsers from as old
as IE4.

{% highlight javascript %}
module.exports = {
    hasFocus: function(test, selector, message) {
        return test
            .execute(function(selectorParam, messageParam){
                var expectedEl = window.document.querySelector(selectorParam);
                var activeEl = window.document.activeElement;
                this.assert.ok(expectedEl === activeEl, messageParam);
            }, selector, message);
    }
}
{% endhighlight %}

One important gotcha picked up whilst writing the code snippet above is eluded to in the DalekJS documentation when
it specifies the following:

> **.execute** - Executes a JavaScript function within the browser context

If you need to pass in a parameter to the `.execute` function, it cannot be done using JavaScript closure because
the DalekJS (or node) context is very different than the **browser context** which is what is actually being used. 
DalekJS currently does not throw any error if the contexts are conflicting and fails silently. I've raised an 
[issue](https://github.com/dalekjs/dalek/issues/118) about this and hopefully it will get fixed for a better developer 
experience.