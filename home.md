---
layout: home
title: Home
permalink: /home/
---

<div class='col12 clearfix space-bottom4'>

{% for page in site.pages %}
{% if page.description %}


<div class='col6 pad2 prose dark fill-navy keyline-right'>

<h2>{{ page.title }}</h2>

<p>{{ page.description }}</p>
<a class='button stroke' href='{{ page.url }}'>View</a>

</div>

{% endif %}
{% endfor %}

</div>

<div class='col12 clearfix'>
  <p>You are empowered to copy, share and improve this project for a better tomorrow <a class='icon github button short' href='https://github.com/folography/netafilter'>Fork me</a></p>
</div>
