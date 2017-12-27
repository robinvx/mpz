<template>
    <div>

    {{ listingsDetail }}
    
     <h1> {{ listingsDetail.contact.name }}</h1>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                listingsDetail: {
                    contact: {
                        name: null
                    }
                },
            }
        },
        created() {
            const listingsDetailRef = firebase.database().ref('listings/' + this.$route.params.listingKey)

            return listingsDetailRef.once('value', snapshot => {
                this.listingsDetail = snapshot.val()
            })
        },
    }
</script>