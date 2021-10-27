<template>
  <div class="clientMap" ref="chinaMap"></div>
</template>

<script>
export default {
  name: "chinaMap",
  data() {
    return {
      option: null,
    };
  },
  mounted: function () {
    this.draw();
  },
  methods: {
    draw: function () {
      var myChart = this.$echarts.init(this.$refs.chinaMap);
      var mapName = "china";
      var geoCoordMap = {};
      var data = [
    { name: '北京', value: 54 },
    { name: '天津', value: 62 },
    { name: '河北', value: 92 },
    { name: '山西', value: 81 },
    { name: '内蒙古', value: 117 },
    { name: '辽宁', value: 67 },
    { name: '吉林', value: 82 },
    { name: '黑龙江', value: 123 },
    { name: '上海', value: 54 },
    { name: '江苏', value: 92 },
    { name: '浙江', value: 114 },
    { name: '安徽', value: 109 },
    { name: '福建', value: 116 },
    { name: '江西', value: 91 },
    { name: '山东', value: 119 },
    { name: '河南', value: 137 },
    { name: '湖北', value: 116 },
    { name: '湖南', value: 114 },
    { name: '重庆', value: 91 },
    { name: '四川', value: 125 },
    { name: '贵州', value: 62 },
    { name: '云南', value: 83 },
    { name: '西藏', value: 90 },
    { name: '陕西', value: 80 },
    { name: '甘肃', value: 76 },
    { name: '青海', value: 90 },
    { name: '宁夏', value: 68 },
    { name: '新疆', value: 180 },
    { name: '广东', value: 123 },
    { name: '广西', value: 59 },
    { name: '海南', value: 74 },
];
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      // console.log('map',data);
      // console.log('map', geoCoordMap[name])
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      this.option = {
        title: {
          text: "客户分布图",
          textStyle: {
            color: " #FFFFFF",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: 24,
          },
          padding: [
            36, // 上
            0, // 右
            0, // 下
            50, // 左
          ],
        },
        backgroundColor: 'transparent',
        tooltip: {
          show:false
          // padding: 0,
          // enterable: true,
          // transitionDuration: 1,
          // textStyle: {
          //   color: "#000",
          //   decoration: "none",
          // },
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              areaColor: "#4499d0",
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 6,
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
            ),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "left",
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow",
              },
            },
            zlevel: 1,
          },
        ],
      };
      myChart.setOption(this.option, true);
    },
  },
};
</script>

<style scoped>
.clientMap {
  width: 100%;
  height: 100%;
}
</style>