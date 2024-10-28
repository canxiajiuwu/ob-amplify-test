<template>
  <div class="cl-modal-wrap cl-flexcc" @click.self="closeModal">
    <div
      class="cl-modalBox"
      :class="[`no-league-${sportsPromos[0].tournament_id}`]"
    >
      <div class="cl-close" @click="closeModal"></div>
      <div class="cl-title">
        <img src="/images/lang/common/sportsPromos/title.png" alt="title" />
      </div>
      <div class="cl-box">
        <div class="cl-league">{{ sportsPromos[0].league }}</div>
        <div class="cl-featured">Featured</div>
        <div class="cl-middleBox">
          <div class="cl-teamBox cl-flexcc">
            <div class="cl-home cl-team">{{ sportsPromos[0].home }}</div>
            <div class="cl-icon">
              <img src="/images/lang/common/sportsPromos/vs.png" alt="" />
            </div>
            <div class="cl-away cl-team">{{ sportsPromos[0].away }}</div>
          </div>
          <div
            class="cl-art"
            v-html="
              $t('sportsPromos.modal_prize', {
                prize: $t('sportsPromos.prizes')[sportsPromos[0].gift_type - 1],
                unit: $t('units'),
                amount: sportsPromos[0].gift.reduce(
                  (pre, cur) => pre + cur.amount * cur.count,
                  0
                )
              })
            "
          ></div>
        </div>
      </div>
      <div class="cl-button cl-flexcc" @click="goSportsPromos">
        {{ $t('sportsPromos.optIn') }}
      </div>
      <div class="cl-bg"></div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: {
    sportsPromos: {
      type: Array
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeSportsPromosModal')
    },
    // 前往sports promos
    goSportsPromos() {
      console.log(`/${this.locale}/sportPromos/${this.sportsPromos[0].id}`)
      Lib.common.event_statistics(`home_sports_promos_Modal`)
      this.$router.push({
        path: `/${this.locale}/sportPromos/${this.sportsPromos[0].id}`
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-modal-wrap {
  position: fixed;
  width: 10rem;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.6);

  .cl-modalBox {
    position: relative;
    width: 300rem/36;
    box-sizing: border-box;
    padding: 20rem/36 16rem/36 24rem/36;
    border-radius: 10rem/36;
    background: linear-gradient(180deg, #164e9d 0%, #011d44 100%);

    .cl-close {
      right: 10rem/36;
      top: -46rem/36;
      position: absolute;

      .sprite(@icon-x, 108rem);
    }

    .cl-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .cl-title {
      width: 210rem/36;
      margin: 0 auto;
      img {
        width: 210rem/36;
      }
    }

    .cl-box {
      position: relative;
      width: 272rem/36;
      padding: 30rem/36 0 40rem/36;
      box-sizing: border-box;
      border-radius: 17rem/36;
      background-color: rgba(0, 0, 0, 0.4);
      margin: 10rem/36 auto;

      .cl-league {
        color: white;
        font-weight: bold;
        text-align: center;
        font-size: 18rem/36;
        padding-bottom: 20rem/36;
      }

      .cl-featured {
        position: absolute;
        right: 0;
        top: 0;
        width: fit-content;
        height: 27rem/36;
        line-height: 27rem/36;
        background: #ff8a00;
        color: #fff;
        padding: 0 10rem/36;
        border-radius: 13rem/36 15rem/36 0 13rem/36;
      }

      .cl-teamBox {
        .cl-team {
          width: 100rem/36;
          color: #fff;
          font-size: 18rem/36;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .cl-home {
          width: fit-content;
          max-width: 100rem/36;
        }

        .cl-icon {
          padding: 0 15rem/36;
          img {
            width: 50rem/72;
            height: 58rem/72;
          }
        }
      }

      .cl-art {
        font-size: 20rem/36;
        color: #fff;
        font-weight: bold;
        text-align: center;
        padding: 25rem/36 20rem/36 0;
      }
    }

    .cl-button {
      width: 205px;
      height: 40px;
      background: linear-gradient(0deg, #ffc601, #fff6b3);
      border-radius: 20rem/36;
      font-size: 18rem/36;
      font-weight: bold;
      color: #7f1200;
      margin: 15rem/36 auto 0;
      position: relative;
      z-index: 1;
    }
  }

  .no-league-7 {
    background: linear-gradient(180deg, #3f39d0 0%, #1811aa 100%);

    .cl-bg {
      .sprite(@sports-promo-7, 108rem);
    }
  }

  .no-league-8 {
    background: linear-gradient(180deg, #164e9d 0%, #011d44 100%);
    .cl-bg {
      .sprite(@sports-promo-8, 108rem);
    }
  }

  .no-league-16 {
    background: linear-gradient(180deg, #970b32 0%, #47021a 100%);
    .cl-bg {
      .sprite(@sports-promo-16, 108rem);
    }
  }

  .no-league-17 {
    background: linear-gradient(180deg, #7e129c 0%, #520667 100%);
    .cl-bg {
      .sprite(@sports-promo-17, 108rem);
    }
  }

  .no-league-23 {
    background: linear-gradient(180deg, #00bade 0%, #092e9c 100%);
    .cl-bg {
      .sprite(@sports-promo-23, 108rem);
    }
  }

  .no-league-34 {
    background: linear-gradient(180deg, #093684 0%, #091c3e 100%);
    .cl-bg {
      .sprite(@sports-promo-34, 108rem);
    }
  }

  .no-league-35 {
    background: linear-gradient(180deg, #d90e11 0%, #a92426 100%);
    .cl-bg {
      .sprite(@sports-promo-35, 108rem);
    }
  }
}
</style>
