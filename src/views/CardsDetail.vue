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
            <h4 style="margin: 20px 0 10px 0">Volzet?</h4>
            <p>{{ listingsDetail.practical.booked }}</p>
            <h4 style="margin: 20px 0 10px 0">Accomodatie</h4>
            <p v-if="listingsDetail.practical.accomodation.option01">Binnenpiste</p>
            <p v-if="listingsDetail.practical.accomodation.option02">Buitenpiste</p>
            <p v-if="listingsDetail.practical.accomodation.option03">Roundpen</p>
            <p v-if="listingsDetail.practical.accomodation.option04">Mogelijkheid tot weidegang</p>
            <p v-if="listingsDetail.practical.accomodation.option04Hours">{{ listingsDetail.practical.accomodation.option04Hours }}</p>
            <p v-if="listingsDetail.practical.accomodation.option05">Mogelijkheid tot samenstaan met andere paarden</p>
            <h4 style="margin: 20px 0 10px 0">Aanbod</h4>
            <p v-if="listingsDetail.practical.offer.option01">Groepslessen privé</p>
            <p v-if="listingsDetail.practical.offer.option02">Groepslessen manègepaarden</p>
            <p v-if="listingsDetail.practical.offer.option03">Privélessen</p>
            <p v-if="listingsDetail.practical.offer.option04">Mogelijkheid tot externe instructeur</p>
            <p v-if="listingsDetail.practical.offer.option05">Begeleide buitenritten</p>
            <p v-if="listingsDetail.practical.offer.option06">Kinderkampen</p>
            <p v-if="listingsDetail.practical.offer.option07">Erkende opleidingen</p>
            <p v-if="listingsDetail.practical.offer.option08">Training voor het paard</p>
            <p v-if="listingsDetail.practical.offer.option09">Clinics</p>
            <p v-if="listingsDetail.practical.offer.option10">Winkel</p>
            
            <h4 style="margin: 20px 0 10px 0">Discipline</h4>
            <p v-if="listingsDetail.practical.discipline.option01">Recreatie</p>
            <p v-if="listingsDetail.practical.discipline.option02">Dressuur</p>
            <p v-if="listingsDetail.practical.discipline.option03">Natural Horsemanship</p>
            <p v-if="listingsDetail.practical.discipline.option04">Fokkerij</p>
            <p v-if="listingsDetail.practical.discipline.option05">Trickriding</p>
            <p v-if="listingsDetail.practical.discipline.option06">Eventing</p>
            <p v-if="listingsDetail.practical.discipline.option07">Springen</p>
            <p v-if="listingsDetail.practical.discipline.option08">Western</p>
            <p v-if="listingsDetail.practical.discipline.option09">Academische rijkunst</p>
            <p v-if="listingsDetail.practical.discipline.option10">Voltige</p>
            <p v-if="listingsDetail.practical.discipline.option11">Endurance</p>
            <p v-if="listingsDetail.practical.discipline.option12">Mennen</p>
            <hr />
            
            <h3 style="margin-top: 20px">STAP 3 - EXTRA INFO</h3>   
            <h4 style="margin: 20px 0 10px 0">Food</h4>
            <p v-for="food in listingsDetail.extra_info.food">{{ food }}</p>
            <h4 style="margin: 20px 0 10px 0">Stable</h4>
            <h5 style="font-weight:bold">Cafetaria</h5>
            <p v-if="listingsDetail.extra_info.stable.cafetaria.option01">Sanitair</p>
            <p v-if="listingsDetail.extra_info.stable.cafetaria.option02">Mogelijkheid tot eten</p>
            <p v-if="listingsDetail.extra_info.stable.cafetaria.option03">Zelfbediening</p>
            <h5 style="font-weight:bold">Cleaning</h5>
            <p>{{ listingsDetail.extra_info.stable.cleaning }}</p>
            <h5 style="font-weight:bold">Floor</h5>
            <p v-if="listingsDetail.extra_info.stable.floor.option01">Stro</p>
            <p v-if="listingsDetail.extra_info.stable.floor.option02">Vlas</p>
            <p v-if="listingsDetail.extra_info.stable.floor.option03">Houtkrullen</p>
            <h5 style="font-weight:bold">Hygiene</h5>
            <p v-if="listingsDetail.extra_info.stable.hygiene.option01">Poetsplaats</p>
            <p v-if="listingsDetail.extra_info.stable.hygiene.option02">Wasplaats</p>
            <p v-if="listingsDetail.extra_info.stable.hygiene.option03">Solarium</p>
            <h5 style="font-weight:bold">Storage</h5>
            <p v-if="listingsDetail.extra_info.stable.storage.option01">Zadelkamer</p>
            <p v-if="listingsDetail.extra_info.stable.storage.option02">Zadelkast</p>
            <p v-if="listingsDetail.extra_info.stable.storage.option03">Verantwoordelijkheid van de klant</p>
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
    import {
        mapGetters
    } from 'vuex'
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
                        booked: null,
                        accomodation: {
                            option01: '',
                            option02: '',
                            option03: '',
                            option04: '',
                            option04Hours: '',
                            option05: ''
                        },
                        offer: {
                            option01: '',
                            option02: '',
                            option03: '',
                            option04: '',
                            option05: '',
                            option06: '',
                            option07: '',
                            option08: '',
                            option09: '',
                            option10: ''
                        },
                        discipline: {
                            option01: '',
                            option02: '',
                            option03: '',
                            option04: '',
                            option05: '',
                            option06: '',
                            option07: '',
                            option08: '',
                            option09: '',
                            option10: '',
                            option11: '',
                            option12: ''
                        }
                    },

                    // Extra Info
                    extra_info: {
                        food: {
                            food_a: null,
                            food_b: null
                        },
                        stable: {
                            cleaning: {
                                option01: '',
                                option02: ''
                            },
                            floor: {
                                option01: '',
                                option02: '',
                                option03: ''
                            },
                            hygiene: {
                                option01: '',
                                option02: '',
                                option03: ''
                            },
                            storage: {
                                option01: '',
                                option02: '',
                                option03: ''
                            },
                            cafetaria: {
                                option01: '',
                                option02: '',
                                option03: ''
                            }
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
                if (snapshot.exists()) {
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
                } else {
                    this.$router.push('/')
                    console.log('this listing does not exist')
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
