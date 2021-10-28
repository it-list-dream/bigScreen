<template>
  <div class="active_containner" ref="active"></div>
</template>

<script>
import {fontSize} from '../utils/utils.js';
export default {
  name: "activeEcharts",
  props: {
    active: {
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
    active: {
      handler(newValue, oldValue) {
        this.draw();
      },
      deep: true,
    },
  },
  methods: {
    draw() {
      // console.log(this.active.activePeopleCount)
      var allPeopleList = this.active.activePeopleCount;
      var monthList = this.active.monthList;
      var total = 0;
      for(var i = 0;i<allPeopleList.length;i++){
         total += allPeopleList [i]
      }
      //console.log(100000,total)
      var myChart = this.$echarts.init(this.$refs.active);
      this.option = {
        title: {
          text: "近半年活跃总数 "+total,
          top: fontSize(0.26),
          left: "center",
          textStyle: {
            color: "#F8A417",
            fontFamily: "sans-serif",
            fontSize: fontSize(0.27),
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
              fontSize: fontSize(0.18),
            },
          },
        ],
        yAxis: [
          {
            name: "活跃数/人",
            type: "value",
            nameTextStyle: {
              color: "#63B1FD",
              fontFamily: "sans-serif",
              fontSize: fontSize(0.18),
              padding: [0, 0, 0, 20],
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
              fontSize: fontSize(0.18),
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
            name: "活跃人数",
            type: "bar",
            barWidth: 20,
            data:allPeopleList,
            itemStyle: {
              normal: {
                color: "#F8A417",
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
.active_containner {
  width: 100%;
  height: 4rem;
}
</style>