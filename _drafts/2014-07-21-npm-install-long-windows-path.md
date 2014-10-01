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
Maximum path length in Windows
Windows also enforces a maximum path length of 260 characters. Running a large npm dependency tree quickly gets to 
this path limit.

http://stackoverflow.com/questions/265769/maximum-filename-length-in-ntfs-windows-xp-and-windows-vista
http://stackoverflow.com/questions/18241258/npm-is-installing-dependencies-in-a-weird-recursive-way


Workarounds available:
1) enabling long paths in git
2) dedupe - however, what is required is a dedupe on install
3) Enable long paths support with git config core.longpaths true - Warning of the actual fix as part of the git fix:
https://github.com/msysgit/git/pull/122/files#diff-ba92ef40c548c691816362bbdc35a613R629
> Only enable this if you know what you're doing and are prepared to live with a few quirks.

Religious Battle:
https://github.com/joyent/node/issues/6960

> Another Windows dev for whom this is a showstopper.

> I'm closing this issue, because it is not properly a Node issue
isaacs, Node core contributor, former Node BDFW, CEO of npm the company, and the BDFL of npm the OSS project

Potential working solution: https://github.com/joyent/node/issues/6960#issuecomment-46552335

Re-creating the error?
Just simply try running `npm install mocha --dev` on Windows. You might have a good laugh as well when trying
to remove it:

$ rm -rf test
rm: cannot remove `test/node_modules/mocha/node_modules/debug/node_modules/browserify/node_modules/backbone/node_modules/phantomjs/node_modu
les/unzip/node_modules/pullstream/node_modules/stream-buffers/node_modules/vows/lib/vows/coverage/fragments/coverage-foot.html': File or pat
h name too long

Solution Inspiration:
http://stackoverflow.com/a/20842269