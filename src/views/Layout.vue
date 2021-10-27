<template>
  <div class="container">
    <div class="header">
      <div class="header_tips">
        <div class="store_total" v-if="allOnlineData">
          门店总数：{{ allOnlineData.GymCount }}
        </div>
        <div class="time">{{ date }} - {{ days }}</div>
      </div>
      <img src="../assets/title.png" alt="" class="title_image" />
      <h1 class="logo">
        <img src="../assets/logo1.png" alt="" />
      </h1>
      <div class="fitness_title">全国健身门店实时数据</div>
    </div>
    <section class="content clearfix">
      <div class="left_box">
        <div class="statistics">
          <h2 class="statistics_title">数据统计</h2>
          <ul class="statis_box">
            <li>
              <div class="statis_item">
                <span>会员人数（人）</span>
                <span v-if="allOnlineData">{{ allOnlineData.TotalUser }}</span>
                <!-- <span>33322</span> -->
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>私教人数（人）</span>
                <span v-if="allOnlineData">{{
                  allOnlineData.CoachUserCount
                }}</span>
                <!-- <span>8732</span> -->
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>会员金额（元）</span>
                <span v-if="allOnlineData"
                  >￥{{ allOnlineData.CardMoney }}</span
                >
                <!-- <span>￥1800</span> -->
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>私教金额（元）</span>
                <span v-if="allOnlineData"
                  >￥{{ allOnlineData.CoachMoney }}</span
                >
                <!-- <span>￥9000</span> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="real_sign">
          <h2 class="sign_title">实时签到</h2>
          <dv-scroll-board :config="config" class="scroll-board" />
        </div>
      </div>
      <div class="center_box">
        <div class="number_box">
          <div class="intoStoreNumber center_item">
            <!-- <span class="center_title">今日进店人数</span>
            <div class="counter">2000</div>
            <span>人</span> -->
            <!-- onlineTotalPeople -->
            <number-scroll
              :scrollNumber="{
                onlineTotal: onlineTotalPeople,
                title: '今日进店人数',
                title1: '人',
              }"
            ></number-scroll>
          </div>
          <div class="todayWater center_item">
            <!-- <span class="center_title">今日流水</span>
            <div class="yuan">6346363</div>
            <span>元</span> -->
            <number-scroll
              :scrollNumber="{
                onlineTotal: onlineTotalMoney,
                title: '今日流水',
                title1: '元',
              }"
            ></number-scroll>
          </div>
        </div>
        <!-- 客户分布图 -->
        <div class="map_box">
          <chinaMap></chinaMap>
        </div>
      </div>
      <!--  -->
      <div class="right_box">
        <div class="popularClass">
          <div class="group">
            <group-echarts :groupx="groupx" :groupy="groupy"></group-echarts>
          </div>
          <div class="personal">
            <personal-echarts
              :coachx="coachx"
              :coachy="coachy"
            ></personal-echarts>
          </div>
        </div>
        <!-- 近半年数据 -->
        <div class="recentData">
          <active-echarts
            :active="{
              monthList: monthList,
              activePeopleCount: activePeopleCount,
            }"
          ></active-echarts>
          <income-echarts
            :income="{ monthList: monthList, incomeCount: incomeCount }"
          ></income-echarts>
        </div>
      </div>
    </section>
    <!-- leftEcharts -->
  </div>
</template>

