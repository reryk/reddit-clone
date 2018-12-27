import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import UserService from './services/UserService'
import GroupService from './services/GroupService'
import PostService from './services/PostService'
import CommentService from './services/CommentService'
import './config/axios'
import VueI18n from 'vue-i18n'
import messages from './locale'
import moment from 'moment';
import Buefy from 'buefy'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Buefy);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'pl',
    messages,
    fallbackLocale: 'pl',
});

// Vue.config.performance = process.env.NODE_ENV === 'development' https://github.com/vuetifyjs/vuetifyjs.com/blob/dev/src/main.js

Vue.config.productionTip = false;
Vue.prototype.$groupService = new GroupService();
Vue.prototype.$userService = new UserService();
Vue.prototype.$postService = new PostService();
Vue.prototype.$commentService = new CommentService();
Vue.filter("fullDate", str => moment(str).format('MMMM Do YYYY, HH:mm:ss'));
Vue.filter('shortDate', str => moment(str).format('dddd, HH:mm:ss'));

Vue.filter('t', function (value) {
    return i18n.t(value)
});
Vue.prototype.$translate = function(val) {
    return i18n.t(val);
}

Vue.prototype.$toggleLoading = function(val) {
    store.commit('toggleLoading', val);
}

Vue.prototype.$success = function(msg, args) {
    showToast(msg, 'is-success', args);
}

Vue.prototype.$danger = function(msg, args) {
    showToast(msg, 'is-danger', args);
}

Vue.prototype.$info = function(msg, args) {
    showToast(msg, 'is-info', args);
}

Vue.prototype.$warning = function(msg, args) {
    showToast(msg, 'is-warning', args);
}

function showToast (msg, type, args) {
    Vue.prototype.$toast.open({
        message: i18n.t(msg, args),
        type: type,
        position: 'is-top-right',
        queue: false
    })
}

Vue.prototype.$userService.autoLogin();

// create the app instance.
// here we inject the router, store and ssr context to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
