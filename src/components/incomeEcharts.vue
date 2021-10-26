<template>
  <div class="income_containner" ref="income"></div>
</template>

<script>
export default {
  name: "incomeEcharts",
  data() {
    return {
      option: null,
    };
  },
  mounted: function () {
    this.draw();
  },
  methods: {
    draw() {
      var myChart = this.$echarts.init(this.$refs.income);
      this.option = {
        title: {
          text: "近半年经营收入 ￥300000",
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
          top: "30%",
          left: "4%",
          right: "10%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "月份",
            type: "category",
            data: [1, 2, 3, 4, 5, 6],
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
                color: "#1654fe",
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
            name: "Direct",
            type: "bar",
            barWidth: 28,
            data: [10, 52, 200, 334, 390, 330],
            itemStyle: {
              normal: {
                color: "#07E8F1",
                barBorderRadius: [6, 6, 0, 0],
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