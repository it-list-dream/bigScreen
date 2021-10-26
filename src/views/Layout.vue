<template>
  <div class="container">
    <div class="header">
      <div class="header_tips">
        <div class="store_total">门店总数： 1600</div>
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
                <span>6845790</span>
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>私教人数（人）</span>
                <span>5684720</span>
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>会员金额（元）</span>
                <span>￥852147021</span>
              </div>
            </li>
            <li>
              <div class="statis_item">
                <span>私教金额（元）</span>
                <span>￥2356841</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="real_sign">
          <h2 class="sign_title">实时签到</h2>
          <dv-scroll-board
            :config="config"
            style="width: 500px; height: 220px"
          />
          <!-- <sign-in :number="attendanceNumber"></sign-in> -->
        </div>
      </div>
      <div class="center_box">
        <div class="number_box">
          <div class="intoStoreNumber center_item">
            <span class="center_title">今日进店人数</span>
            <div class="counter">2000</div>
            <span>人</span>
          </div>
          <div class="todayWater center_item">
            <span class="center_title">今日流水</span>
            <div class="yuan">6346363</div>
            <span>元</span>
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
          <active-echarts></active-echarts>
          <income-echarts></income-echarts>
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
import QS from "qs";
export default {
  name: "Layout",
  data() {
    return {
      animate: false,
      option: null,
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
        header: ["列1", "列2", "列3"],
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
    };
  },
  components: {
    chinaMap,
    groupEcharts,
    personalEcharts,
    activeEcharts,
    incomeEcharts,
    signIn,
  },
  created: function () {
    this.getDays();
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
        // console.log(this.coachx,this.coachy)
        // console.log(res.data)
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
  font-size: 30px;
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
  padding: 0 24px;
}
.sign_title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  padding: 32px 0 30px;
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