<template>
  <div class="cl-chromeA2hs-wrap">
    <drawer
      :visible.sync="visible"
      type="middle"
      :z-index="zIndex"
      :width="350 / 36"
      :height="350 / 36"
      :mask-click="false"
      boxbg-color="rgba(0,0,0,0)"
    >
      <div class="cl-width">
        <div class="cl-iconBox">
          <div class="cl-closeIcon" @click="close" />
        </div>
        <div style="height: calc(17rem / 36)" />
        <div class="cl-box">
          <div>{{ $t('a2hs.titleQ') }}</div>
          <div>{{ $t('a2hs.titleA') }}</div>
          <div class="cl-step">1</div>
          <div>{{ $t('a2hs.step1') }}</div>
          <div class="cl-step">2</div>
          <div class="cl-flexcc">
            <div>{{ $t('a2hs.step2.tap') }}</div>
            <div class="cl-icon" />
            <div>{{ $t('a2hs.step2.andC') }}</div>
          </div>
          <div class="cl-imgBox">
            <div class="cl-add">{{ $t('a2hs.step2.add') }}</div>
            <img
              class="cl-img"
              :src="`${STATICURL}/images/a2hs/chrome-${country}.jpg`"
              alt="guide"
            />
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
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    // this.visible = true
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
.cl-chromeA2hs-wrap {
  font-size: 14rem/36;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  line-height: 19rem/36;
  white-space: nowrap;

  .cl-width {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cl-iconBox {
    width: 276rem/36;
    display: flex;
    justify-content: flex-end;

    .cl-closeIcon {
      .sprite(@icon-x, 95rem);
    }
  }

  .cl-box {
    min-width: 276rem/36;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 17rem/36 6rem/36 9rem/36;
    background-color: #fff;
    border-radius: 10rem/36;

    .cl-icon {
      .sprite(@icon-details-bar, 108rem);
    }

    .cl-step {
      margin: 10rem/36 0;
      background-color: #fecf00;
      color: #322900;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 23rem/36;
      height: 23rem/36;
      border-radius: 50%;
      font-weight: bold;
    }

    .cl-imgBox {
      position: relative;
      width: 263rem/36;

      .cl-add {
        font-size: 1rem/36;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        font-weight: bold;
        color: #000;
      }

      .cl-img {
        max-width: 100%;
      }
    }
  }
}
</style>
