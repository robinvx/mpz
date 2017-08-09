<template>
    <div>
        <h1 style="margin-bottom:20px;">Wachtwoord vergeten?</h1>
        
        <form action="">
            <div>
                <input type="email" name="email" placeholder="E-mail adres" v-model.trim="email"> 
            </div>
            <div>
                <input type="submit" value="Verzenden" v-on:click.prevent="sendPasswordResetEmail">  
            </div>
            <div v-if="hasErrors">
                <p v-for="error in errors">{{ error }}</p>
            </div>
        </form>
    </div>
</template>


<script>    
    export default {
        name: 'forgot-password',

        data() {
            return {
                email: '',
                errors: []
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            }
        },
        methods: {
            sendPasswordResetEmail() {
                this.errors = []
                
                firebase.auth().sendPasswordResetEmail(this.email).then(() => {
                    console.log("email sent")
                    this.$router.push('/')
                    // Toast: An email has been sent to *email*
                }, error => {
                    console.log(error)
                    this.errors.push(error.message)
                });
            }    
        }
        
    }

</script>
