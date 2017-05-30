---
layout: default
permalink: "/end"
page_count: 9
is_last_page: true
title: Back Cover

social-icons:
 - title: Facebook
   url: https://facebook.com/tomerlichtash
   class: facebook
 - title: Instagram
   url: https://instagram.com/tomerlichtash
   class: instagram
 - title: Twitter
   url: https://twitter.com/tomerlichtash
   class: twitter
 - title: LinkedIn
   url: https://www.linkedin.com/in/tomerlichtash
   class: linkedin
 - title: GitHub
   url: https://github.com/tomerlichtash
   class: github
---
<main role="main" class="content">
  <div class="book">
    <div class="pages">
      <div class="wrap">
        <div class="page back-cover">
          <div class="page-content">
            <div class="summary">
              <p><strong>{{ site.title }} {{ site.subtitle }}</strong> is a free online publication for interactive visual poetry. It's a book, it's an experiment and it's a demo, for exploring Reading, Writing and Publishing of literary matter on the web, while using Google Charts' experimental Word Tree visualization tool as a writing environment constraint. No actual trees were harmed in the making these poems.</p>
            </div>
            {% include _author_details.html %}
            {% include _barcode.html %}
          </div>
          {% include _page_nav_prev.html %}
        </div>
      </div>
    </div>
  </div>
</main>