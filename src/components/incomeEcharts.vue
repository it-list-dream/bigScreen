<template>
  <div class="income_containner" ref="income"></div>
</template>

<script>
import {bigNumberTransform} from '../utils/utils.js'
export default {
  name: "incomeEcharts",
  props: {
    income: {
      type: Object,
    },
  },
  data() {
    return {
      option: null,
    };
  },
  // mounted: function () {
  //   this.draw();
  // },
  watch: {
    income: {
      handler(newValue, oldValue) {
        //console.log(9999, this.income);
        this.draw();
      },
      deep: true,
    },
  },
  methods: {
    draw() {
      var incomeTotalList = this.income.incomeCount;
      var incomeTotal = 0;
      var monthList = this.income.monthList;
      for (var i = 0; i < incomeTotalList.length; i++) {
        incomeTotal += incomeTotalList[i];
      }
      var myChart = this.$echarts.init(this.$refs.income);
      this.option = {
        title: {
          text: "近半年经营收入 ￥"+ bigNumberTransform(incomeTotal.toFixed(2)),
          top: 26,
          left: "center",
          textStyle: {
            color: "#07E8F1",
            fontFamily: "sans-serif",
            fontSize: 27,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
        },
        grid: {
          top: "32%",
          left: "4%",
          right: "10%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "月份",
            type: "category",
            data: monthList,
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1654fe",
                width: 1,
                opacity: 0.4,
              },
            },
            nameTextStyle: {
              color: "#1654fe",
              fontFamily: "sans-serif",
              fontSize: 18,
            },
          },
        ],
        yAxis: [
          {
            name: "经营收入/元",
            type: "value",
            nameTextStyle: {
              color: "#63B1FD",
              fontFamily: "sans-serif",
              fontSize: 18,
              padding: [0, 0, 0, 40],
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#63B1FD",
                width: 1,
                opacity: 0.4,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1654fe",
                width: 1,
                opacity: 0.3,
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            nameTextStyle: {
              color: "#63B1FD",
              fontFamily: "sans-serif",
              fontSize: 18,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1654fe",
                width: 1,
                opacity: 0.4,
              },
            },
          },
        ],
        series: [
          {
            name: "收入",
            type: "bar",
            barWidth: 20,
            data: incomeTotalList,
            itemStyle: {
              normal: {
                color: "#07E8F1",
                barBorderRadius: [4, 4, 0, 0],
              },
            },
          },
        ],
      };
      myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped>
.income_containner {
  width: 100%;
  height: 320px;
}
</style>