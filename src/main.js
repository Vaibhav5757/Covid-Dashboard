import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import VueCarousel from 'vue-carousel';
import VueApexCharts from 'vue-apexcharts'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from '../store';

Vue.config.productionTip = false

// Use full bundle of vue material
Vue.use(VueMaterial);

// Use third party select
Vue.component("v-select", vSelect);

// Use Vue carousel
Vue.use(VueCarousel);

// Use apex charts
Vue.use(VueApexCharts)

// Make apex chart as a component
Vue.component('apexchart', VueApexCharts)

// Use Vue-Awesome Icon pack
Vue.component('v-icon', Icon);

// Use bootstrap
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
