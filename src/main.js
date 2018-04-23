// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import firebase from 'firebase'
import store from './store'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

Vue.config.productionTip = false

// Vuex router sync
sync(store, router)

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDJPAeViaUfZQPnXyPL8tO5eGZ94OxJBTU",
    authDomain: "mijnpaardzoekt.firebaseapp.com",
    databaseURL: "https://mijnpaardzoekt.firebaseio.com",
    projectId: "mijnpaardzoekt",
    storageBucket: "mijnpaardzoekt.appspot.com",
    messagingSenderId: "1029285543707"
};

window.firebase = firebase
firebase.initializeApp(config)

/* eslint-disable no-new */

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    
    store.dispatch('setUser', user)
    store.dispatch('authStateObserver')
    
    new Vue({
        el: '#app',
        template: '<App/>',
        router,
        store,
        components: {
            App
        }
    })
    
    unsubscribe()
})