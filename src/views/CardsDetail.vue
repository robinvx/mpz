<template>
    <div>
        <div v-show="!editMode">
            <h1> {{ listingsDetail.contact.name }}</h1>
            <hr />
            
            <h3 style="margin-top: 20px">STAP 1 - CONTACT</h3>  
            <p>Name: {{ listingsDetail.contact.name }}</p>
            <p>Address: {{ listingsDetail.contact.address }}</p>
            <p>Location: {{ listingsDetail.contact.postalcode }} - {{ listingsDetail.contact.city }}</p>
            <p>Email: {{ listingsDetail.contact.email }}</p>
            <p>Phone: {{ listingsDetail.contact.phone }}</p>
            <p>Website: {{ listingsDetail.contact.website }}</p>
            <hr />
            
            <h3 style="margin-top: 20px">STAP 2 - PRAKTISCH</h3>
            <h4 style="margin: 20px 0 10px 0">Type</h4>
            <p>{{ listingsDetail.practical.type }}</p>
            <h4 style="margin: 20px 0 10px 0">Accomodatie</h4>
            <p v-for="accomodation in listingsDetail.practical.accomodation">{{ accomodation }}</p>
            <h4 style="margin: 20px 0 10px 0">Aanbod</h4>
            <p v-for="offer in listingsDetail.practical.offer">{{ offer }}</p>
            <h4 style="margin: 20px 0 10px 0">Discipline</h4>
            <p v-for="discipline in listingsDetail.practical.discipline">{{ discipline }}</p>  
            <hr />
            
            <h3 style="margin-top: 20px">STAP 3 - EXTRA INFO</h3>   
            <h4 style="margin: 20px 0 10px 0">Food</h4>
            <p v-for="food in listingsDetail.extra_info.food">{{ food }}</p>
            <h4 style="margin: 20px 0 10px 0">Stable</h4>
            <h5 style="font-weight:bold">Cafetaria</h5>
            <p v-for="stableCafetaria in listingsDetail.extra_info.stable.cafetaria">{{ stableCafetaria }}</p>
            <h5 style="font-weight:bold">Cleaning</h5>
            <p>{{ listingsDetail.extra_info.stable.cleaning }}</p>
            <h5 style="font-weight:bold">Floor</h5>
            <p v-for="stableFloor in listingsDetail.extra_info.stable.floor">{{ stableFloor }}</p>
            <h5 style="font-weight:bold">Hygiene</h5>
            <p v-for="stableHygiene in listingsDetail.extra_info.stable.hygiene">{{ stableHygiene }}</p>
            <h5 style="font-weight:bold">Storage</h5>
            <p v-for="stableStorage in listingsDetail.extra_info.stable.storage">{{ stableStorage }}</p>
            <h4 style="margin: 20px 0 10px 0">Other</h4>
            <p v-for="other in listingsDetail.extra_info.other">{{ other }}</p>
            <h4 style="margin: 20px 0 10px 0">Availability</h4>
            <div v-if="this.tm.monOpen">
                <p>Monday:</p>
                <span>{{ this.tm.monOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.monOpen)">:{{ this.tm.monTime1 }} - {{ this.tm.monTime2 }}</span>
            </div>
            <div v-if="this.tm.tueOpen">
                <p>Tuesday:</p>
                <span>{{ this.tm.tueOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.tueOpen)">:{{ this.tm.tueTime1 }} - {{ this.tm.tueTime2 }}</span>
            </div>
            <div v-if="this.tm.wedOpen">
                <p>Wednesday:</p>
                <span>{{ this.tm.wedOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.wedOpen)">:{{ this.tm.wedTime1 }} - {{ this.tm.wedTime2 }}</span>
            </div>
            <div v-if="this.tm.thuOpen">
                <p>Thursday:</p>
                <span>{{ this.tm.thuOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.thuOpen)">:{{ this.tm.thuTime1 }} - {{ this.tm.thuTime2 }}</span>
            </div>
            <div v-if="this.tm.friOpen">
                <p>Friday:</p>
                <span>{{ this.tm.friOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.friOpen)">:{{ this.tm.friTime1 }} - {{ this.tm.friTime2 }}</span>
            </div>
            <div v-if="this.tm.satOpen">
                <p>Saturday:</p>
                <span>{{ this.tm.satOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.satOpen)">:{{ this.tm.satTime1 }} - {{ this.tm.satTime2 }}</span>
            </div>
            <div v-if="this.tm.sunOpen">
                <p>Sunday:</p>
                <span>{{ this.tm.sunOpen }}</span>
                <span v-if="isAvailabilityOpen(this.tm.sunOpen)">:{{ this.tm.sunTime1 }} - {{ this.tm.sunTime2 }}</span>
            </div>
            <hr />
            
            <img v-for="(image, index) in listingsDetail.images_url" :src="image" alt=""> 
            <h2 v-if="isListingCreator" @click="toggleEditMode">EDIT</h2>
        </div>
        <cards-detail-edit v-if="editMode" @cancelEdit="toggleEditMode" :listingsDetail="listingsDetail"></cards-detail-edit>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex'
    import CardsDetailEdit from './CardsDetailEdit'

    export default {
        data() {
            return {
                editMode: false,
                isListingCreator: false,
                tm: {
                    monOpen: '',
                    monTime1: '',
                    monTime2: '',
                    tueOpen: '',
                    tueTime1: '',
                    tueTime2: '',
                    wedOpen: '',
                    wedTime1: '',
                    wedTime2: '',
                    thuOpen: '',
                    thuTime1: '',
                    thuTime2: '',
                    friOpen: '',
                    friTime1: '',
                    friTime2: '',
                    satOpen: '',
                    satTime1: '',
                    satTime2: '',
                    sunOpen: '',
                    sunTime1: '',
                    sunTime2: ''
                },
                listingsDetail: {
                    // User ID
                    userId: '',
                    // Contact data
                    contact: {
                        name: null,
                        address: null,
                        postalcode: null,
                        city: null,
                        email: null,
                        phone: null,
                        website: null
                    },

                    // Practical Data
                    practical: {
                        type: null,
                        accomodation: null,
                        accomodationhours: null,
                        offer: null,
                        discipline: null
                    },

                    // Extra Info
                    extra_info: {
                        food: {
                            food_a: null,
                            food_b: null
                        },
                        stable: {
                            cleaning: null,
                            floor: null,
                            hygiene: null,
                            storage: null,
                            cafetaria: null
                        },
                        other: {
                            comments: null,
                            youtube: null,
                            facebook: null
                        },
                        availability: {
                            mon: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            tue: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            wed: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            thu: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            fri: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            sat: {
                                open: null,
                                time1: null,
                                time2: null
                            },
                            sun: {
                                open: null,
                                time1: null,
                                time2: null
                            }
                        }
                    },

                    images_url: null
                },
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        created() {
            const listingsDetailRef = firebase.database().ref('listings/' + this.$route.params.listingKey)

            return listingsDetailRef.once('value', snapshot => {
                this.listingsDetail = snapshot.val()
                
                // SET Timings for ease of use in HTML
                this.tm.monOpen = this.listingsDetail.extra_info.availability.mon.open,
                    this.tm.monTime1 = this.listingsDetail.extra_info.availability.mon.time1,
                    this.tm.monTime2 = this.listingsDetail.extra_info.availability.mon.time2,
                    this.tm.tueOpen = this.listingsDetail.extra_info.availability.tue.open,
                    this.tm.tueTime1 = this.listingsDetail.extra_info.availability.tue.time1,
                    this.tm.tueTime2 = this.listingsDetail.extra_info.availability.tue.time2,
                    this.tm.wedOpen = this.listingsDetail.extra_info.availability.wed.open,
                    this.tm.wedTime1 = this.listingsDetail.extra_info.availability.wed.time1,
                    this.tm.wedTime2 = this.listingsDetail.extra_info.availability.wed.time2,
                    this.tm.thuOpen = this.listingsDetail.extra_info.availability.thu.open,
                    this.tm.thuTime1 = this.listingsDetail.extra_info.availability.thu.time1,
                    this.tm.thuTime2 = this.listingsDetail.extra_info.availability.thu.time2,
                    this.tm.friOpen = this.listingsDetail.extra_info.availability.fri.open,
                    this.tm.friTime1 = this.listingsDetail.extra_info.availability.fri.time1,
                    this.tm.friTime2 = this.listingsDetail.extra_info.availability.fri.time2,
                    this.tm.satOpen = this.listingsDetail.extra_info.availability.sat.open,
                    this.tm.satTime1 = this.listingsDetail.extra_info.availability.sat.time1,
                    this.tm.satTime2 = this.listingsDetail.extra_info.availability.sat.time2,
                    this.tm.sunOpen = this.listingsDetail.extra_info.availability.sun.open,
                    this.tm.sunTime1 = this.listingsDetail.extra_info.availability.sun.time1,
                    this.tm.sunTime2 = this.listingsDetail.extra_info.availability.sun.time2
                if (this.isLoggedIn) {
                    const userId = firebase.auth().currentUser.uid
                    if (this.listingsDetail.userId === userId) {
                        this.isListingCreator = true
                    }
                }
            })
        },
        methods: {
            isAvailabilityOpen(day) {
                if (day === "Open") {
                    return true
                } else {
                    return false
                }
            },
            toggleEditMode() {
                this.editMode = !this.editMode
            }
        },
        components: {
            CardsDetailEdit
        }
    }

</script>
