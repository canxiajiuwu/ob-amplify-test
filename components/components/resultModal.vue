<template>
  <div class="cl-resultModal-wrap cl-flexcc">
    <div class="cl-box">
      <div class="cl-delete" @click="closeModal"></div>

      <div class="cl-container">
        <div v-if="modelType === 0" class="cl-itemBox cl-flexcs">
          <div
            v-for="(item, index) in sportList"
            :key="index"
            class="cl-item cl-flexcc"
            :class="{
              'cl-lastItem': (index + 1) % 3 === 0,
              'cl-chooseItem': meta.sport_id === item.id
            }"
            @click="selectSport(item)"
          >
            {{ item.name }}
          </div>
        </div>

        <div v-else-if="modelType === 1" class="cl-itemBox cl-flexcs">
          <div
            v-for="(item, index) in meta.filters.country"
            :key="index"
            class="cl-item cl-flexcc"
            :class="{
              'cl-lastItem': (index + 1) % 3 === 0,
              'cl-chooseItem': meta.country_name === item
            }"
            @click="selectCountry(item)"
          >
            {{ item }}
          </div>
        </div>

        <div v-else-if="modelType === 2" class="cl-itemBox cl-flexcs">
          <div
            v-for="(item, index) in meta.filters.tournament"
            :key="index"
            class="cl-item cl-flexcc"
            :class="{
              'cl-lastItem': (index + 1) % 3 === 0,
              'cl-chooseItem': meta.tournament_id === item.id
            }"
            @click="selectTournament(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    meta: {
      type: Object
    },
    modelType: {
      type: Number
    }
  },
  data() {
    return {
      showList: []
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    sportList() {
      return this.$store.state.root.sportList
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    // 球类筛选
    selectSport(item) {
      this.$emit('selectSport', item)
    },
    // 国家筛选
    selectCountry(item) {
      this.$emit('selectCountry', item)
    },
    // 联赛筛选
    selectTournament(item) {
      this.$emit('selectTournament', item)
    },
    // 关闭弹出
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-resultModal-wrap {
  width: 10rem;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;

  .cl-box {
    width: 350rem/36;
    position: relative;
    padding: 12rem/36 5rem/36;
    background-color: #fff;
    box-sizing: border-box;

    .cl-container {
      max-height: 300rem/36;
      overflow-x: hidden;
    }

    .cl-delete {
      position: absolute;
      right: -4rem/36;
      top: -40rem/36;

      .sprite(@icon-modal-close,108rem);
    }

    .cl-itemBox {
      flex-wrap: wrap;

      .cl-item {
        width: 110rem/36;
        height: 30rem/36;
        border-radius: 3rem/36;
        background-color: #e8f0f2;
        margin-bottom: 4rem/36;
        margin-right: 5rem/36;
        text-align: center;
      }

      .cl-lastItem {
        margin-right: 0;
      }
      .cl-chooseItem {
        background-color: #fcda07;
      }
    }
  }
}
</style>
