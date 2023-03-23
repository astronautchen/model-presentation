import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import 'uno.css';
import SvgIcon from '@/components/common/svg-icon.vue';
import '@/assets/iconfont/iconfont.js';

// 创建vue实例
const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.component('SvgIcon', SvgIcon);
// 挂载实例
app.mount('#app');
