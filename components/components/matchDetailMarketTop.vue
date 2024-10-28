<template>
  <div
    class="cl-matchDetailMarketTop-wrap"
    :class="{ 'cl-liveStatus': liveFavorite }"
  >
    <div class="cl-flexcb cl-title">
      <div class="cl-flexcs cl-left">
        <div class="cl-name cl-oneLine">
          {{ item[0].market_name || item[0].n }}
        </div>
        <div
          class="cl-nocare"
          :class="{ 'cl-care': item[0].favorite || isMarketCare }"
          @click.stop="changeCare"
        />
      </div>

      <div
        v-if="!liveFavorite"
        class="cl-right"
        @click.stop="$emit('changeDetailShow', index)"
      >
        <div
          class="cl-icon"
          :class="[
            isShow ? 'cl-iconRotate' : 'cl-iconReset',
            where === 'live' ? 'cl-liveIcon' : 'cl-icon'
          ]"
        />
      </div>
    </div>

    <storeModal
      v-if="isStoreModalShow"
      :msg="msg"
      @closeStoreModal="closeStoreModal"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import storeModal from '@/components/components/storeModal.vue'

export default {
  components: {
    storeModal
  },
  props: [
    'item',
    'isShow',
    'index',
    'where',
    'liveFavorite',
    'favoriteMarketList'
  ],
  data() {
    return {
      isStoreModalShow: false,
      msg: ''
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    isMarketCare() {
      const arr = this.favoriteMarketList || []
      const id = this.item[0].market_id || this.item[0].i
      const marketId = id.split('/')[1]
      return arr.includes(marketId)
    }
  },
  methods: {
    openModal(item) {
      this.$emit('openModal', item)
    },
    closeStoreModal() {
      this.isStoreModalShow = false
    },
    changeCareStatus(item, bool) {
      this.$emit('changeCareStatus', { item, bool })
    },
    changeCare() {
      if (this.item[0].favorite || this.isMarketCare) {
        // 如果已关注，则取消关注
        this.$axios_api
          .marketCancel({
            token: this.token,
            market_id: this.item[0].market_id
              ? this.item[0].market_id
              : this.item[0].i
          })
          .then((res) => {
            if (res.code === 0) {
              this.msg = this.$t('storeModal.cancel')
              this.isStoreModalShow = true
              this.changeCareStatus(this.item, false)
            } else if (res.code === 10101) {
              Lib.common.errorReminder(
                this,
                'login',
                '',
                '',
                this.$t('reminder.unLogin'),
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
      } else {
        // 如果未关注，则关注
        this.$axios_api
          .marketStore({
            token: this.token,
            market_id: this.item[0].market_id
              ? this.item[0].market_id
              : this.item[0].i
          })
          .then((res) => {
            if (res.code === 0) {
              this.msg = this.$t('storeModal.add')
              this.isStoreModalShow = true
              this.changeCareStatus(this.item, true)
            } else if (res.code === 10101) {
              Lib.common.errorReminder(
                this,
                'login',
                '',
                '',
                this.$t('reminder.unLogin'),
                '',
                this.$t('reminder.button.ok')
              )
            } else
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                res.msg,
                '',
                this.$t('reminder.button.ok')
              )
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchDetailMarketTop-wrap {
  &.cl-liveStatus {
    .cl-title {
      padding: 0;
      margin-bottom: 7rem/36;
      text-transform: uppercase;
      height: auto;
    }
  }

  .cl-title {
    padding: 0 10rem/36;
    color: @liveNameColor;
    height: 30rem/36;
    .cl-left {
      .cl-name {
        max-width: 200rem/36;
        margin-right: 5rem/36;
      }

      .cl-icon {
        height: 12rem/36;

        .sprite(@icon-reminder, 84rem);
      }

      .cl-nocare {
        .sprite(@ticon--not-star, 108rem);

        &.cl-care {
          .sprite(@ticon-star, 108rem);
        }
      }
    }
    .cl-right {
      .cl-icon {
        .sprite(@ticon-back-grey, 90rem);
      }

      .cl-liveIcon {
        .sprite(@ticon-live-more, 90rem);

        &.cl-iconRotate {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.3s;
        }

        &.cl-iconReset {
          transform: rotate(-90deg);
          -webkit-transform: rotate(-90deg);
          transition: transform 0.3s;
        }

        &.cl-closeIcon {
          transform: rotate(180deg);
        }
      }

      .cl-iconRotate {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transition: transform 0.3s;
      }

      .cl-iconReset {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: transform 0.3s;
      }

      .cl-closeIcon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
