<template>
  <div class="cl-invitePop-wrap">
    <drawer
      :visible="flag"
      type="middle"
      :width="299 / 36"
      :height="320 / 36"
      :mask-click="false"
      boxbg-color="rgba(0,0,0,0)"
    >
      <div class="cl-flexcc cl-contentBox">
        <div class="cl-width">
          <div class="cl-flexce">
            <div class="cl-close" @click="close" />
          </div>
          <div style="height: calc(13rem / 36)" />
          <div class="cl-bsbb cl-bgBox">
            <div class="cl-flexcc cl-title">{{ data.titleWord }}</div>
            <div
              v-if="[2, 3].includes(data.type)"
              style="height: calc(9rem / 36)"
            />
            <slot v-if="data.type === 0" />
            <div
              v-if="[1, 4].includes(data.type)"
              class="cl-typeWord"
              v-html="data.typeWord"
            />
            <div v-if="data.type === 2" class="cl-inputBox">
              <div>{{ $t('inviteFriend.ifpn') }}</div>
              <div style="height: calc(10rem / 36)" />
              <div class="cl-flexcs cl-bsbb cl-input">
                <div class="cl-left">+237</div>
                <div class="cl-line" />
                <input type="tel" v-model="phone" />
                <div>
                  <div v-show="phone" class="cl-clearIocn" @click="phone = ''" />
                </div>
              </div>
            </div>
            <div v-if="data.type === 3" class="cl-copyBox">
              <div class="cl-flexcb">
                <div class="cl-bsbb cl-oneLine cl-copy">{{ data.showUrl }}</div>
                <div class="cl-copyIcon" @click="copyUrl" />
              </div>
            </div>
            <div style="height: calc(20rem / 36)" />
            <div v-if="data.type === 3" class="cl-shareBBox">
              <div class="cl-flexcc cl-shareTo">
                <div class="cl-line" />
                <div class="cl-word">Share To</div>
                <div class="cl-line" />
              </div>
              <div style="height: calc(24rem / 36)" />
              <div class="cl-flexcb cl-shareBox">
                <div class="cl-flexcc cl-item">
                  <div v-if="APP" class="cl-icon cl-facebook" @click="facebookFn" />
                  <a
                    v-else
                    class="cl-icon cl-facebook"
                    :href="data.facebookUrl"
                    @click="facebookFn"
                    target="_blank"
                    id="J-share-facebook"
                  />
                  <div class="cl-name">{{ $t('inviteFriend.facebook') }}</div>
                </div>

                <div class="cl-flexcc cl-item">
                  <div v-if="APP" class="cl-icon cl-whatsapp" @click="whatsappFn" />
                  <a
                    v-else
                    class="cl-icon cl-whatsapp"
                    :href="data.whatsappUrl"
                    @click="whatsappFn"
                    target="_blank"
                    id="J-share-whatsapp"
                  />
                  <div class="cl-name">{{ $t('inviteFriend.whatsapp') }}</div>
                </div>

                <div class="cl-flexcc cl-item">
                  <div v-if="APP" class="cl-icon cl-X" @click="xFn" />
                  <a
                    v-else
                    class="cl-icon cl-X"
                    :href="data.xUrl"
                    @click="xFn"
                    target="_blank"
                    id="J-share-X"
                  />
                  <div class="cl-name">X</div>
                </div>
              </div>
            </div>
            <div v-if="[0, 2].includes(data.type)" class="cl-flexcb cl-buttonBox">
              <a
                class="cl-flexcc cl-item cl-whatsApp"
                :href="data.whatsappUrl"
                @click="leftFn(phone)"
                target="_blank"
                id="J-share-whatsapp"
              >
                <div class="cl-icon">
                  <img
                    src="~/assets/images/general/notSprites/promotions/inviteFriends/whatsapp2.png"
                    alt="whatsapp"
                  />
                </div>
                <div>{{ $t('inviteFriend.whatsapp') }}</div>
              </a>
              <div class="cl-flexcc cl-item cl-sms" @click="rightFn(phone)">
                <div class="cl-icon">
                  <img
                    src="~/assets/images/general/notSprites/promotions/inviteFriends/sms2.png"
                    alt="sms"
                  />
                </div>
                <div class="cl-name">{{ $t('inviteFriend.sms') }}</div>
              </div>
            </div>
            <div v-if="[1, 4].includes(data.type)" class="cl-flexcb cl-buttonBox">
              <div class="cl-flexcc cl-item cl-cancel" @click="leftFn">
                {{ $t('commonModal.cancel') }}
              </div>
              <div class="cl-flexcc cl-item cl-confirm" @click="rightFn">
                {{
                  data.type === 1
                    ? $t('betslipConfirm.confirm')
                    : $t('dailyBetRefund.betNow')
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
export default {
  props: ['flag', 'configData'],
  data() {
    return {
      phone: '',
      APP: null
    }
  },
  computed: {
    titleWord() {
      return [
        this.$t('inviteFriend.up'),
        this.$t('inviteFriend.wmta'),
        this.$t('inviteFriend.rdf'),
        this.$t('inviteFriend.sm'),
        this.$t('inviteFriend.ufp')
      ]
    },
    data() {
      const { type = 3 } = this.configData || {}
      return {
        ...this.configData,
        titleWord: this.titleWord[type]
      }
    }
  },
  watch: {
    flag(value) {
      if (value) this.phone = this.data.phone || ''
    },
    phone(newValue, oldValue) {
      if (newValue.length > 10) this.phone = oldValue // 最长10位数
    }
  },
  mounted() {
    this.APP = window.APP
  },
  methods: {
    xFn() {
      this.close()
      this.data.xFn()
    },
    whatsappFn() {
      this.close()
      this.data.whatsappFn()
    },
    facebookFn() {
      this.close()
      this.data.facebookFn()
    },
    leftFn(phone) {
      if (!this.data.outClose) this.close()
      this.data.leftFn(phone)
    },
    rightFn(phone) {
      if (!this.data.outClose) this.close()
      this.data.rightFn(phone)
    },
    close() {
      this.$emit('close')
    },
    // 复制
    copyUrl() {
      try {
        const input = document.createElement('input') // 直接构建input
        input.value = this.data.copyUrl // 设置内容
        document.body.appendChild(input) // 添加临时实例
        input.select() // 选择实例内容
        document.execCommand('Copy') // 执行复制
        document.body.removeChild(input) // 删除临时实例
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('commonModal.copySuccess'),
          1
        )
      } catch (err) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('commonModal.copyFail'),
          0
        )
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-invitePop-wrap {
  font-size: 13rem/36;
  font-weight: 400;
  color: #555;
  .cl-contentBox {
    width: 100%;
    height: 100%;
    flex-direction: column;
    .cl-width {
      width: 100%;
      .cl-close {
        .sprite(@icon-x, 108rem);
      }
      .cl-bgBox {
        background-color: #fff;
        border-radius: 5rem/36;
        padding: 20rem/36 10rem/36;
        .cl-title {
          padding-bottom: 13rem/36;
          font-weight: bold;
          font-size: 13rem/36;
          color: #000;
        }
        .cl-buttonBox {
          color: #fff;
          a {
            color: #fff;
          }
          .cl-item {
            width: 136rem/36;
            height: 37rem/36;
            border-radius: 6rem/36;
            .cl-icon {
              width: 17rem/36;
              height: 17rem/36;
              margin-right: 3rem/36;
              img {
                width: 100%;
                height: 100%;
              }
            }
            &:active {
              opacity: 0.8;
            }
          }
          .cl-whatsApp {
            background-color: #58bd66;
          }
          .cl-sms {
            background-color: #39aae8;
          }
          .cl-cancel {
            color: #555;
            font-size: 17rem/36;
            border: 1rem/36 solid #555;
          }
          .cl-confirm {
            font-size: 17rem/36;
            background-color: @mainBrandColor;
          }
        }
        .cl-typeWord {
          line-height: 17rem/36;
        }
        .cl-inputBox {
          .cl-input {
            height: 37rem/36;
            border-radius: 3rem/36;
            border: 1rem/36 solid #979797;
            padding: 8rem/36 10rem/36;
            color: #000;
            font-weight: bold;
            .cl-line {
              margin: 0 14rem/36;
              height: 21rem/36;
              border-left: 0.5rem/36 solid #979797;
            }
            input {
              flex: 1;
              outline: none;
              border: none;
              padding: 0;
              margin: 0;
            }
            .cl-clearIocn {
              margin-left: 10rem/36;
              .sprite(@menu-clear, 108rem);
            }
          }
        }
        .cl-copyBox {
          .cl-copy {
            padding: 8rem/36 12rem/36;
            flex: 1;
            height: 37rem/36;
            background-color: #f1f1f1;
            border-radius: 3rem/36;
            border: 1rem/36 solid #979797;
            text-transform: lowercase;
            line-height: 21rem/36;
          }
          .cl-copyIcon {
            margin-left: 12rem/36;
            .sprite(@ticon-copy, 108rem);
          }
        }
        .cl-shareTo {
          .cl-line {
            flex: 1;
            border-top: 0.5rem/36 solid #979797;
          }
          .cl-word {
            margin: 0 10rem/36;
            color: #898989;
          }
        }
        .cl-shareBox {
          padding: 0 12rem/36;
          .cl-item {
            width: 46rem/36;
            flex-direction: column;
            .cl-icon {
              margin-bottom: 8rem/36;
              &.cl-whatsapp {
                .sprite(@account-whatsapp, 101.73rem);
              }
              &.cl-facebook {
                .sprite(@account-facebook, 101.73rem);
              }
              &.cl-X {
                .sprite(@account-x, 108rem);
              }
            }
            .cl-name {
              font-size: 10rem/36;
              color: #898989;
            }
          }
        }
      }
    }
  }
}
</style>
