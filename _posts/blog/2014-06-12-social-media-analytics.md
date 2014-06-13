---
layout: post
title: "Tracking Social Media with Google Analytics "
description: "Setting up social media analytics tracking with google analytics"
keywords: "twitter, facebook, google+, google analytics, tracking, analysis"
date: 2014-06-12 20:09
categories: ['blog']
image:
  feature: covers/tracking-twitter-analytics.jpg
  bg_style: 'background-position: 90% 0; background-size: contain; background-repeat: no-repeat; background-color: #163971;'
  mask_style:  'opacity: 0.25;'
comments: true
meta: true
---
My first post!


* Importance of tracking analytics
* Surprised to find lack of a concise guide on how to set something that is considered recently standard

# Setting up Twitter widgets
{% highlight html %}
<div class="biography--twitter">
    <a href="https://twitter.com/@handle" class="twitter-follow-button"
       data-show-screen-name="true"
       data-size="large">Follow @handle</a>
</div>

<script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>
{% endhighlight %}

# Twitter API object
`window.twttr = (function(){ ... });`

{% highlight javascript %}
twttr.ready(function (twttr) {
    // bind events here
});
{% endhighlight %}

Events we can listen to are like `tweet`, `followed`, `retweet`, `favorite`, etc.

Reference: [Events from widgets and Web Intents](https://dev.twitter.com/docs/tfw/events)

> Note that Web Intent events are not supported in Internet Explorer before version 8, 
and may not function fully in browsers that don't support the browser postMessage API (such as Chrome for iOS.)

What most documentation online misses telling people is that the `twttr` object will not be available on 
page load, but after the DOM has completely loaded. This will mean that we will need to wrap the twitter
binding code with a document ready clause.

#### Using JQuery
{% highlight javascript %}
$(document).ready(function(){
    ...
});
{% endhighlight %}

* Fan of using pure JavaScript, you will need something like a `window.onload`, however, as this 
[Stackoverflow thread](http://stackoverflow.com/a/800010) 
illustrates its not as simple and you are better off using a framework thatdoes all this plumbing for you for free.

# Setting up Google Analytics

* talk about the different in recent GA versions

# Putting it all together
{% highlight javascript %}
$(document).ready(function(){
    var pageTitle = $('meta[name=title]').attr('content'),
        pageUrl = $('meta[name=page_url]').attr('content');

    twttr.ready(function (twttr) {

        twttr.events.bind('follow', function(event) {
            ga('send', 'social', 'twitter', 'follow', event.data.screen_name, { 'page': pageUrl });
        });

        twttr.events.bind('tweet', function(event) {
            ga('send', 'social', 'twitter', 'tweet', pageTitle, { 'page': pageUrl });
        });

    });
});
{% endhighlight %}