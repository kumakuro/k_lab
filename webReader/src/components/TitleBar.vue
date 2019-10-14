<template>
  <transition name="slide-down">
      <div class="title-wrapper" v-show="ifTitleAndMenuShow">
        <div class="left">
          <i class="iconfont icon-back icon"></i>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <i class="iconfont icon-cart icon"></i>
          </div>
          <div class="icon-wrapper">
            <i class="iconfont icon-person icon"></i>
          </div>
          <div class="icon-wrapper">
            <i class="iconfont icon-more icon"></i>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/global";
.title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
    .left {
      flex: 0 0 px2rem(50);
      @include center;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-cart {
          font-size: px2rem(22);
        }
      }
    }
    
  }
</style>