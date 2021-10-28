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
import './assets/style/iconfont.css'
import axios from 'axios'
import router from './router/index.js'
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
import {
  MessageBox,
  Message,
} from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
