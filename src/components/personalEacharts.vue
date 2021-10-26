<template>
  <div class="pouparBox" ref="poupar"></div>
</template>

<script>
export default {
  name: "personalEcharts",
  data() {
    return {
      option: null,
    };
  },
  props: {
    coachx: {
      type: Array,
      default: [],
    },
    coachy: {
      type: Array,
      default: [],
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.draw();
  //   });
  // },
  watch: {
    coachx: {
      handler(newValue, oldValue) {
         this.draw();
      },
      deep: true,
    },
  },
  methods: {
    draw: function () {
      var myChart = this.$echarts.init(this.$refs.poupar);
      var salvProName = this.coachx;
      var salvProValue = this.coachy;
      console.log(salvProName, salvProValue);
      var salvProMax = []; //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        console.log(salvProMax);
        salvProMax.push(salvProValue[0]);
      }
      this.option = {
        title: {
          text: "最受欢迎私教",
          padding: [
            30, // 上
            0, // 右
            0, // 下
            20, // 左
          ],
          textStyle: {
            color: "#FFFFFF",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            fontSize: 24,
          },
        },
        grid: {
          left: "4%",
          right: "1%",
          bottom: "2%",
          top: "32%",
          containLabel: true,
        },
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#63B2FD",
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: salvProName,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
            },
            data: salvProValue,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 4,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#07E8F1",
                  },
                  {
                    offset: 1,
                    color: "#07E8F1",
                  },
                ]),
              },
            },
            barWidth: 20,
            data: salvProValue,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: salvProMax,
            itemStyle: {
              normal: {
                color: "#ffffff",
                barBorderRadius: 4,
                opacity: 0,
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
.pouparBox {
  width: 100%;
  height: 100%;
}
</style>