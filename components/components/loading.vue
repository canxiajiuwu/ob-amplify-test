<template>
  <div class="cl-loading" :class="'no-' + where">
    <div class="cl-middle">
      <div
        class="cl-g-progress-wrap"
        :style="{ '--rotate-deg': `${rotate}deg` }"
      >
        <div class="cl-g-progress" />
        <div class="cl-g-circle">
          <span class="cl-g-circle-before">
            <i />
          </span>
          <span class="cl-g-circle-after">
            <i />
          </span>
        </div>
        <div class="cl-g-img">
          <img src="@/assets/images/logo/loadingIcon.png" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    where: {
      type: String // captcha
    }
  },
  data() {
    return {
      rotate: 0
    }
  },
  mounted() {
    this.interValTimer = setInterval(() => {
      this.rotate++
      if (this.rotate >= 360) this.rotate = 0
    }, 5)
  },
  destroyed() {
    this.interValTimer && clearInterval(this.interValTimer)
  }
}
</script>

<style scoped lang="less">
@progressSize: 60rem/36; // 进度条的尺寸(width, height)
@progressGap: 5rem/36; // 圆环的宽度
@activeStartColor: #fff; // 渐变色开始颜色
@activeEndColor: #fff; // 渐变色结束颜色
@notActiveColor: #939393; // 没有进度条区域颜色
@ibackground: #fff; // 进度条头部的颜色

.cl-loading {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  &.no-captcha {
    position: absolute;
  }

  .cl-middle {
    padding: 18rem/36;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10rem/36;
  }
}
// 测试注释
.cl-g-progress-wrap {
  display: inline-block;
  position: relative;
  .cl-g-progress {
    width: @progressSize;
    height: @progressSize;
    border-radius: 50%;
    background: conic-gradient(
      @activeStartColor 0,
      @activeEndColor var(--rotate-deg, 0deg),
      @notActiveColor var(--rotate-deg, 0deg),
      @notActiveColor 360deg
    );

    @maskSize: (@progressSize / 2) - @progressGap;
    mask: radial-gradient(
      transparent,
      transparent @maskSize,
      #000 @maskSize + 0.5rem/36,
      #000 100%
    );
    -webkit-mask: radial-gradient(
      transparent,
      transparent @maskSize,
      #000 @maskSize + 0.5rem/36,
      #000 100%
    );
  }
  .cl-g-circle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: rotate(-90deg);

    & > span {
      position: absolute;
      top: (@progressSize - @progressGap) / 2;
      left: (@progressSize) / 2;
      width: 50%;
      transform-origin: left;

      & > i {
        width: @progressGap;
        height: @progressGap;
        float: right;
        border-radius: 50%;
        background: @ibackground;
        z-index: 1;
      }
    }

    &.cl-g-circle-after {
      transform: rotate(var(--rotate-deg, 0deg));
    }
  }
  .g-circle-before > i {
    background: @activeStartColor;
  }
  .g-circle-after > i {
    background: @activeEndColor;
  }
  .cl-g-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 33rem/36;
      height: 14rem/36;
    }
  }
}
</style>
