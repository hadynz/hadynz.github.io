---
layout: page
permalink: /contributors/
title: "Contributors"
comments: false
---
One of the beauties of hosting my blog on [GitHub Pages](https://pages.github.com/) is that the blog's source is 
[available online](https://github.com/hadynz/hadynz.github.io) for anyone to examine and modify.

If you would like to join the list of awesome people below who have contributed to fix my blog, simply send me a 
[pull request](https://help.github.com/articles/using-pull-requests).

Every blog post has a contribute edit link making it super easy to automatically submit a pull request of a change to
anything that I've written. _To get u goin, you can strat by fixnig the mnay spelnig msitakes taht plage ths
snetnce [here](https://github.com/hadynz/hadynz.github.io/edit/master/contributors.md)_.

### GitHub Contributor list
<ul>
{% for contributor in site.github.contributors %}
  <li>
    <img src="{{ contributor.avatar_url }}" width="32" height="32" /> <a href="{{ contributor.html_url }}">{{ contributor.login }}</a>
  </li>
{% endfor %}
</ul>
