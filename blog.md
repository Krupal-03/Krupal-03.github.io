---
layout: default
title: Blog
permalink: /blog/
---

<section class="blog-page">
    <div class="container">
        <h1>Blog</h1>
        <div class="blog-posts">
            {% for post in site.posts %}
            <article class="blog-post">
                <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
                <time datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%B %d, %Y" }}
                </time>
                <p>{{ post.excerpt }}</p>
            </article>
            {% endfor %}
        </div>
    </div>
</section>