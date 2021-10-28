<template>
  <div class="chart-m-l-c">
    <label v-if="scrollNumber">{{ scrollNumber.title }}</label>
    <div class="count">
      <b v-for="(item, index) in prosecutorArr" :key="index">
        <div :style="{ top: -item * .875 + 'rem' }">
          <i v-for="(ic, indexc) in 10" :key="indexc">{{ ic - 1 }}</i>
        </div>
      </b>
    </div>
    <span class="unit" v-if="scrollNumber">{{ scrollNumber.title1 }}</span>
    <!-- <button @click="refreshLeft">刷新</button> -->
  </div>
</template>
<script>
export default {
  name: "numberScroll",
  props: ["scrollNumber"],
  data() {
    return {
      prosecutorArr: ["0", "0", "0", "0", "0", "0", "0", "0"],
      //这里的数字数组是个8位数，只是占位，不能直接使用，看需求有可能是10位或11、12、20等等
      numbers: "10000",
      //这个参数是后台传给我们的，也不能直接使用，需要转换
    };
  },
  watch: {
    scrollNumber: {
      handler(newValue, oldValue) {
       this.numbers = Math.round(Number(this.scrollNumber.onlineTotal));
        console.log(this.scrollNumber.onlineTotal);
        this.refreshLeft();
      },
      deep: true,
    },
  },
  methods: {
    PrefixInteger(num, length) {
      //给数字前面补零 比如‘59832’补成8位即位‘00059832’
      return (Array(length).join("0") + num).slice(-length);
    },
    plusNPrAll() {
      //为了看效果，点击上面html中的iconfont触发，refreshLeft方法（我真啰嗦~）
      const res = this.PrefixInteger(this.numbers, 8);
      this.prosecutorArr = res.toString().split("");
    },
    refreshLeft() {
      //刷新数据，我这里因为静态看效果，联调时将请求写在里面就好了
      //this.numbers = parseInt(this.numbers) + this.getRandomNumber(1, 100);
      this.numbers = Number(this.numbers);
      this.plusNPrAll();
    },
  },
};
</script>

<style scoped>
.chart-m-l-c {
  float: left;
  width: 100%;
  height: .875rem;
  padding: .125rem 0 .125rem .5625rem;
}
.chart-m-l-c label {
  line-height: .875rem;
  float: left;
  font-size: .25rem;
  font-weight: bold;
  color: #e5e5e5;
  padding-right: .125rem;
}
.chart-m-l-c .count {
  height: .875rem;
  float: left;
  padding: 0 .0625rem;
}
.chart-m-l-c .count b {
  position: relative;
  float: left;
  z-index: 3;
  overflow: hidden;
  width: .6rem;
  height: .875rem;
  line-height: .875rem;
  background: #1b2873;
  border-radius: .025rem;
  color: #ffdd3f;
  text-align: center;
  margin: 0 .05rem;
}
.chart-m-l-c .count b div {
  width: 100%;
  height: 5rem;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.8s ease-in-out;
}
.chart-m-l-c .count b div i {
  float: left;
  font-style: normal;
  width: 100%;
  height: .875rem;
  font-size: .625rem;
  color: #ffdd3f;
}
.chart-m-l-c .unit {
  padding-left: .125rem;
  float: left;
  line-height: .875rem;
  font-size: .25rem;
  font-weight: bold;
  color: #e5e5e5;
}
</style>