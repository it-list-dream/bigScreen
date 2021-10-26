<template>
  <div class="number-box">
    <p class="box-item" v-for="(item, index) in computeNumber" :key="index">
      <span ref="numberDom">0123456789</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "numberScroll",
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      computeNumber: [],
      timeTicket: null,
      maxLen: 6,
    };
  },
  methods: {
    prefixZero(num, n) {
      return (Array(n).jon(0) + num).slice(-n).split("");
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    setNumberTransform() {
      let numberItems = this.$refs.numberDom;
      for (let index = 0; index < numberItems.length; index++) {
          let elem = numberItems[index];
          elem.style.transform = `tranlate(-50%,-${Number(this,this.computeNumber[index]) *10}%)`
      }
    },
    increaseNumber(){
        this.refresh();
        this.timeTicket = setTimeout(this.increaseNumber,5000)
    },
    refresh(){
        this.computeNumber = this.prefixZero(this.number,this.maxLen)
        this.$nextTick(()=>this.setNumberTransform());
    },
    destroyed() {
        clearTimeout(this.timeTicket);
        this.timeTicket = null;
    },
  },
  watch:{
      number(){
          this.refresh();
      }
  }
};
</script>

<style scoped>
.number-box {
  width: 56.8%;
  display: flex;
  justify-content: center;
  margin: 26px auto 0;
}
.number-box p {
  flex: 1;
  height: 163px;
  line-height: 163px;
  background: #2a3242;
  margin: 0 26px 0 0;
  color: #ffffff;
  text-align: center;
  border-radius: 12px;
  padding: 0 20px;
  display: inline-block;
  font-size: 62px;
  position: relative;
  writing-mode: vertical-lr;
  text-orientation: upright;
  overflow: hidden;
}
.number-box p:last-child {
  margin-right: 0;
}
span {
  color: #9185e0;
  font-size: 118px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%, -50%);
  transition: transform 2s;
  letter-spacing: 10px;
}
</style>