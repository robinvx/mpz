// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import firebase from 'firebase'
import store from './store'

import VeeValidate, { Validator } from 'vee-validate';
import nl from 'vee-validate/dist/locale/nl';

const dictionary = {
    custom: {
        name: {
            required: 'Dit veld is verplicht in te vullen'
        },
        address: {
            required: 'Dit veld is verplicht in te vullen'
        },
        email: {
            required: 'Dit veld is verplicht in te vullen'
        },
        website: {
            url: 'Dit is geen geldige URL'
        },
        phone: {
            max: 'Dit nummer is te lang',
            numeric: 'Dit veld mag alleen nummers bevatten'
        },
        radio_group_1: {
            required: 'Dit veld is verplicht'
        },
        radio_group_2: {
            required: 'Dit veld is verplicht'
        },
        radio_group_4: {
            required: 'Deze velden zijn verplicht'
        },
        foodOptions: {
            required: 'Deze velden zijn verplicht'
        },
        extra_info_facebook: {
            url: 'Dit is geen geldige URL'
        },
        extra_info_youtube: {
            url: 'Dit is geen geldige URL'
        }
    },
    attributes: {
        email: 'E-mail'
    }
}

Validator.localize('nl', dictionary)
Validator.localize('nl', nl)
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