<template>
  <div class="vueBox">
    <div class="marquee">
      <div class="marquee_box">
        <ul class="marquee_list" :class="{ marquee_top: animate }">
          <li
            v-for="(item, index) in marqueeList"
            :key="index"
            :style="{
              background: item.background,
              display: 'flex',
              'justify-content': 'space-between',
              'align-items': 'center',
            }"
          >
            <span>{{ item.name }}</span>
            <span>在</span>
            <span class="red"> {{ item.city }}</span>
            <span>杀敌</span>
            <span class="red"> {{ item.amount }}</span>
            <span>万</span>
            <span
              ><img
                :src="item.src ? item.src : ''"
                style="width: 15px; height: 15px"
                alt=""
            /></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signIn",
  data() {
    return {
      animate: false,
      marqueeList: [
        {
          name: "1军",
          city: "北京",
          amount: "10",
          background: "rgba(0,0,0,.4)",
          src: "../img/冠军.png",
        },
        {
          name: "2军",
          city: "上海",
          amount: "20",
          background: "rgba(0,0,0,.6)",
          src: "../img/亚军.png",
        },
        {
          name: "3军",
          city: "广州",
          amount: "30",
          background: "rgba(0,0,0,.4)",
          src: "../img/季军.png",
        },
        {
          name: "4军",
          city: "重庆",
          amount: "40",
          background: "rgba(0,0,0,.6)",
        },
        {
          name: "5军",
          city: "天津",
          amount: "50",
          background: "rgba(0,0,0,.4)",
        },
        {
          name: "6军",
          city: "西安",
          amount: "60",
          background: "rgba(0,0,0,.6)",
        },
        {
          name: "7军",
          city: "武汉",
          amount: "70",
          background: "rgba(0,0,0,.4)",
        },
        {
          name: "8军",
          city: "南昌",
          amount: "80",
          background: "rgba(0,0,0,.6)",
        },
      ],
    };
  },
  created: function () {
    setInterval(this.showMarquee, 2000);
  },
  methods: {
    showMarquee: function () {
      this.animate = true;
      setTimeout(() => {
        if (this.marqueeList.length % 2 != 0) {
          this.marqueeList[0]["background"] =
            this.marqueeList[0]["background"] === "rgba(0,0,0,.4)"
              ? "rgba(0,0,0,.6)"
              : "rgba(0,0,0,.4)";
        }
        this.marqueeList.push(this.marqueeList[0]);
        this.marqueeList.shift();
        this.animate = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>