<template>
<section class="cards">
    <router-link :to="{ name: 'listingdetail', params: { listingKey: index }}" v-for="(listing, index) in listings" :key="index" class="card">
        <figure class="card__figure">
            <img class="card__figure__image" :src="listing.images_url[0]" alt="">
            <figcaption class="card__figure__figcaption">
                <div class="card__figure__figcaption__info">
<!--                    <span class="card__figure__figcaption__info__type icon" v-bind:class="['icon--' + card.type]"></span>-->
                    <h2 class="card__figure__figcaption__info__location">{{ listing.contact.city }}</h2>
                    <h2 class="card__figure__figcaption__info__location">{{ listing.practical.type }}</h2>
                </div>
            </figcaption>
        </figure>
    </router-link>
</section>
</template>


<script>
    export default {
        data() {
            return {
                listings: {},
            }
        },
        created() {
            const listingsRef = firebase.database().ref('listings')

            return listingsRef.once('value', snapshot => {
                this.listings = snapshot.val()
            })
        },
    }

</script>
