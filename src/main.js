import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
window.Vue.use(window.VueMaterial)
window.Vue.material.registerTheme({
  teal: {
    primary: 'teal',
    accent: 'pink',
    warn: 'deep-orange',
    background: 'white',
  },
  indigo: {
    primary: 'indigo',
    accent: 'pink',
    warn: 'deep-orange',
    background: 'white',
  },
})

window.Vue.material.setCurrentTheme('teal')
new Vue({
  render: h => h(App),
}).$mount('#app')
