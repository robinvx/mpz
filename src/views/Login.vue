<template>
    <div>
        <h1 style="margin-bottom:20px;">Log in</h1>
        
        <form action="">
            <div>
                <input type="email" name="email" placeholder="E-mail adres" v-model.trim="email"> 
            </div>
            <div>
                <input type="password" name="password" placeholder="Paswoord" v-model="password"> 
            </div>
            <div>
                <input type="submit" value="Aanmelden" v-on:click.prevent="loginUser({e: email, p: password})">  
            </div>
            <div>
                <p>Not yet registered? <router-link to="/register">Click here to register</router-link></p>
            </div>
            <div>
                <router-link to="/forgot-password">Wachtwoord vergeten?</router-link>
            </div>
            <div v-if="hasErrors">
                <p v-for="error in errors">{{ error }}</p>
            </div>
        </form>
    </div>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    
    export default {
        name: 'login',

        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            },
            ...mapGetters(['errors'])
        },
        methods: {
            ...mapActions(['loginUser'])
        }
        
    }

</script>
