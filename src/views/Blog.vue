<template>
  <div>
    <section>
      <h2>Blog</h2>
      <p>
        In the future, this page will contain posts from me regarding findings and interesting tid-bits I discover
        when working or learning new stuff.<br/>
        But first I'll have to set up a backend, which I will probably not have time for until the end of 2020.
      </p>
    </section>
    <article>
      <h2>A blog entry</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta odio non lectus euismod, et faucibus leo imperdiet. Duis sapien ante, eleifend sed ornare vitae, porta sit amet eros. Ut erat turpis, imperdiet ac urna eu, laoreet accumsan tellus. Donec sem tellus, dapibus ac venenatis sit amet, luctus ac ligula. Etiam suscipit eget dolor bibendum molestie. Sed condimentum velit sit amet nisl tristique rhoncus. Suspendisse in odio eget sapien semper consectetur at at orci.
      </p>
      <div class="article-info">
        <div>Laurenz Fiala</div>
        <div>25.03.2021 12:40</div>
        <div class="flex-grow-1"></div>
        <ul class="tags">
          <li>Web</li>
          <li>Usability</li>
        </ul>
      </div>
    </article>
    <article>
      <h2>A blog entry</h2>
      <p>
        <textarea ref="editortest"></textarea>
      </p>
      <div class="article-info">
        <div>Laurenz Fiala</div>
        <div>25.03.2021 12:40</div>
        <div class="flex-grow-1"></div>
        <ul class="tags">
          <li>Web</li>
          <li>Usability</li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import EasyMDE from 'easymde';

  @Component
  export default class Blog extends Vue {

    constructor() {
      super();
    }

    private mounted() {
      new EasyMDE({element: this.$refs.editortest as HTMLElement});
    }

  }
</script>

<style scoped lang="less">
  @import (reference) '../theme/theme';

  article {
    margin-bottom: @g3;
    padding: @g2;

    background-color: @bgColorLight;
    border-bottom: solid @borderWidth @borderColor;
  }

  .article-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    margin-top: @g2;
    margin-left: -@g;

    color: @subtleTextColor;

    > * {
      margin-left: @g;
    }

    ul {
      padding: 0;
      margin: 0;

      list-style: none;

      &:before {
        content: "";

        display: inline-block;
        height: 1em;
        width: 1em;
        vertical-align: middle;

        margin-right: (@g/2);
        margin-left: @g;

        background-image: url("../assets/icons/tag.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }

      > li {
        display: inline-block;

        &:not(:first-child):before {
          content: ", ";
        }
      }
    }
  }

  @media @xs, @sm {
    article {
      padding: @g;
    }
  }
</style>
