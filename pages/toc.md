---
layout: default
permalink: "/toc"
---
<main role="main" class="book">
  <!-- <div class="preface">
    <div class="tree-wrapper">
      <div id="preface" class="word-tree-basic"></div>
    </div>
  </div> -->

  {% include _page_nav.html %}

  <div class="pages two-fold">
    <article class="page moto">
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
    </article>
    <article class="page">
      <div class="page-content">
        <h2 class="page-title">Table of Contents</h2>
        <div class="toc">
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
    </article>
  </div>
</main>
  
<script type="text/javascript">
  drawWordTreePoem('preface', 'a', 'implicit', 'suffix', [
    "a pocket book",
    "a book about code",
    "a book about poetry"
    // "hyper and non linear",
    // "real time run time",
    // "hyper text",
    // "linear time",
    // "non linear time",
    // "non hyper text"
  ], 18, "#add");
</script>