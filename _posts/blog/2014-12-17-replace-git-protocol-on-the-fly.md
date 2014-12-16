---
layout: posts
title: "Swapping Git protocol on the fly"
description: "Switching between git and https git protocols"
keywords: "git, protocol, https, ssh"
date: 2014-12-17 11:04
categories: ['blog']
comments: true
meta: true
quote:
    text: "Don't spend time beating on a wall, hoping to transform it into a door."
    author: Laura Schlessinger
---
Quite often many of us are working on Git in our offices and are behind our corporate firewall which
messes with our ability to fetch public and privately shared Git repositories.

I've run in this scenario this week and it is incredibly frustrating. For some reason, whenever I was
doing a `bower install` inside a local Git repository I was getting the following *intermittent* error:

~~~
fatal: unable to connect to github.xxx.com:
github.xxx.com[0: XXX.XX.XXX.XXX]: errno=Operation timed out

~~~

This issue was sporadic and hence very hard to tie down by myself or internal IT. Anyway, surely life
cannot always suck and there are workarounds?

Turns out when in doubt with Git, cloning via `https` is usually your best bet because it will very rarely
if ever be blocked by your corporate firewall.

Not wanting to change my project's `bower.json` which is using `git://`, the following command line allowed
me to change the protocol to `https://` on the fly either globally or against a local repository.

~~~
# Global
$ git config --global url."https://".insteadOf git://

# Non-Global (for current repository only)
$ git config url."https://".insteadOf git://
~~~
