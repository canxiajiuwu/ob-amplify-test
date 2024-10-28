<template>
  <div class="cl-howToPlay-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('howToPlayTitle')"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
    </div>
    <div class="cl-container">
      <div class="cl-content">
        <div
          class="cl-listTitle"
          v-for="(a, b) in $t('howToPlay')"
          :key="'a' + b"
          @click="viewTo(b)"
        >
          {{ a.title }}
        </div>

        <div
          class="cl-item"
          v-for="(item, index) in $t('howToPlay')"
          :key="'e' + index"
        >
          <h2 class="cl-h2 cl-title1" ref="anchorPoint" v-html="item.title" />
          <div class="cl-list">
            <div
              class="cl-listItem"
              v-for="(innerItem, innerIndex) in item.list"
              :key="'i' + innerIndex"
            >
              <h3 class="cl-h3 cl-title2" v-if="innerItem.title">
                {{ innerItem.title }}
              </h3>
              <div class="cl-art" v-html="innerItem.art" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'HowToPlay',
  components: { headBack },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 视图调整至指定地点
    viewTo(index) {
      const refsArr = this.$refs.anchorPoint || []
      if (refsArr[index]) refsArr[index].scrollIntoView()
    }
  }
}
</script>

<style scoped lang="less">
.cl-howToPlay-wrap {
  background-color: #fff;
  height: 100vh;
  width: 10rem;
  display: flex;
  flex-direction: column;

  .cl-topBox {
    width: 10rem;
  }
  .cl-container {
    flex: 1;
    overflow-y: scroll;
    .cl-content {
      padding: 10rem/36 10rem/36 47rem/36;

      .cl-listTitle {
        color: #444;
        font-size: 14rem/36;
        line-height: 18rem/36;
        text-decoration: underline;
      }

      .cl-title1 {
        font-size: 16rem/36;
        font-weight: bold;
        padding: 10rem/36 0;
      }

      .cl-title2 {
        font-size: 12rem/36;
        font-weight: bold;
        padding-top: 5rem/36;
      }

      .cl-art {
        line-height: 16rem/36;
        padding-top: 5rem/36;
      }
    }
  }
}
</style>
