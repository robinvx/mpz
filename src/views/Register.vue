<template>
    <div>
        <h1 style="margin-bottom:20px;">Register</h1>
        
        <form action="">
            <div>
                <input type="text" name="name" placeholder="Naam" v-model.trim="name">
            </div>
            <div>
                <input type="text" name="surname" placeholder="Voornaam" v-model.trim="surname">
            </div>
            <div>
                <input type="email" name="email" placeholder="E-mail adres" v-model.trim="email"> 
            </div>
            <div>
                <input type="password" name="password" placeholder="Paswoord" v-model="password"> 
            </div>
            <div>
                <input type="password" name="password_confirmation" placeholder="Herhaal paswoord" v-model="password_confirmation">
            </div>
            <div>
                <input type="submit" value="Register" v-on:click.prevent="registerUser"> 
            </div>
        </form>
        
        <div>
            <p>Already registered? <router-link to="/login">Click here to login</router-link></p>
        </div>
        <div v-if="hasErrors">
            <p v-for="error in errors">{{ error }}</p>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'register',
        
        data() {
            return {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: '',
                errors: []
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            },
            fullName() {
                return this.surname + ' ' + this.name
            }
        },
        methods: {
            registerUser() {
                this.errors = []

                if (this.isFormValid()) {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(user => {
                            console.log(user.email + " has been registered")

                            user.updateProfile({
                                displayName: this.fullName,
                                email: this.email
                            }).then(() => {

                                this.writeUserData(user).then(() => {
                                    this.$store.dispatch('setUser', user)
                                    this.$store.dispatch('logoutUser')
                                })
                                
                                user.sendEmailVerification().then(() => {
                                    console.log("verification email sent")
                                }, error => {
                                    console.log(error)
                                    this.errors.push(error.message)
                                })

                            }, error => {
                                console.log(error)
                                this.errors.push(error.message)
                            })

                        }).catch(error => {
                            console.log(error)
                            const errorCode = error.code;
                            if (errorCode === 'auth/invalid-email') {
                                this.errors.push('Email badly formatted')
                            }
                            if (errorCode === 'auth/email-already-in-use') {
                                this.errors.push('Email already in use')
                            }
                            if (errorCode === 'auth/weak-password') {
                                this.errors.push(error.message)
                            }
                        })
                }
            },
            writeUserData(user) {
                return firebase.database().ref('users/' + user.uid).set({
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    phone: '',
                    postalcode: '',
                    city: ''
                })
            },
            isEmpty() {
                if (
                    this.name.length == 0 ||
                    this.surname.length == 0 ||
                    this.email.length == 0 ||
                    this.password.length == 0 ||
                    this.password_confirmation.length == 0
                ) {
                    return true
                }
                return false
            },
            isPasswordValid() {
                if (this.password !== this.password_confirmation) {
                    return false
                }
                return true
            },
            isFormValid() {
                if (this.isEmpty()) {
                    this.errors.push('Please fill in all fields')
                    return false
                }
                if (!this.isPasswordValid()) {
                    this.errors.push('Password does not match the confirm password.')
                    return false
                }
                return true
            }
        }
    }

</script>
