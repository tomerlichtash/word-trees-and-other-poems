---
layout: "word-tree-poem"
wordtreeid: "word-tree-poem-4"
title: "poem"
permalink: "/poem4/"
order: 4
categories:
  - poem
---
<div class="original-poem-text">
    <p>visual poetry</p>
    <p>i am sick and tired of hearing about it, visual poetry</p>
    <p>poetry is invisible</p>
    <p>here. take a poem. this is poetry</p>
    <p>this is poetry. isn't it?</p>
    <p>is this poetry is?</p>
    <p>is poetry a?</p>
    <p>is poetry a?</p>
</div>

<script>
  drawWordTreePoem('word-tree-poem-{{ page.order }}', '{{ page.title }}', 'implicit', 'double', [
    "visual poetry",
    "i am sick and tired of hearing about it, visual poetry",
    "poetry is invisible",
    "here. take a poem. this is poetry.",
    "this is poetry. isn\'t it ?",
    "is this poetry is ?",
    "is poetry a ?",
    "is poetry a ?"
  ]);
</script>