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
quote:
    text: In an age of constant live connections, the central question of self-examination is drifting from 'Who are you?' towards 'What are you doing?'
    title: How to Thrive in the Digital Age
    author: Tom Chatfield
---
So after I built my sparkling new [Jekyll](http://www.jekyllrb.com)-based blog and wired up the usual third 
party widgets such as [Disqus](http://www.disqus.com) and [Twitter buttons](https://dev.twitter.com/docs/tfw), 
I wired up Google Analytics (GA) to ensure that I start recording analytics on the website and get a better 
understanding of the blog's traffic.

When it came to wiring up GA with social media on the blog (and namely the Twitter follow and tweet buttons), I was 
surprised that a simple google did not return a concise walk through of how this should be done given how social media 
has become a mainstream medium for many businesses in this day and age.

Although the process is relatively straight forward, I decided to write a quick blog post on how I ended up putting 
it all together. To be honest, I am currently still brand new to the blogosphere and thought this could be something 
straight forward to get me started to get my learning and thoughts out there.

To skip this write-up right to the final solution [click here](#putting-it-all-together).
{: .alert.alert-warning }

## The importance of tracking social media
Writing a blog post or any content on the web is more akin to a stab in the dark; you don't really know if it is
relevant for people or if there is an audience for the material that you are discussing. Hence, the importance of 
understanding the impact of your content on people... and what better way to track it nowadays by measuring 
reactions on social media.

Not only are you getting page views for content that you have produced, but some people thought it was worthy of
their time to share it with others in their network. Tracking how many times an item was re-tweeted or followers
that were added to your profile can provide a huge insight on what grabs your audience's attention.

The next step after having harnessed all this information is to obviously act on it by analysing it... but that's 
a topic for another blog post.

## Setting up Twitter widgets
To add a Twitter widget to your website such as a twitter like or follow button, it is as simple as embedding the
following on your page:

{% highlight html %}
<div class="biography--twitter">
    <a href="https://twitter.com/@handle" class="twitter-follow-button"
       data-show-screen-name="true"
       data-size="large">Follow @handle</a>
</div>

<script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>
{% endhighlight %}

In this post I will be mainly focusing on Twitter integration but the principles explained can work for any other
social network that you are using.

## Twitter API object
By embedding a twitter widget, your page will have access to Twitter's API via the `twttr` global object when the
page loads. If you open the source of `widget.js` you will find something similar to the following line:

{% highlight javascript %}
window.twttr = (function(){ ... });
{% endhighlight %}

The `twttr` object gives you access to Twitter-dubbed "[Web Intent Events](https://dev.twitter.com/docs/tfw/events)" 
by subscribing to twitter events that you are interested in knowing about when they take place. Examples of such 
events that you can listen to are like `tweet`, `followed`, `retweet` and `favorite`. 

Because the `widget.js` resource loads asynchronously, you need to wait before binding events. This means that you
will need to wrap any event bindings in a callback function which will be executed when everything has loaded:

{% highlight javascript %}
twttr.ready(function (twttr) {
    // bind events here
});
{% endhighlight %}

A heads up - Twitter has the following word of warning about using their API:

> Note that Web Intent events are not supported in Internet Explorer before version 8, 
and may not function fully in browsers that don't support the browser postMessage API (such as Chrome for iOS.)

### Using JQuery
What most documentation online misses telling people is that the `twttr` object will not be available on initial
page load, but only after the DOM has completely loaded.

If you are using JQuery as a framework on your page, you can use their [`.ready`](http://api.jquery.com/ready/).

{% highlight javascript %}
$(document).ready(function(){
    ...
});
{% endhighlight %}

If you are a fan of using pure JavaScript, you will need something like a `window.onload`, however, as this 
[Stackoverflow thread](http://stackoverflow.com/a/800010) illustrates its not that simple and you are better off using 
a framework that does all the cross-browser plumbing for you for free.

## Setting up Google Analytics
Adding (GA) is very straight forward and there are plenty of 
[resources online](https://support.google.com/analytics/answer/1008080?hl=en) that talk about to do so. The two
gotcha's that I had to get my head around when I was doing this recently were the following:

### 1. Classic vs Universal Analytics
It seems that GA has two tracking codes that can be used - Classic Analytics (ga.js) and Universal Analytics (analytics.js)
with the latter being the new defacto that you should be using. Universal Analytics is pretty much the new API that 
GA is introducing and Classic will soon be deprecated. If you are using Classic GA and want to upgrade, you can 
follow this [walkthrough](https://developers.google.com/analytics/devguides/collection/upgrade/).

### 2. Embedding Universal Analytics in your page
If you have worked with GA in the last couple of years, you will remember that the recommended location to embed the
GA resource scripts is at the bottom of the page just before you close the `</body>` tag. The new Universal Analytics
tracking code is however asynchronous, and hence can be embedded in your page's `<header` tag without forcing your
HTML content to wait until the file is downloaded.

## Tracking Social Media with Google Analytics
As part of GA's new Universal Analytics API, it has introduced a new more specialised way to track social events 
instead of the generic [event tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) 
measure. The new [social interaction tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions) 
has the added benefit of introducing a consistent method for recording social interactions, which in turns results in a 
consistent set of reports that allow you to compare social interactions across multiple social networks - finally GA 
going social first!

To send a social interaction, you simply need to invoked the `send` command with the `social` hit type to the `ga` 
object made globally available when you embed GA.
 
{% highlight javascript %}
ga('send', 'social', 'twitter', 'tweet', 'http://mypost.com');
{% endhighlight %}

## Putting it all together
To put all the above pieces together, you can track Twitter follow and tweet interactions on your page by using
the following snippet:

{% highlight javascript %}
/*global $, twttr, ga */
$(document).ready(function(){

    // Extract your page title and URL from your document in any method. Following is one example:
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

To provide my reports with as much rich information for me to make sense of it, I also include the URL of the page
that a user triggers any Twitter interactions from because that is a very important piece of information for me. I
extract the page URL and title from the meta data of the page. You might want to play around with how you pull
out this information to suit your site.