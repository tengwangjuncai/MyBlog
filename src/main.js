import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//动画样式  窗口调整库
import './utils/rem'
import './utils/animate.css'

import VueScrollLock from 'vue-scroll-lock'
import IconUpload from '@/components/icon-upload'

import BgUpload from '@/components/Bg-upload'

import VueAwesomeSwiper from 'vue-awesome-swiper'



Vue.component('icon-upload',IconUpload)
Vue.component('bg-upload',BgUpload)

Vue.use(VueAwesomeSwiper,{
    direction:'vertical'
})
Vue.use(VueScrollLock)

Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false

import moment from 'moment';

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