<script>
import chinaMap from "../components/chinaMap.vue";
import groupEcharts from "../components/groupEcharts.vue";
import personalEcharts from "../components/personalEacharts.vue";
import activeEcharts from "../components/activeEcharts.vue";
import incomeEcharts from "../components/incomeEcharts.vue";
import signIn from "../components/signIn.vue";
import numberScroll from "../components/numberScroll.vue";
import QS from "qs";
export default {
  name: "Layout",
  data() {
    return {
      animate: false,
      // attendanceNumber:9800
      // coachRanking:null,
      // groupRanking:null
      coachx: [],
      coachy: [],
      groupx: [],
      groupy: [],
      date: null,
      days: null,
      config: {
        header: ["门店", "姓名", "时间"],
        data: [[]],
        align: ["center"],
        headerBGC: "#0B194A",
        oddRowBGC: "#02071D",
        evenRowBGC: "#02071D",
        rowNum: 10,
      },
      allOnlineData: null,
      activePeopleCount: [],
      incomeCount: [],
      monthList: [],
      //在线人数
      onlineTotalPeople: 0,
      onlineTotalMoney: 0,
    };
  },
  components: {
    chinaMap,
    groupEcharts,
    personalEcharts,
    activeEcharts,
    incomeEcharts,
    signIn,
    numberScroll,
  },
  created: function () {
    this.getDays();
    this.monthList = this.getLastSixMon()
      .map((item) => item.name)
      .reverse();
    this.initWebSocket();
  },
  mounted() {
    var jsonStr = {
      key: "D3069A3F7C5E262F83ACEE108C4F309D",
    };

    this.$axios
      .post(
        "https://user.360ruyu.cn/GymManage.asmx/RevenueData",
        JSON.stringify(jsonStr)
      )
      .then((res) => {
        //this.coachRanking
        var coachRanking = res.data.coach;
        var groupRanking = res.data.league;
        coachRanking.forEach((item) => {
          this.coachx.push(item.CP_Name);
          this.coachy.push(item.CO_Num);
        });

        groupRanking.forEach((item) => {
          this.groupx.push(item.CTO_Name);
          this.groupy.push(item.User_Num);
        });
        //在线数据
        this.allOnlineData = res.data.revenue;
        var newData = res.data.revenue;
        for (var item in newData) {
          if (item.includes("ActiveUser")) {
            console.log(this.activePeopleCount);
            this.activePeopleCount.push(newData[item]);
          } else if (item.includes("Income")) {
            this.incomeCount.push(newData[item]);
          }
        }
        this.activePeopleCount.reverse();
        this.incomeCount.reverse();
      });
  },
  methods: {
    getDays() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //年
      var month = myDate.getMonth() + 1; //月
      var day = myDate.getDate(); //日
      var days = myDate.getDay(); //星期
      this.date = year + "-" + month + "-" + day;
      switch (days) {
        case 0:
          this.days = "星期天";
          break;
        case 1:
          this.days = "星期一";
          break;
        case 2:
          this.days = "星期二";
          break;
        case 3:
          this.days = "星期三";
          break;
        case 4:
          this.days = "星期四";
          break;
        case 5:
          this.days = "星期五";
          break;
        case 6:
          this.days = "星期六";
          break;
      }
    },
    getLastSixMon() {
      var data = new Date();
      //获取年
      var year = data.getFullYear();
      //获取月
      var mon = data.getMonth() + 1;
      var arry = new Array();
      for (var i = 0; i < 6; i++) {
        if (mon <= 0) {
          year = year - 1;
          mon = mon + 12;
        }
        var mon2 = mon;
        if (mon < 10) {
          mon = "0" + mon;
        }
        if (i == 0) {
          arry[i] = {
            name: mon2 + "月",
            value: year + "" + mon,
          };
        } else {
          arry[i] = {
            name: mon2 + "月",
            value: year + "" + mon,
          };
        }
        mon = mon - 1;
      }
      return arry;
    },
    initWebSocket: function () {
      this.websock = new WebSocket("ws://47.111.150.151:2012");
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },
    websocketOnopen() {
      console.log("WebSocket连接成功");
      var jsonStr = {
        loginName: "ruyuWebRevenue",
        userName: "",
        userId: 0,
        version: "",
        sign: "ruyu",
        gymName: "",
        typeName: "LoginSuccess",
        gymid: 88,
      };
      this.websocketSend(JSON.stringify(jsonStr));
    },
    websocketOnerror() {
      console.log("WebSocket连接发生错误");
      this.reconnect();
    },
    websocketOnmessage(e) {
      //监听服务端发送过来的消息
      var resultData = JSON.parse(e.data);
      //console.log(resultData)
      if (resultData.typeName && resultData.typeName == "userCount") {
        console.log("目前在线人数:", resultData.count);
        this.onlineTotalPeople = resultData.count;
      } else if (resultData.typeName && resultData.typeName == "userPay") {
        console.log("当前流水:", resultData.money);
        this.onlineTotalMoney = resultData.money;
      } else {
        this.handleTable(resultData);
      }
    },
    websocketOnclose(e) {
      console.log("connection closed (" + e.code + ")");
      this.reconnect();
    },
    websocketSend(text) {
      // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        console.log("send failed (" + err.code + ")");
      }
    },
    reconnect() {
      var that = this;
      if (that.lockReconnect) return;
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        console.info("尝试重连...");
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    handleTable(data1) {
      //       createdate: "2021-10-27 17:14"
      // gymid: 108
      // userName: "赵小燕"
      console.log('data1',data1);
      var tableList = [];
      var newList = [];
      data1.forEach((item, index) => {
        for (var o in item) {
          if (newList.length == 3) {
            if (o == "gymName" || o == "createdate" || o == "userName") {
              newList.push(item[o]);
              if (newList.length == 3) {
                tableList.push(newList);
              }
            }
            tableList.push(newList);
          }
        }
        newList = [];
      });
      this.config.data = tableList;
      this.$set(this.config, this.config.data, tableList);
    },
  },
};
</script>

