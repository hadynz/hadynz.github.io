---
layout: posts
title: Testing Reconsidered
description: Learnings from a 4 month journey to achieving continuous delivery
keywords: "testing, confidence, culture, continuous delivery, continuous deployment, pact, contracts"
date: 2017-03-28
categories: ['speaking']
comments: true
meta: true
quote:
    text: If everyone is to be made responsible for everything they do, you must extend responsibility beyond the level of conscious intention.
    author: William S. Burroughs
---
This was a talk that I gave at [WeTest Auckland][1] sharing the learnings and insights from a 4 month journey of working on
a microservices project with a continuous delivery pipeline being in the forefront of our thinking from the get go.

To achieve this utopia, we knew that automated and rigorous testing that gave us absolute confidence in any changes we
were about to push out to real customers was key. We've had to challenge the way we think and talk about tests, and most
certainly the way that we write them. More focus on smaller and concise unit tests, integration tests that stop strictly 
short at boundaries, and the eventual blurring of boundaries between the role of a developer and tester.

In essence, we had to ensure that **all team members** were responsible for quality.

### Talk Recording
<div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMfbUPU734w" frameborder="0" allowfullscreen></iframe>
</div>

### Slides
<script async class="speakerdeck-embed" data-id="d6c4586cf2824589b1b8f13a3a1400b0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[1]: https://www.meetup.com/WeTest-Auckland/events/238457709/
