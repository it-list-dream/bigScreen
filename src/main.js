import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china)
import './assets/style/reset.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
