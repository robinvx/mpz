<template>
<div>
    TEST
</div>
</template>


<script>
    export default {
        data() {
            return {
                listings: {}
            }
        },
        created() {
            const listingsRef = firebase.database().ref().child('listings')

            return listingsRef.once('value', snapshot => {
                this.listings = snapshot.val()
            })
        },
    }
</script>