<style scoped>
.container {
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  width: 100%;
  background-image: url("../assets/back.png");
  background-size: cover;
  background-position: center center;
}

.header {
  width: 100%;
}
.header_tips {
  position: relative;
  font-size: 21px;
  color: #3d7fe5;
}
.store_total {
  position: absolute;
  top: 24px;
  left: 276px;
}

.time {
  position: absolute;
  top: 24px;
  right: 276px;
}

.title_image {
  padding-top: 37px;
  width: 100%;
  height: 68px;
}
.logo {
  position: absolute;
  top: 48px;
  left: 23px;
  width: 70px;
  height: 50px;
}
.logo > img {
  width: 100%;
  height: 100%;
}
.fitness_title {
  position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  font-family: Alibaba PuHuiTi;
  font-weight: bold;
  color: #fffefe;
}
.content {
  padding: 30px 20px 25px;
  box-sizing: border-box;
  width: 100%;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.left_box {
  float: left;
  width: 547px;
}
/*  */
.statistics {
  width: 547px;
  height: 348px;
  background-image: url("../assets/1.png");
  background-size: cover;
  background-position: center center;
  box-sizing: border-box;
  padding: 0 24px;
}
.statistics_title {
  padding: 26px 0 36px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}
.statis_box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.statis_box li {
  list-style-type: none;
}
.statis_item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 236px;
  height: 104px;
  box-sizing: border-box;
  padding: 22px 20px;
  background: #162563;
  margin-bottom: 21px;
}
.statis_item span:first-child {
  font-size: 20px;
  font-weight: bold;
  color: #e7e7e7;
}
.statis_item span:last-child {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffdd3f;
}
/* 实时签到 */
.real_sign {
  margin-top: 32px;
  width: 547px;
  height: 539px;
  box-sizing: border-box;
  background-image: url("../assets/2.png");
  background-size: cover;
  background-position: center center;
}
.sign_title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  padding: 32px 24px 30px;
}
.scroll-board {
  /* margin-top: 22px; */
  width: 547px;
  height: 420px;
}
/* 中间部分 */
.center_box {
  float: left;
  width: 758px;
  /* margin: 0 16px; */
}
.number_box {
  width: 100%;
}
.intoStoreNumber,
.todayWater {
  width: 100%;
  height: 101px;
  line-height: 101px;
}
.center_item {
  display: flex;
  background: rgba(7, 19, 79, 0.3);
  border: 1px solid #6ef0ff;
}
.center_item div {
  font-size: 50px;
  font-family: Alibaba PuHuiTi;
  font-weight: bold;
  color: #ffdd3f;
}
.center_item span:last-child {
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #e5e5e5;
}
.counter {
  padding-left: 20px;
}
.center_title {
  padding-left: 45px;
  font-size: 20px;
  font-weight: bold;
  color: #e5e5e5;
}
.todayWater {
  margin-top: 36px;
}
.yuan {
  padding-left: 60px;
}
/* */
.right_box {
  float: left;
  width: 542px;
}
.group,
.personal {
  width: 269px;
  height: 239px;
}
.popularClass {
  display: flex;
  justify-content: space-between;
}
.popularClass > div {
  width: 266px;
  height: 238px;
  box-sizing: border-box;
  background-image: url("../assets/5.png");
  background-size: cover;
  background-position: center center;
}
/* 地图 */
.map_box {
  margin-top: 26px;
  width: 758px;
  height: 650px;
  box-sizing: border-box;
  background-image: url("../assets/7.png");
  background-size: cover;
  background-position: center center;
}

.recentData {
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  width: 547px;
  height: 659px;
  box-sizing: border-box;
  background-image: url("../assets/6.png");
  background-size: cover;
  background-position: center center;
}
</style>