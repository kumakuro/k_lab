<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" 
        :class="{'hide-box-shadow':ifSettingShow || !ifTitleAndMenuShow}"
        v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <i class="iconfont icon-menu icon"></i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-progress icon"></i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-bright icon"></i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-A icon"
            @click="showSetting"></i>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" 
        v-show="ifSettingShow">
        <div class="setting-font-size">

        </div>
      </div>
    </transition>
  </div>
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
    return {
      ifSettingShow: false
    };
  },
  methods: {
    showSetting() {
      this.ifSettingShow = true;
    },
    hideSetting() {
      this.ifSettingShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/global";
.menu-bar {
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
    }
  }
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow{
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(26);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
}
</style>
