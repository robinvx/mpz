import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)



const state = {
    currentUser: null,
    isLoggedIn: false,
    errors: []
}

const mutations = {
    SET_USER(state, user) {
        state.currentUser = user
    },
    LOGIN_USER(state) {
        state.isLoggedIn = true
    },
    LOGOUT_USER(state) {
        state.isLoggedIn = false
    },
    CLEAR_ERRORS(state) {
        state.errors = []
    }
}

const actions = {
    // Set user
    setUser({commit}, user) {
        commit('SET_USER', user)
    },
    
    // Login user
    // Check if currentUser email is verified
    // Set currentUser to logged in user
    loginUser({state, dispatch}, user) {
        state.errors = []
        
        firebase.auth().signInWithEmailAndPassword(user.e, user.p)
            .then( user => {
                if(user.emailVerified) {
                    dispatch('setUser', user)
                    router.push('/')
                } else {
                    dispatch('logoutUser')
                    console.log('email not verified')
                }
            }).catch(error => {
                state.errors.push(error.message)
            })
    },
    
    // Logout user
    // Set currentUser to null
    logoutUser({state, dispatch}, user) {
        firebase.auth().signOut().then( user => {
                dispatch('setUser', null)
                router.push('/')
            })    
    },
    
    // Observe user authentication state changes
    // Set isLoggedIn state to true/false depending on authentication state
    authStateObserver({commit, state, dispatch}) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is logged in
                commit('LOGIN_USER')
                console.log('logged in')
            } else {
                // User is logged out
                commit('LOGOUT_USER')
                console.log('logged out')
            }
        })
    },
    
    // Clear errors if array is not empty
    clearErrors({commit, state}) {
        if(state.errors.length > 0) {
            commit('CLEAR_ERRORS')   
            console.log('errors cleared')    
        } 
    }
}

const getters = {
    currentUser: state => state.currentUser,
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})