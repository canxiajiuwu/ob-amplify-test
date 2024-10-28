<template>
  <div class="cl-gamesHall-wrap">
    <div class="cl-back cl-flexcs" @click="goBack">
      <div class="cl-backIcon">
        <img
          :src="STATICURL + '/images/lang/common/gamesHall/back.jpg'"
          alt="back"
        />
      </div>
      <div class="cl-word">{{ $t('gamesHall.back') }}</div>
    </div>

    <div class="cl-list-box">
      <div
        class="cl-liBox"
        v-for="(item, index) in gameList"
        :key="index"
        @click="openGameFun(item)"
      >
        <div class="cl-li">
          <img
            :src="`${STATICURL}/images/lang/${locale}/common/${item.imgUrl}`"
            alt="onebet | games"
          />
        </div>
        <div class="cl-bottomBox cl-flexcb">
          <h3 class="cl-h3 cl-name">{{ item.name }}</h3>
          <div class="cl-button cl-flexcc">{{ $t('gamesHall.play') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  components: {},
  inject: ['openGame'],
  data() {
    return {
      gameList: [
        {
          name: 'GOAL Football',
          imgUrl: 'goalFootball.png',
          loading: 'goalFootballBg.jpg',
          url: '/football/goalFootballGame/games/index.html'
        },
        {
          name: 'Soccer Stars',
          imgUrl: 'soccerStars.png',
          loading: 'soccerStarsBg.jpg',
          url: '/football/SoccerStars/games/index.html'
        },
        {
          name: 'Onebet Football',
          imgUrl: 'onebetFootball.png',
          loading: 'footballBg.jpg',
          url: '/football/footballGame/games/index.html'
        }
      ]
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    Lib.common.event_statistics(`GamesHall_pageViews`)
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    goBack() {
      Lib.common.activityBack(this)
    },
    openGameFun(item) {
      Lib.common.event_statistics(
        `GamesHall_${item.name.replace(' ', '_')}_Click`
      )
      this.openGame(item)
    }
  }
}
</script>

<style scoped lang="less">
.cl-gamesHall-wrap {
  .cl-back {
    background-color: #4c50fa;
    height: 47rem/36;
    padding: 0 13rem/36;
    color: #fff;
    font-size: 17rem/36;
    box-sizing: border-box;

    .cl-backIcon {
      margin-right: 18rem/36;

      img {
        width: 58rem/108;
        height: 52rem/108;
      }
    }
  }

  .cl-list-box {
    position: absolute;
    top: 47rem/36;
    bottom: 0;
    width: 10rem;
    background-color: #1c2029;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 13rem/36;

    .cl-liBox {
      padding-bottom: 20rem/36;

      .cl-li {
        border-radius: 3rem/36;
        background-color: #272c38;
        background-image: url('~/assets/images/general/notSprites/progress/betIcon.jpg');
        background-position: center;
        background-size: 44.67rem/36 19rem/36;
        background-repeat: no-repeat;
        width: 334rem/36;
        height: 104rem/36;

        img {
          width: 334rem/36;
          height: 104rem/36;
        }
      }

      .cl-bottomBox {
        color: #fff;
        font-weight: bold;
        padding-top: 9rem/36;

        .cl-button {
          width: 70.67rem/36;
          height: 28.67rem/36;
          border-radius: 3rem/36;
          background-color: #16a727;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
