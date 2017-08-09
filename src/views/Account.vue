<template>
    <div>
        <h1 style="margin-bottom:20px;">Mijn profiel</h1>
        
        <h2 style="margin-top:20px;">CHANGE EMAIL</h2>
        <p>Mijn e-mail: {{ currentUser.email }}</p>
        
        <form>
            <div>
                <input type="email" name="new-email" placeholder="Nieuw e-mail adres" v-model.trim="new_email"> 
            </div>
            <div>
                <input type="password" name="password" placeholder="Wachtwoord" v-model="password"> 
            </div>
            <div>
                <input type="submit" value="Opslaan" v-on:click.prevent="updateUserEmail">  
            </div>
            <div v-if="hasErrors">
                <p v-for="error in errors">{{ error }}</p>
            </div>
        </form>
        
        <h2 style="margin-top:20px;">CHANGE PASSWORD</h2>
        
        <form>
            <div>
                <input type="password" name="currentpassword" placeholder="Huidig wachtwoord" v-model="currentpassword"> 
            </div>
            <div>
                <input type="password" name="newpassword" placeholder="Nieuw wachtwoord" v-model="newpassword"> 
            </div>
            <div>
                <input type="password" name="newpassword_confirmation" placeholder="Herhaal nieuw wachtwoord" v-model="newpassword_confirmation"> 
            </div>
            <div>
                <input type="submit" value="Opslaan" v-on:click.prevent="updateUserPassword">  
            </div>
            <div v-if="hasErrors">
                <p v-for="error in errors">{{ error }}</p>
            </div>
        </form>
        
        <h2 style="margin-top:20px;">PERSONAL DATA</h2>
        <p>Naam: {{ currentUserData.name }}</p>
        <p>Voornaam: {{ currentUserData.surname }}</p>
        <p>Telefoonnummer: {{ currentUserData.phone }}</p>
        <p>Postcode: {{ currentUserData.postalcode }}</p>
        <p>Plaats: {{ currentUserData.city }}</p>
        
        <form>
            <div>
                <label for="name">Naam</label>
                <input type="text" name="name" placeholder="Naam" v-model="currentUserData.name">
            </div>
            <div>
                <label for="Voornaam">Voornaam</label>
                <input type="text" name="surname" placeholder="Voornaam" v-model="currentUserData.surname">
            </div>
            <div>
                <label for="phone">Telefoonnummer</label>
                <input type="text" name="phone" placeholder="Telefoonnummer" v-model="currentUserData.phone">
            </div>
            <div>
                <label for="postalcode">Postcode</label>
                <input type="number" name="postalcode" placeholder="Postcode" v-model="currentUserData.postalcode">
            </div>
            <div>
                <label for="city">Plaats</label>
                <input type="text" name="city" placeholder="Plaats" v-model="currentUserData.city">    
            </div>
            <div>
                <input type="submit" value="Opslaan" v-on:click.prevent="updateCurrentUserData">  
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
        name: 'account',

        data() {
            return {
                new_email: '',
                password: '',
                currentpassword: '',
                newpassword: '',
                newpassword_confirmation: '',
                errors: [],
                currentUserData: {
                    name: '',
                    surname: '',
                    phone: '',
                    postalcode: '',
                    city: ''
                }
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            },
            fullName() {
                return this.currentUserData.surname + ' ' + this.currentUserData.name
            },
            ...mapGetters(['currentUser'])
        },
        created() {
            const user = firebase.auth().currentUser
            const usersRef = firebase.database().ref('users/' + user.uid)

            return usersRef.once('value', snapshot => {
                this.currentUserData = snapshot.val()
            })
        },
        methods: {
            updateUserEmail() {
                this.errors = []
                const user = firebase.auth().currentUser
                const credentials = firebase.auth.EmailAuthProvider.credential(user.email, this.password)

                if (this.isNewEmail(user)) {
                    user.reauthenticateWithCredential(credentials).then(() => {
                        console.log("User re-authenticated")

                        // Update currentUser state in store
                        this.writeNewEmail(user).then(() => {
                            this.$store.dispatch('setUser', user)

                            user.updateEmail(this.new_email).then(() => {
                                console.log("Email update succesvol")

                                user.sendEmailVerification().then(() => {
                                    console.log("verification email sent to " + this.new_email)
                                    this.$store.dispatch('logoutUser')
                                    // Toast: Please log in with new email after verification
                                }, error => {
                                    console.log(error.message)
                                    this.errors.push(error.message)
                                })
                            }, error => {
                                console.log(error.message)
                                this.errors.push(error.message)
                            })
                        })
                    }, error => {
                        console.log(error.message)
                        this.errors.push(error.message)
                    })
                }
            },
            isNewEmail(user) {
                if (this.new_email == user.email) {
                    this.errors.push('New email must be different from old email')
                    return false
                } else {
                    return true
                }
            },
            writeNewEmail(user) {
                return firebase.database().ref('users/' + user.uid).update({
                    email: this.new_email
                })
            },
            updateUserPassword() {
                this.errors = []
                const user = firebase.auth().currentUser
                const credentials = firebase.auth.EmailAuthProvider.credential(user.email, this.currentpassword)

                if (this.isPasswordFormValid()) {
                    user.reauthenticateWithCredential(credentials).then(() => {
                        console.log("User re-authenticated")

                        user.updatePassword(this.newpassword).then(() => {
                            console.log('password has been changed')
                            // Empty input fields after password change
                            this.currentpassword = ''
                            this.newpassword = ''
                            this.newpassword_confirmation = ''
                        }, error => {
                            console.log(error.message)
                            this.errors.push(error.message)
                        })
                    }, error => {
                        console.log(error.message)
                        this.errors.push(error.message)
                    })
                }
            },
            isPasswordEmpty() {
                if (this.newpassword.length == 0 || this.newpassword_confirmation.length == 0) {
                    return true
                }
                return false
            },
            isPasswordValid() {
                if (this.newpassword !== this.newpassword_confirmation) {
                    return false
                }
                return true
            },
            isPasswordFormValid() {
                if (this.isPasswordEmpty()) {
                    this.errors.push('Please fill in all fields')
                    return false
                }
                if (!this.isPasswordValid()) {
                    this.errors.push('Password does not match the confirm password.')
                    return false
                }
                return true
            },
            updateCurrentUserData() {
                this.errors = []
                const user = firebase.auth().currentUser
                const usersRef = firebase.database().ref('users/' + user.uid)

                if (this.isCurrentUserDataFormValid()) {
                    user.updateProfile({
                        displayName: this.fullName,
                    }).then(() => {
                        this.$store.dispatch('setUser', user)

                        let newCurrentUserData = {
                            name: this.currentUserData.name,
                            surname: this.currentUserData.surname,
                            phone: this.currentUserData.phone,
                            postalcode: this.currentUserData.postalcode,
                            city: this.currentUserData.city
                        }
                        return usersRef.update(newCurrentUserData).then(() => {
                            console.log("user updated")
                        })
                    })
                }
            },
            isNameEmpty() {
                if (this.currentUserData.name.length == 0 || this.currentUserData.surname.length == 0) {
                    return true
                }
                return false
            },
            isPostalcodeValid() {
                let p = this.currentUserData.postalcode
                
                if (p.length !== 0 && (p < 1000 || p > 9999)) {
                   return false 
                }
                return true
            },
            isCurrentUserDataFormValid() {
                if (this.isNameEmpty()) {
                    this.errors.push('Name and surname must be filled in')
                    return false
                }
                if (!this.isPostalcodeValid()) {
                    this.errors.push('Postcode niet correct') 
                    return false
                }
                return true
            }
        }
    }

</script>
