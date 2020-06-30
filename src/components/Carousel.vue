<template>
  <div>
    <div class="carousel-wrapper"
         @mouseenter="showCarouselNav.hover = true; updateCarouselNav()"
         @mouseleave="showCarouselNav.hover = false; updateCarouselNav()">
      <div class="carousel-container"
           ref="carouselContainer"
           @scroll="updateCarouselNav()">
        <div class="d-flex">
          <slot></slot>
        </div>
      </div>
      <div class="fade-in"
           :class="{'hide': !showCarouselNav.previous}"></div>
      <div class="fade-out"
           :class="{'hide': !showCarouselNav.next}"></div>
      <div class="previous d-mouse-only"
           :class="{'hide': !showCarouselNav.previous || !showCarouselNav.hover}"
           @click="carouselScrollPrevious()"></div>
      <div class="next d-mouse-only"
           :class="{'hide': !showCarouselNav.next || !showCarouselNav.hover}"
           @click="carouselScrollNext()"></div>
    </div>
    <div class="slideshow-wrapper" v-if="showSlideshow">
      <div class="slideshow-container"
           ref="slideshowContainer"
           @scroll="onSlideshowScroll()">
        <div class="images-wrapper">
          <div class="image-container"
               v-for="(imgEl, index) in getImages()"
               :key="index">
            <img :src="imgEl.data.attrs.src"
                 :class="{'current': slideshowIndex === index, 'set-width': shouldSetImgWidth(imgEl, index)}"/>
          </div>
        </div>
      </div>
      <div class="slideshow-top-controls">
        <div class="previous d-mouse-only"
             title="Go to previous slide"
             @click="prevSlide()"></div>
        <div class="next d-mouse-only"
             title="Go to next slide"
             @click="nextSlide()"></div>
        <div class="close"
             title="Close slideshow"
             @click="closeSlideshow()"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {VNode} from 'vue/types/vnode';

  @Component
  export default class Carousel extends Vue {

    public showCarouselNav = {
      hover: false,
      previous: false,
      next: true
    };
    public showSlideshow = false;
    public slideshowIndex = 0;
    public slideshowSize = 0;
    private slideshotScrollTimer: number | null = null;
    public thumbnailImgClickListeners = new Map<VNode, (event: Event) => void>();

    constructor() {
      super();
    }

    private onKeyup(event: KeyboardEvent) {
      if (!this.showSlideshow) {
        return;
      }
      if (event.code === 'Escape') {
        this.showSlideshow = false;
      } else if (event.code === 'ArrowRight') {
        this.nextSlide();
      } else if (event.code === 'ArrowLeft') {
        this.prevSlide();
      }
    }

    private onResize(event: Event) {
      this.$forceUpdate();
      this.updateSlideshowOffset();
    }

    private mounted() {
      this.slideshowSize = this.$slots.default ? this.$slots.default.length : 0;
      this.$slots.default?.forEach((vnode, index) => {
        const imgEl = vnode?.elm as HTMLImageElement;
        const listener = (event: Event) => this.openSlideshow(event, index);
        this.thumbnailImgClickListeners.set(vnode, listener);
        imgEl.addEventListener('click', listener);
      });
      document.addEventListener('keyup', this.onKeyup);
      window.addEventListener('resize', this.onResize);

      this.setHScrollBarPadding(this.$refs.carouselContainer as HTMLElement);
    }

    private beforeDestroy() {
      this.thumbnailImgClickListeners.forEach((listener, vnode) => {
        vnode?.elm?.removeEventListener('click', listener);
      });
      document.removeEventListener('keyup', this.onKeyup);
      window.removeEventListener('resize', this.onResize);
    }

    public carouselScrollNext() {
      const carouselContainerEl = this.$refs.carouselContainer as HTMLElement;
      carouselContainerEl.scrollLeft += carouselContainerEl.clientWidth - 50;
    }

    public carouselScrollPrevious() {
      const carouselContainerEl = this.$refs.carouselContainer as HTMLElement;
      carouselContainerEl.scrollLeft -= carouselContainerEl.clientWidth - 50;
    }

    public updateCarouselNav() {
      const carouselContainerEl = this.$refs.carouselContainer as HTMLElement;
      this.showCarouselNav.previous = carouselContainerEl.scrollLeft > 0;
      this.showCarouselNav.next = carouselContainerEl.scrollLeft < carouselContainerEl.scrollWidth - carouselContainerEl.clientWidth;
      this.$forceUpdate();
    }

    private openSlideshow(event: Event, imageIndex: number) {
      this.showSlideshow = true;
      this.slideshowIndex = imageIndex;
      (document.body as HTMLBodyElement).classList.add('no-scroll');
      setTimeout(() => {
        this.setHScrollBarPadding(this.$refs.slideshowContainer as HTMLElement);
        this.updateSlideshowOffset();
      }, 50);
    }

    public closeSlideshow() {
      this.showSlideshow = false;
      (document.body as HTMLBodyElement).classList.remove('no-scroll');
    }

    public getImages(): VNode[] {
      const vnodes: VNode[] = [];
      this.$slots?.default?.forEach(value => {
        vnodes.push(value);
      });
      return vnodes;
    }

    private nextSlide() {
      this.slideshowIndex++;
      if (this.slideshowIndex >= this.slideshowSize) {
        this.slideshowIndex = 0;
      }
      this.updateSlideshowOffset();
    }

    private prevSlide() {
      this.slideshowIndex--;
      if (this.slideshowIndex < 0) {
        this.slideshowIndex = this.slideshowSize - 1;
      }
      this.updateSlideshowOffset();
    }

    public shouldSetImgWidth(imgNode: VNode, index: number): boolean {
      const imgEl = imgNode?.elm as HTMLImageElement;
      if (!imgEl) {
        return false;
      }
      const ratioImg = imgEl.naturalWidth / imgEl.naturalHeight;
      const ratioWindow = window.innerWidth / window.innerHeight;
      return ratioWindow < ratioImg;
    }

    public updateSlideshowOffset() {
      const slideshowContainer = this.$refs.slideshowContainer as HTMLElement;
      const imgWrapperEl = slideshowContainer.children[0] as HTMLElement;
      const imgContainerElCurrent = imgWrapperEl.children[this.slideshowIndex] as HTMLElement;
      const offsetLeftPx = Math.floor(imgContainerElCurrent.offsetLeft + imgContainerElCurrent.clientWidth / 2 - window.innerWidth / 2);
      slideshowContainer.scrollLeft = offsetLeftPx;
    }

    public onSlideshowScroll() {
      const slideshowContainer = this.$refs.slideshowContainer as HTMLElement;
      const imgWrapperEl = slideshowContainer.children[0] as HTMLElement;

      for (let i = 0; i < imgWrapperEl.children.length; i++) {
        const imgContainerElCurrent = imgWrapperEl.children[i] as HTMLElement;
        const center = slideshowContainer.scrollLeft + window.innerWidth / 2;
        const imgContainerStart = imgContainerElCurrent.offsetLeft;
        const imgContainerEnd = imgContainerElCurrent.offsetLeft + imgContainerElCurrent.clientWidth;
        if (center >= imgContainerStart && center < imgContainerEnd) {
          this.slideshowIndex = i;
          break;
        }
      }

      if(this.slideshotScrollTimer !== null) {
        clearTimeout(this.slideshotScrollTimer);
      }
      this.slideshotScrollTimer = setTimeout(() => this.updateSlideshowOffset(), 150);
    }

    private setHScrollBarPadding(elm: HTMLElement) {
      const scrollbarHeight = elm.offsetHeight - elm.clientHeight;
      elm.style.paddingBottom = (100 - scrollbarHeight) + 'px';
    }

  }
