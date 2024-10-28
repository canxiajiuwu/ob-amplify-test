<template>
  <div class="cl-cropper-wrap">
    <div class="cl-flexcb cl-top" :style="{ paddingTop: safeAreaTop + 'px' }">
      <div class="cl-cancel" @click="goBack">{{ $t('sharePoster.cancel') }}</div>
      <div class="cl-title">{{ $t('sharePoster.cut') }}</div>
      <div class="cl-flexcc cl-lkButton cl-btn" @click="sureSave">
        {{ $t('sharePoster.next') }}
      </div>
    </div>

    <div
      class="cl-container"
      :style="{ top: `calc(47rem/36 + ${safeAreaTop}px)` }"
    >
      <div class="cl-img-container" v-if="cropping">
        <img :src="imgChosen" ref="image" />
      </div>
      <div class="cl-afterCropper" v-else>
        <img :src="afterImg" />
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import Lib from '@/assets/js/Lib'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'Cropper',
  props: {
    imgChosen: {
      type: String,
      default: ''
    },
    avatarImg: {}
  },
  data() {
    return {
      myCropper: null,
      afterImg: '',
      cropping: true // 正在剪裁,剪裁完后为false
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 剪切初始化
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'move',
        initialAspectRatio: 1,
        aspectRatio: 1,
        checkOrientation: false,
        checkCrossOrigin: false,
        guides: false,
        center: false,
        background: false,
        zoomOnWheel: false,
        autoCropArea: 0.7,
        movable: true,
        rotatable: false,
        scalable: true,
        zoomOnTouch: true,
        cropBoxMovable: false,
        cropBoxResizable: false
      })
    },
    // 确认剪切
    sureSave() {
      const picCanvas = this.myCropper.getCroppedCanvas({
        width: 150,
        height: 150,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 150,
        maxHeight: 150,
        imageSmoothingQuality: 'high'
      })

      this.$store.commit('changeLoadingStatus', 1)
      picCanvas.toBlob(
        (blob) => {
          this.afterImg = picCanvas.toDataURL('image/jpeg')
          this.$emit('imgCropped', this.afterImg)
          this.updateAvatar(blob)
        },
        'image/jpeg',
        1
      )
    },
    goBack() {
      // 关闭剪裁器
      this.$emit('closeCropper')
    },
    // 提交数据请求
    updateAvatar(blob) {
      this.$axios_api
        .changeAvatar({
          token: this.token,
          file: new File([blob], 'avatar.jpeg', { type: 'image/jpeg' })
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', 0)
          this.goBack()
          if (res.code === 0) {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('account.nickNameSuccess'),
              '',
              this.$t('reminder.button.ok')
            )
          } else {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
        .catch((e) => {
          this.$store.commit('changeLoadingStatus', 0)
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-cropper-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 10rem;
  background-color: #000;

  .cl-top {
    position: relative;
    height: 47rem/36;
    padding: 0 10rem/36;
    font-weight: 500;
    font-size: 12rem/36;
    box-sizing: border-box;
    border-bottom: 1rem/36 solid rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 15;

    .cl-cancel {
      width: 68rem/36;
      color: rgba(0, 0, 0, 0.6);
    }
    .cl-title {
      width: fit-content;
      color: #000;
      font-size: 17rem/36;
    }
    .cl-btn {
      width: 68rem/36;
      height: 24rem/36;
    }
  }

  .cl-container {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 13;
  }
  .cl-img-container {
    height: 100%;
  }
  .cl-afterCropper {
    height: 100%;
  }
  .afterCropper img {
    width: 100%;
    height: 100%;
  }
}
</style>
