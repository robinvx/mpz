<template>
<!--    <header class="header" v-bind:style="{ height: windowInnerHeight }">-->
    <header class="header">
        <div class="header__menu">
            <div class="header__menu__top">
                <div class="header__menu__top__item">
                    <h1>
                        <router-link to="/" v-on:click.native="isActive = false" class="logo logo--mobile">MIJNPAARD/ZOEKT</router-link>
                    </h1>
                </div>
                <div class="header__menu__top__item">
                    <router-link to="/create" v-on:click.native="isActive = false">
                        <span class="icon icon--place icon--xsmall"></span>
                    </router-link>    
                </div>
                <div class="header__menu__top__item">
                    <button class="header__menu__top__item__toggle" v-on:click="isActiveToggle">Menu</button>
                </div>
            </div>
            <nav class="header__menu__nav" v-bind:class="{ active: isActive }">
                <router-link to="/create" v-on:click.native="isActiveToggle" class="header__menu__nav__item bg-3">
                    <span class="header__menu__nav__item__icon icon icon--place icon--small"></span>
                    <span class="header__menu__nav__item__txt">Plaats een zoekertje</span>
                </router-link>
                <router-link to="/login" v-on:click.native="isActiveToggle" v-if="!isLoggedIn" class="header__menu__nav__item">
                    <span class="header__menu__nav__item__icon icon icon--user icon--small"></span>
                    <span class="header__menu__nav__item__txt">Log in/Registreren</span>
                </router-link>
                <router-link to="/account" v-on:click.native="isActiveToggle" v-else class="header__menu__nav__item">
                    <span class="header__menu__nav__item__icon icon icon--user icon--small"></span>
                    <span class="header__menu__nav__item__txt">Mijn profiel</span>
                </router-link>
<!--
                <a href="#" class="header__menu__nav__item">
                    <span class="header__menu__nav__item__icon icon icon--video icon--small"></span>
                    <span class="header__menu__nav__item__txt">Hoe werkt het?</span>
                </a>
-->
                <a href="#" class="header__menu__nav__item">
                    <span class="header__menu__nav__item__icon icon icon--contact icon--small"></span>
                    <span class="header__menu__nav__item__txt">Contact</span>
                </a>
                <a href="#" class="header__menu__nav__item" v-on:click="logoutUser() + isActiveToggle()" v-if="isLoggedIn">
                    <span class="header__menu__nav__item__txt" >Log uit</span>
                </a>
            </nav>
            <transition name="fade">
                <div class="header__menu__overlay" v-show="isActive" v-on:click="isActiveToggle"></div>
            </transition>
        </div>
<!--
        <div class="header__actions">
            <template-button message="Plaats een stalling" icon="place" v-on:click.native="goToCreate"></template-button>
            <template-button message="Zoek een stalling" icon="search" type="light"></template-button>
        </div>
-->
        <div class="header__gradient"></div>
    </header>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import templateButton from './Button'

    export default {
        data() {
            return {
                isActive: false,
                windowInnerHeight: ''
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        created() {
            this.windowInnerHeight = window.innerHeight + 'px'
        },
        methods: {
            isActiveToggle() {
                this.isActive = !this.isActive
            },
            goToCreate() {
                if(this.isLoggedIn) {
                    this.$router.push('/create')
                } else {
                    console.log("You must be logged in to create a listing")
                } 
            },
            ...mapActions(['logoutUser'])
        },
        components: {
            templateButton
        }
    }

</script>
