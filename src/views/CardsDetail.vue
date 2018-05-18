<template>
    <div>
        <section v-show="!editMode" class="cd">
            <header class="cd-block cd-header">
                <h1 class="cd-header__title">{{ listingsDetail.practical.type }}
                    <span class="cd-header__title__icon icon" v-bind:class="getIconType(listingsDetail.practical.type)"></span> 
                </h1>
            </header>   
             
            <section class="cd-intro"> 
                <div class="cd-block cd-contact">
                    <div class="cd-contact__item">
                        <div class="cd-contact__item__icon icon icon--location icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <p>{{ listingsDetail.contact.name }}</p>
                            <p>{{ listingsDetail.contact.address }}</p>
                            <p>{{ listingsDetail.contact.postalcode }} {{ listingsDetail.contact.city }}</p>
                        </div>
                    </div>
                    <div class="cd-contact__item">
                        <div class="cd-contact__item__icon icon icon--contact-2 icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <a class="text-link" :href="'mailto:' + listingsDetail.contact.email + '?subject=Mijn%20Paard%20Zoekt'">{{ listingsDetail.contact.email }}</a>
                        </div>
                    </div>
                    <div class="cd-contact__item" v-if="listingsDetail.contact.website">
                        <div class="cd-contact__item__icon icon icon--globe icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <a class="text-link" :href="'https://' + listingsDetail.contact.website" target="_blank">{{ listingsDetail.contact.website }}</a>
                        </div>
                    </div>
                    <div class="cd-contact__item" v-if="listingsDetail.contact.phone">
                        <div class="cd-contact__item__icon icon icon--phone icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <a class="text-link" :href="'tel:' + listingsDetail.contact.phone">{{ listingsDetail.contact.phone }}</a>
                        </div>
                    </div>
                    
                    <div class="cd-contact__item bg-5" v-if="getBooked(listingsDetail.practical.booked)">
                        <div class="cd-contact__item__icon icon icon--error icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <p>Sorry, wij zijn momenteel volzet.</p>
                        </div>
                    </div>
                    <div class="cd-contact__item bg-4" v-else>
                        <div class="cd-contact__item__icon icon icon--success icon--xxsmall"></div>
                        <div class="cd-contact__item__info">
                            <p>Wij hebben nog een plaatsje vrij!</p>
                        </div>
                    </div>
                </div>
                <div class="cd-block cd-gallery">
                    <div class="cd-gallery__items-container">
                        <div class="cd-gallery__items" ref="gallery">
                            <img class="cd-gallery__item" v-for="(image, index) in listingsDetail.images_url" :src="image" alt="">
                        </div>     
                    </div>
                    <div class="cd-gallery__trigger cd-gallery__trigger--prev" @click="galleryChange('left')">
                        <div class="icon icon--xxsmall icon--arrow"></div>
                    </div>
                    <div class="cd-gallery__trigger cd-gallery__trigger--next" @click="galleryChange('right')">
                        <div class="icon icon--xxsmall icon--arrow"></div>
                    </div>
                </div>
            </section>
            
            <section class="cd-listingdata">
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide1')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Accomodatie</h4>
                    </div>
                    <div class="cd-block__content" ref="slide1">
                        <h5 class="list-subtitle">Piste</h5>
                        <ul>
                            <li v-if="listingsDetail.practical.accomodation.option01">Binnenpiste</li>
                            <li v-if="listingsDetail.practical.accomodation.option02">Buitenpiste</li>
                            <li v-if="listingsDetail.practical.accomodation.option03">Roundpen</li>
                        </ul>
                        <h5 class="list-subtitle">Weidegang</h5>   
                        <ul>
                            <li v-if="listingsDetail.practical.accomodation.option04">Mogelijkheid tot weidegang ({{ listingsDetail.practical.accomodation.option04Hours }}u/dag)</li>
                            <li v-if="listingsDetail.practical.accomodation.option05">Mogelijkheid tot samenstaan met andere paarden</li>
                        </ul>
                        <h5 class="list-subtitle">Opberging</h5>
                        <ul>
                            <li v-if="listingsDetail.practical.accomodation.storage.option01">Zadelkamer</li>
                            <li v-if="listingsDetail.practical.accomodation.storage.option02">Zadelkast</li>
                            <li v-if="listingsDetail.practical.accomodation.storage.option03">Verantwoordelijkheid van de klant</li>
                        </ul>
                        <h5 class="list-subtitle">Verzorging</h5>
                        <ul>
                            <li v-if="listingsDetail.practical.accomodation.hygiene.option01">Poetsplaats</li>
                            <li v-if="listingsDetail.practical.accomodation.hygiene.option02">Wasplaats</li>
                            <li v-if="listingsDetail.practical.accomodation.hygiene.option03">Solarium</li>
                        </ul>
                        <h5 class="list-subtitle">Cafetaria</h5>
                        <ul>
                            <li v-if="listingsDetail.practical.accomodation.cafetaria.option01">Sanitair</li>
                            <li v-if="listingsDetail.practical.accomodation.cafetaria.option02">Mogelijkheid tot eten</li>
                            <li v-if="listingsDetail.practical.accomodation.cafetaria.option03">Zelfbediening</li>
                        </ul>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide2')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Aanbod</h4>
                    </div>
                    <div class="cd-block__content" ref="slide2">
                        <ul>
                            <li v-if="listingsDetail.practical.offer.option01">Groepslessen privé</li>
                            <li v-if="listingsDetail.practical.offer.option02">Groepslessen manègepaarden</li>
                            <li v-if="listingsDetail.practical.offer.option03">Privélessen</li>
                            <li v-if="listingsDetail.practical.offer.option04">Mogelijkheid tot externe instructeur</li>
                            <li v-if="listingsDetail.practical.offer.option05">Begeleide buitenritten</li>
                            <li v-if="listingsDetail.practical.offer.option06">Kinderkampen</li>
                            <li v-if="listingsDetail.practical.offer.option07">Erkende opleidingen</li>
                            <li v-if="listingsDetail.practical.offer.option08">Training voor het paard</li>
                            <li v-if="listingsDetail.practical.offer.option09">Clinics</li>
                            <li v-if="listingsDetail.practical.offer.option10">Winkel</li>
                        </ul>
                    </div>
                </div>

                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide3')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Discipline</h4>
                    </div>
                    <div class="cd-block__content" ref="slide3">
                        <div class="cd__list">
                            <ul>
                                <li v-if="listingsDetail.practical.discipline.option01">Recreatie</li>
                                <li v-if="listingsDetail.practical.discipline.option02">Dressuur</li>
                                <li v-if="listingsDetail.practical.discipline.option03">Natural Horsemanship</li>
                                <li v-if="listingsDetail.practical.discipline.option04">Fokkerij</li>
                                <li v-if="listingsDetail.practical.discipline.option05">Trickriding</li>
                                <li v-if="listingsDetail.practical.discipline.option06">Eventing</li>
                                <li v-if="listingsDetail.practical.discipline.option07">Springen</li>
                                <li v-if="listingsDetail.practical.discipline.option08">Western</li>
                                <li v-if="listingsDetail.practical.discipline.option09">Academische rijkunst</li>
                                <li v-if="listingsDetail.practical.discipline.option10">Voltige</li>
                                <li v-if="listingsDetail.practical.discipline.option11">Endurance</li>
                                <li v-if="listingsDetail.practical.discipline.option12">Mennen</li>
                            </ul>
                        </div>
                    </div>
                </div> 
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide4')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Voeder</h4>
                    </div>
                    <div class="cd-block__content" ref="slide4">
                        <h5 class="list-subtitle">Ruwvoeder</h5>
                        <ul>
                            <li>
                                {{ listingsDetail.extra_info.food.food_a }} 
                                <span v-if="!isNumber(listingsDetail.extra_info.food.food_a)">keer per dag</span>
                            </li>
                        </ul>
                        <h5 class="list-subtitle">Krachtvoeder</h5>
                        <ul>
                            <li>{{ listingsDetail.extra_info.food.food_b }}</li>
                        </ul>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide5')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Stalling</h4>
                    </div>  
                    <div class="cd-block__content" ref="slide5">
                        <h5 class="list-subtitle">Mest de klant zelf uit?</h5>
                        <ul>
                            <li>
                                {{ listingsDetail.extra_info.stable.cleaning }}
                                <span v-if="!isNumber(listingsDetail.extra_info.stable.cleaning)">keer per week</span>
                            </li>
                        </ul>
                        <h5 class="list-subtitle">Stalbedekking</h5>
                        <ul>
                            <li v-if="listingsDetail.extra_info.stable.floor.option01">Stro</li>
                            <li v-if="listingsDetail.extra_info.stable.floor.option02">Vlas</li>
                            <li v-if="listingsDetail.extra_info.stable.floor.option03">Houtkrullen</li>
                        </ul>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide6')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Andere info</h4>
                    </div>
                    <div class="cd-block__content" ref="slide6">
                        <p v-if="listingsDetail.extra_info.other.comments">{{ listingsDetail.extra_info.other.comments }}</p>
                        <div class="cd-social">
                            <a :href="listingsDetail.extra_info.other.facebook" class="cd-social__item icon icon--facebook icon--small" target="_blank" v-if="listingsDetail.extra_info.other.facebook"></a>
                            
                            <a :href="listingsDetail.extra_info.other.youtube" class="cd-social__item icon icon--youtube icon--small" target="_blank" v-if="listingsDetail.extra_info.other.youtube"></a>
                        </div>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title" @click="slideToggle('slide7')">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Beschikbaarheid</h4>
                    </div>
                    <div class="cd-block__content" ref="slide7">
                        <ul>
                            <li class="cd-availability" v-if="this.tm.monOpen">
                                <span class="cd-availability__day">Maandag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.monOpen)">{{ this.tm.monOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.monOpen)">{{ this.tm.monTime1 }} - {{ this.tm.monTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.tueOpen">
                                <span class="cd-availability__day">Dinsdag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.tueOpen)">{{ this.tm.tueOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.tueOpen)">{{ this.tm.tueTime1 }} - {{ this.tm.tueTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.wedOpen">
                                <span class="cd-availability__day">Woensdag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.wedOpen)">{{ this.tm.wedOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.wedOpen)">{{ this.tm.wedTime1 }} - {{ this.tm.wedTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.thuOpen">
                                <span class="cd-availability__day">Donderdag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.thuOpen)">{{ this.tm.thuOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.thuOpen)">{{ this.tm.thuTime1 }} - {{ this.tm.thuTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.friOpen">
                                <span class="cd-availability__day">Vrijdag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.friOpen)">{{ this.tm.friOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.friOpen)">{{ this.tm.friTime1 }} - {{ this.tm.friTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.satOpen">
                                <span class="cd-availability__day">Zaterdag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.satOpen)">{{ this.tm.satOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.satOpen)">{{ this.tm.satTime1 }} - {{ this.tm.satTime2 }}</span>
                            </li>
                            <li class="cd-availability" v-if="this.tm.sunOpen">
                                <span class="cd-availability__day">Zondag</span>
                                <span class="cd-availability__open" v-if="!isAvailabilityOpen(this.tm.sunOpen)">{{ this.tm.sunOpen }}</span>
                                <span class="cd-availability__time" v-if="isAvailabilityOpen(this.tm.sunOpen)">{{ this.tm.sunTime1 }} - {{ this.tm.sunTime2 }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <div class="form-progress__buttons">
                <button class="btn btn--edit btn--success" v-if="isListingCreator" @click="toggleEditMode">Wijzigen</button>
            </div>
        </section>
        <cards-detail-edit v-if="editMode" @cancelEdit="toggleEditMode" :listingsDetail="listingsDetail" class="cd-edit"></cards-detail-edit>
    </div>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    import CardsDetailEdit from './CardsDetailEdit'
    import slideToggle from '../mixins/slideToggle'

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
                            option05: '',

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

                galleryIndex: 1
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
                if (day === 'Open') {
                    return true
                } else {
                    return false
                }
            },
            isNumber(x) {
                return isNaN(x)
            },
            toggleEditMode() {
                this.editMode = !this.editMode
                window.scrollTo(0, 0)
            },
            getIconType(type) {
                if (type != null) {
                    return ('icon--' + type.replace(/\s+/g, '-').toLowerCase())
                }
            },
            getBooked(booked) {
                if (booked === 'Ja') {
                    return true
                } else if (booked === 'Nee') {
                    return false
                }
            },
            galleryChange(direction) {
                const galleryLength = this.listingsDetail.images_url.length
                const gallery = this.$refs.gallery

                if (direction === 'left') {
                    if (this.galleryIndex > 1) {
                        this.galleryIndex--
                    } else {
                        this.galleryIndex = galleryLength
                    }
                }
                if (direction === 'right') {
                    if (this.galleryIndex < galleryLength) {
                        this.galleryIndex++
                    } else {
                        this.galleryIndex = 1
                    }
                }
                
                gallery.style.transform = 'translateX(-' + ((this.galleryIndex - 1) * 100) + '%)'
            }
        },
        components: {
            CardsDetailEdit
        },
        mixins: [
            slideToggle
        ]
    }

</script>