</script>

<style scoped lang="less">
@import (reference) '../theme/theme';

.carousel-wrapper {
  position: relative;

  overflow: hidden;

  .previous,
  .next,
  .fade-in,
  .fade-out {
    position: absolute;
    top: 0;
    bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    width: @g2;
    padding: (@g/2);

    background-size: @g2;

    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
    transition: opacity @transitionDur;

    &:hover {
      opacity: 1;
    }

    &.hide {
      opacity: 0;
      pointer-events: none;
    }
  }

  > .previous {
    left: 0;

    background-image: url("../assets/icons/slideshow-arrow-left.svg");
  }

  > .next {
    right: 0;

    background-image: url("../assets/icons/slideshow-arrow-right.svg");
  }

  > .fade-in,
  > .fade-out {
    pointer-events: none;
    opacity: 1;
  }

  > .fade-in {
    left: 0;

    background: linear-gradient(to left, fade(@bgColorLight, 0%) 0%, fade(@bgColorLight, 95%) 90%, @bgColorLight 100%);
  }

  > .fade-out {
    right: 0;

    background: linear-gradient(to right, fade(@bgColorLight, 0%) 0%, fade(@bgColorLight, 95%) 90%, @bgColorLight 100%);
  }
}

.carousel-container {
  display: flex;
  flex-direction: row;

  margin-left: -(@g/2);
  margin-bottom: -100px;

  scroll-behavior: smooth;
  overflow-x: scroll;

  img {
    height: 100px;

    margin-left: (@g/2);

    opacity: 0.75;
    transition: opacity @transitionDur;

    &:hover {
      opacity: 1;
    }
  }
}

.slideshow-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: @zIndexSlideshow;

  display: flex;
  flex-direction: row;

  margin-bottom: -100px;

  background-color: @slideshowBgColor;
}

.slideshow-container {
  display: flex;
  flex-direction: row;

  scroll-behavior: smooth;
  overflow-x: scroll;

  > .images-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;

    padding-right: 50vw;
    padding-left: 50vw;

    > .image-container {
      display: flex;
      flex-direction: column;

      > img {
        height: calc(100vh - @g2);
        max-width: calc(100vw - @g2);
        max-height: calc(100vh - @g2);

        padding-right: (@g/2);
        padding-left: (@g/2);

        opacity: 0.25;
        transition: opacity @transitionDurLong;

        &.current {
          opacity: 1;
        }

        &.set-width {
          height: auto;
          width: calc(100vw - @g4);
        }
      }
    }
  }
}

.slideshow-top-controls {
  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: row;

  //background-color: fade(@bgColor, 50%);

  > * {
    width: 40px;
    height: 40px;

    margin: @g;

    opacity: 0.5;
    background-size: contain;
    background-repeat: no-repeat;
    transition: opacity @transitionDur;

    &:hover {
      opacity: 1;
    }
  }

  > .previous {
    background-image: url("../assets/icons/slideshow-arrow-left.svg");
  }

  > .next {
    background-image: url("../assets/icons/slideshow-arrow-right.svg");
  }

  > .close {
    background-image: url("../assets/icons/slideshow-close.svg");
  }
}

</style>
