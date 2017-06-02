---
layout: "word-tree-poem"
wordtreeid: "word-tree-poem-5"
title: "line"
permalink: "/poem5/"
order: 5
categories:
  - poem
---
<div class="original-poem-text">
    <p>i wrote the first line</p>
    <p>then i wrote the second line</p>
    <p>then i wrote the third line</p>
    <p>then i wrote the fourth line</p>
    <p>then i started copy pasting as a method and wrote the fifth line</p>
    <p>the fifth line was the first break, a turning point</p>
    <p>a turning point can be another method, like so</p>
    <p>so using the last word as the first word delivers, as if by itself, the eighth line</p>
    <p>first, second, third, fourth, fifth, sixth, seventh, eighth - these are all line numbers</p>
</div>
<script>
  drawWordTreePoem('word-tree-poem-{{ page.order }}', '{{ page.title }}', 'implicit', 'double', [
    "i wrote the first line",
    "then i wrote the second line",
    "then i wrote the third line",
    "then i wrote the fourth line",
    "then i started copy pasting as a method and wrote the fifth line",
    "the fifth line was the first break, a turning point",
    "a turning point can be another method, like so",
    "so using the last word as the first word delivers, as if by itself, the eighth line",
    "first, second, third, fourth, fifth, sixth, seventh, eighth - these are all line numbers"
  ]);
</script>