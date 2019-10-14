<template>
  <div class="ebook">
    <Title-Bar 
      :ifTitleAndMenuShow="ifTitleAndMenuShow"></Title-Bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <Menu-Bar 
      :ifTitleAndMenuShow="ifTitleAndMenuShow"
      ref="menuBar"></Menu-Bar>
  </div>
</template>

<script>
import Epub from "epubjs";
import TitleBar from "@/components/TitleBar.vue";
import MenuBar from "@/components/MenuBar.vue";

const DOWNLOAD_URL = "/static/113933.epub";
export default {
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      ifTitleAndMenuShow: false
    };
  },
  methods: {
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting();
      }
    },
    prevPage() {
      // this.ifTitleAndMenuShow = false;
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      // this.ifTitleAndMenuShow = false;
      if (this.rendition) {
        this.rendition.next();
      }
    },
    showEpub() {
      // 生成book
      this.book = new Epub(DOWNLOAD_URL);

      // 生成Rendition
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });

      // 通过Rendition.display渲染电子书
      this.rendition.display();
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/global";

.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100%;
      height: 100%;
      display: flex;

      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
