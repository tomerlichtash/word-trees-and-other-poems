---
layout: default
permalink: "/toc"
order: i-ii
title: Table of Contents
---
<main role="main" class="content">
  <div class="book">
    <div class="pages two-fold">
      <div class="wrap">
        {% include _page_nav_prev.html %}
        <div class="appendix">

            <div class="page moto">
              <div class="page-content">
                <div class="inner">
                  <blockquote cite="https://developers.google.com/chart/interactive/docs/gallery/wordtree">
                    <p><span class="highlight">A <strong>Word Tree</strong> depicts multiple parallel sequences of words</span>.</p>
                    <span class="source"><a target="_blank" href="https://developers.google.com/chart/interactive/docs/gallery/wordtree">Google Charts</a></span>
                  </blockquote>
                </div>
                <div class="page-order">
                  <i>i</i>
                </div>
              </div>
            </div>
            <div class="page toc">
              <div class="page-content">
                <h2 class="page-title">Table of Contents</h2>
                <div class="toc-wrap">
                  <div class="toc-list">
                    <ol class="toc-entry-list">
                      {% for p in site.pages %}
                        {% if p.categories[0] == 'poem' %}
                          <li class="toc-entry"><a href="{{ site.url }}{{ p.permalink }}">{{ p.title }}</a></li>
                        {% endif %}
                      {% endfor %}
                    </ol>
                  </div>
                  <div class="toc-list">
                    <ol class="toc-entry-list">
                      {% for p in site.pages %}
                        {% if p.categories[0] == 'adaptation' %}
                        <h3>{{ p.title }}</h3>
                        {% endif %}
                      {% endfor %}
                    </ol>
                  </div>
                </div>
                <div class="page-order">
                  <i>ii</i>
                </div>
              </div>
          </div>
        </div>
        {% include _page_nav_next.html %}
      </div>
      
    </div>
  </div>
</main>
