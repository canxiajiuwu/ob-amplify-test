<template>
  <div class="cl-safariA2hs-wrap">
    <drawer
      :visible.sync="visible"
      type="bottom"
      :z-index="zIndex"
      :mask-click="false"
      boxbg-color="rgba(0,0,0,0)"
    >
      <div class="cl-width">
        <div class="cl-box">
          <div class="cl-colseIcon" @click="close" />
          <div class="cl-imgBox">
            <img
              class="cl-img"
              :src="`${STATICURL}/images/a2hs/192.png`"
              alt="guide"
            />
          </div>
          <div>{{ $t('a2hs.titleQ') }}</div>
          <div class="cl-flexcc" style="white-space: nowrap">
            <div>{{ $t('a2hs.step2.safari') }} {{ $t('a2hs.step2.tap') }}</div>
            <div class="cl-icon" />
            <div>,{{ $t('a2hs.step2.andC') }}</div>
          </div>
          <div class="cl-add">{{ $t('a2hs.step2.add') }}</div>
          <div class="cl-downBox">
            <div class="cl-down" />
          </div>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
export default {
  props: {
    zIndex: {
      type: Number
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('emitClose')
    }
  }
}
</script>

<style scoped lang="less">
.cl-safariA2hs-wrap {
  font-size: 14rem/36;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  line-height: 23rem/36;
  white-space: nowrap;

  .cl-width {
    display: flex;
    justify-content: center;

    .cl-box {
      min-width: 211rem/36;
      box-sizing: border-box;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 18rem/36 16rem/36 16rem/36;
      background-color: #fff;
      border-radius: 10rem/36;
      bottom: 16rem/36;

      .cl-colseIcon {
        position: absolute;
        top: 10rem/36;
        right: 9rem/36;
        .sprite(@icon-a2hs-close, 110rem);
      }

      .cl-icon {
        margin: 0 7rem/36;
        .sprite(@icon-a2hs-safari-icon, 110rem);
      }

      .cl-add {
        font-size: 14rem/36;
        font-weight: bold;
        color: #000;
      }

      .cl-imgBox {
        position: relative;
        width: 55rem/36;
        height: 55rem/36;

        .cl-img {
          max-width: 100%;
        }
      }

      .cl-downBox {
        width: 28rem/36;
        height: 16rem/36;
        overflow: hidden;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 100%);
      }

      .cl-down {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 16rem/36 14rem/36;
        border-color: #fff transparent transparent transparent;
        overflow: hidden;
      }
    }
  }
}
</style>
