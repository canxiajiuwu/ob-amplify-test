<template>
  <div class>
    <div class="cl-accountTransactionBox-wrap">
      <div class="cl-container">
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <div class="cl-list" v-if="dataList.length > 0">
              <div class="cl-item cl-flexcb">
                <div class="cl-li cl-flexcc">Bet Id</div>
                <div class="cl-li cl-flexcc">Amount(XAF)</div>
                <div class="cl-li cl-flexcc">Win(XAF)</div>
                <div class="cl-li cl-flexcc">Date</div>
              </div>
              <div
                class="cl-item cl-flexcb"
                v-for="(item, index) in dataList"
                :key="index"
              >
                <div class="cl-li cl-flexcc">#{{ item.period }}</div>
                <div class="cl-li cl-flexcc">{{ item.amount }}</div>
                <div class="cl-li cl-flexcc">{{ item.win }}</div>
                <div class="cl-li">
                  <div>{{ item.created_at }}</div>
                  <div class="cl-word">
                    {{ $t('account.betBy') }} {{ item.game_name }}
                  </div>
                </div>
              </div>
            </div>
            <dataNoResult v-else />
          </div>
          <dataLoading v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      dataList: [],
      bonusList: [],
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.dataRequest()
  },
  methods: {
    // 数据请求
    dataRequest() {
      if (this.bonusList.length === 0) {
        this.isRequestFailed = false
        this.requestLoading = false
        this.bonusHistory()
      } else {
        this.dataList = this.bonusList
      }
    },
    // 系统赠送
    bonusHistory() {
      if (this.token) {
        this.$axios_api
          .casinoHistory({ token: this.token })
          .then((res) => {
            this.isRequestFailed = false
            this.requestLoading = true
            if (res.code === 0) {
              this.bonusList = res.data
              this.dataList = res.data
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
            }
          })
          .catch(() => {
            this.isRequestFailed = true
            this.requestLoading = true
          })
      } else {
        this.$router.push({ path: `/${this.locale}/login` })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountTransactionBox-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-container {
    margin: 0 10rem/36;

    .cl-list {
      font-size: 10rem/36;
      padding-bottom: 2rem;

      .cl-item {
        box-sizing: border-box;
        color: #000;

        .cl-li {
          flex: 1;
          height: 36rem/36;
          background-color: #efedfe;

          .cl-word {
            white-space: nowrap;
            padding-top: 3rem/36;
          }
        }

        .li + .cl-li {
          border-left: 1rem/36 solid #fff;
        }

        .cl-li:last-child {
          flex-shrink: 0;
          width: 150rem/36;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding: 0 10rem/36;
        }
      }

      .item + .cl-item {
        border-top: 1rem/36 solid #fff;
      }

      .cl-item:first-child {
        color: #fff;

        .cl-li {
          background-color: #333333;
        }

        .cl-li:last-child {
          align-items: center;
        }
      }
    }
  }
}
</style>
