<template>
<section class="cards">
    <router-link :to="{ name: 'listingdetail', params: { listingKey: index }}" v-for="(listing, index) in listings" :key="index" class="card">
        <figure class="card__figure">
            <img class="card__figure__image" :src="listing.images_url[0]" alt="">
            <figcaption class="card__figure__figcaption">
                <div class="card__figure__figcaption__info">
                    <div class="card__figure__figcaption__info__location">{{ listing.contact.city }}</div>
                    <div class="card__figure__figcaption__info__type">
                        <div class="card__figure__figcaption__info__type__icon icon" v-bind:class="getIconType(listing.practical.type)"></div>
                        <div class="card__figure__figcaption__info__type__label">{{ listing.practical.type }}</div>
                    </div>
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
                newType: ''
            }
        },
        created() {
            const listingsRef = firebase.database().ref('listings')

            return listingsRef.once('value', snapshot => {
                this.listings = snapshot.val()
            })
        },
        methods: {
            getIconType(type) {
                return ('icon--' + type.replace(/\s+/g, '-').toLowerCase())
            }
        }
    }

</script>
