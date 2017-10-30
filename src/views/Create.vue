<template>
    <div>
        <h1 style="margin-bottom:20px;">Plaatsen</h1>
        
        <form id="form__create">
            <h3 style="margin-top: 20px">STAP 1 - CONTACT</h3>
            <div>
                <input type="text" name="name" placeholder="Naam" v-model="listingData.name">
            </div>
            <div>
                <input type="text" name="address" placeholder="Adres" v-model="listingData.address">
            </div>
            <div>
                <input type="number" name="postalcode" placeholder="Postcode" v-model.trim="listingData.postalcode">
            </div>
            <div>
                <input type="email" name="email" placeholder="E-mail adres" v-model.trim="listingData.email">
            </div>
            <div>
                <input type="text" name="phone" placeholder="Telefoonnummer" v-model.trim="listingData.phone">
            </div>
            <div>
                <input type="text" name="website" placeholder="Website" v-model.trim="listingData.website">
            </div>
            
            <h3 style="margin-top: 20px">STAP 2 - PRAKTISCH</h3>
            <h4 style="margin: 20px 0 10px 0">Type</h4>
            <div>
                <div>
                    <input type="radio" id="type_stalling" value="Stalling" v-model="listingData.type">
                    <label for="type_stalling">Stalling</label>
                </div>
                <div>
                    <input type="radio" id="type_weide" value="Weide" v-model="listingData.type">
                    <label for="type_weide">Weide</label>
                </div>
                <div>
                    <input type="radio" id="type_paddockparadise" value="Paddock Paradise" v-model="listingData.type">
                    <label for="type_paddockparadise">Paddock Paradise</label>
                </div>
            </div>
            
            
            <h4 style="margin: 20px 0 10px 0">Accomodatie</h4>
            <div>
                <div>
                    <input type="checkbox" id="accomodation_binnenpiste" value="Binnenpiste" v-model="listingData.accomodation">
                    <label for="accomodation_binnenpiste">Binnenpiste</label>
                </div>
                <div>
                    <input type="checkbox" id="accomodation_buitenpiste" value="Buitenpiste" v-model="listingData.accomodation">
                    <label for="accomodation_buitenpiste">Buitenpiste</label>
                </div>
                <div>
                    <input type="checkbox" id="accomodation_roundpen" value="Roundpen" v-model="listingData.accomodation">
                    <label for="accomodation_roundpen">Roundpen</label>
                </div>
                <div>
                    <input type="checkbox" id="accomodation_weidegang" value="Mogelijkheid tot weidegang" v-model="listingData.accomodation">
                    <label for="accomodation_weidegang">Mogelijkheid tot weidegang</label>
                </div>
                <div>
                    <input type="checkbox" id="accomodation_samenstaan" value="Mogelijkheid tot samenstaan met andere paarden" v-model="listingData.accomodation">
                    <label for="accomodation_samenstaan">Mogelijkheid tot samenstaan met andere paarden</label>
                </div>
            </div>
            
            
            <h4 style="margin: 20px 0 10px 0">Aanbod</h4>
            <div>
                <div>
                    <input type="checkbox" id="offer_groepslessen_prive" value="Groepslessen privé" v-model="listingData.offer">
                    <label for="offer_groepslessen_prive">Groepslessen privé</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_groepslessen_manegepaarden" value="Groepslessen manègepaarden" v-model="listingData.offer">
                    <label for="offer_groepslessen_manegepaarden">Groepslessen manègepaarden</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_privelessen" value="Privélessen" v-model="listingData.offer">
                    <label for="offer_privelessen">Privélessen</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_externe_instructeur" value="Mogelijkheid tot externe instructeur" v-model="listingData.offer">
                    <label for="offer_externe_instructeur">Mogelijkheid tot externe instructeur</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_begeleide_buitenritten" value="Begeleide buitenritten" v-model="listingData.offer">
                    <label for="offer_begeleide_buitenritten">Begeleide buitenritten</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_kinderkampen" value="Kinderkampen" v-model="listingData.offer">
                    <label for="offer_kinderkampen">Kinderkampen</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_erkende_opleidingen" value="Erkende opleidingen" v-model="listingData.offer">
                    <label for="offer_erkende_opleidingen">Erkende opleidingen</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_training_paard" value="Training voor het paard" v-model="listingData.offer">
                    <label for="offer_training_paard">Training voor het paard</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_clinics" value="Clinics" v-model="listingData.offer">
                    <label for="offer_clinics">Clinics</label>
                </div>
                <div>
                    <input type="checkbox" id="offer_winkel" value="Winkel" v-model="listingData.offer">
                    <label for="offer_winkel">Winkel</label>
                </div>
            </div>
            
            
            <h4 style="margin: 20px 0 10px 0">Discipline</h4>
            <div>
                <div>
                    <input type="checkbox" id="discipline_recreatie" value="Recreatie" v-model="listingData.discipline">
                    <label for="discipline_recreatie">Recreatie</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_dressuur" value="Dressuur" v-model="listingData.discipline">
                    <label for="discipline_dressuur">Dressuur</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_natural_horsemanship" value="Natural Horsemanship" v-model="listingData.discipline">
                    <label for="discipline_natural_horsemanship">Natural Horsemanship</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_fokkerij" value="Fokkerij" v-model="listingData.discipline">
                    <label for="discipline_fokkerij">Fokkerij</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_trickriding" value="Trickriding" v-model="listingData.discipline">
                    <label for="discipline_trickriding">Trickriding</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_eventing" value="Eventing" v-model="listingData.discipline">
                    <label for="discipline_eventing">Eventing</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_springen" value="Springen" v-model="listingData.discipline">
                    <label for="discipline_springen">Springen</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_western" value="Western" v-model="listingData.discipline">
                    <label for="discipline_western">Western</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_academische_rijkunst" value="Academische rijkunst" v-model="listingData.discipline">
                    <label for="discipline_academische_rijkunst">Academische rijkunst</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_voltige" value="Voltige" v-model="listingData.discipline">
                    <label for="discipline_voltige">Voltige</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_endurance" value="Endurance" v-model="listingData.discipline">
                    <label for="discipline_endurance">Endurance</label>
                </div>
                <div>
                    <input type="checkbox" id="discipline_mennen" value="Mennen" v-model="listingData.discipline">
                    <label for="discipline_mennen">Mennen</label>
                </div>
            </div>
            
            
            <h3 style="margin-top: 20px">STAP 3 - EXTRA INFO</h3>
            <h4 style="margin: 20px 0 10px 0">Voeder</h4>
            <h5 style="margin-top: 20px">Ruwvoeder</h5>
            <div>
                <div>
                    <input type="radio" id="food_food_a_food_a1" name="foodOptions" value="24/7" v-model="listingData.food.food_a">
                    <label for="food_food_a_food_a1">24/7</label>
                </div>
                <div>
                    <input type="radio" id="food_food_a_food_a2" name="foodOptions" :value="listingData.food.food_a" v-on:click="listingData.food.food_a = $event.currentTarget.nextElementSibling.firstChild.value">
                    <label for="food_food_a_food_a2">
                        <input type="number" min="1" value="1" @input="listingData.food.food_a = $event.target.value" v-on:click="setCheckedFoodA" v-on:keyup="checkNumber">/dag
                    </label>
                </div>
                <div>
                    <input type="radio" id="food_food_a_food_a3" name="foodOptions" value="Verantwoordelijkheid van de klant" v-model="listingData.food.food_a">
                    <label for="food_food_a_food_a3">Verantwoordelijkheid van de klant</label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Krachtvoer</h5>
            <div>
                <div>
                    <input type="radio" id="food_food_b_food_b1" value="Keuze van de klant" v-model="listingData.food.food_b">
                    <label for="food_food_b_food_b1">Keuze van de klant</label>
                </div>
                <div>
                    <input type="radio" id="food_b2" value="Nee" v-model="listingData.food.food_b">
                    <label for="food_b2">Nee</label>
                </div>
            </div>
            <h4 style="margin: 20px 0 10px 0">Stalling</h4>
            <div>
                <h5 style="margin-top: 20px;">Mest de klant zelf uit?</h5>
                <div>
                    <input type="radio" id="stable_cleaning_cleaning_a" name="cleaningOptions" value="Nee" v-model="listingData.stable.cleaning">
                    <label for="stable_cleaning_cleaning_a">Nee</label>
                </div>
                <div>
                    <input type="radio" id="stable_cleaning_cleaning_b" name="cleaningOptions" v-on:click="listingData.stable.cleaning = $event.currentTarget.nextElementSibling.firstChild.value">
                    <label for="stable_cleaning_cleaning_b">
                        <input type="number" min="1" value="1" @input="listingData.stable.cleaning = $event.target.value" v-on:click="setCheckedStable" v-on:keyup="checkNumber">/week
                    </label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Stalbedekking</h5>
            <div>
                <div>
                    <input type="checkbox" id="stable_floor_stro" value="Stro" v-model="listingData.stable.floor">
                    <label for="stable_floor_stro">Stro</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_floor_vlas" value="Vlas" v-model="listingData.stable.floor">
                    <label for="stable_floor_vlas">Vlas</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_floor_houtkrullen" value="Houtkrullen" v-model="listingData.stable.floor">
                    <label for="stable_floor_houtkrullen">Houtkrullen</label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Verzorging</h5>
            <div>
                <div>
                    <input type="checkbox" id="stable_hygiene_poetsplaats" value="Poetsplaats" v-model="listingData.stable.hygiene">
                    <label for="stable_hygiene_poetsplaats">Poetsplaats</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_hygiene_wasplaats" value="Wasplaats" v-model="listingData.stable.hygiene">
                    <label for="stable_hygiene_wasplaats">Wasplaats</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_hygiene_solarium" value="Solarium" v-model="listingData.stable.hygiene">
                    <label for="stable_hygiene_solarium">Solarium</label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Opberging</h5>
            <div>
                <div>
                    <input type="checkbox" id="stable_storage_zadelkamer" value="Zadelkamer" v-model="listingData.stable.storage">
                    <label for="stable_storage_zadelkamer">Zadelkamer</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_storage_zadelrek" value="Zadelrek" v-model="listingData.stable.storage">
                    <label for="stable_storage_zadelrek">Zadelrek</label>
                </div>
                <div>
                    <input type="checkbox" id="stable_storage_vvdklant" value="Verantwoordelijkheid van de klant" v-model="listingData.stable.storage">
                    <label for="stable_storage_vvdklant">Verantwoordelijkheid van de klant</label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Cafetaria</h5>
            <div>
                <div>
                    <input type="checkbox" id="cafetaria_sanitair" value="Sanitair" v-model="listingData.stable.cafetaria">
                    <label for="cafetaria_sanitair">Sanitair</label>
                </div>
                <div>
                    <input type="checkbox" id="cafetaria_food" value="Mogelijkheid tot eten" v-model="listingData.stable.cafetaria">
                    <label for="cafetaria_food">Mogelijkheid tot eten</label>
                </div>
                <div>
                    <input type="checkbox" id="cafetaria_zelfbediening" value="Zelfbediening" v-model="listingData.stable.cafetaria">
                    <label for="cafetaria_zelfbediening">Zelfbediening</label>
                </div>
            </div>
            <h5 style="margin-top: 20px;">Extra info</h5>
            <div>
                <textarea id="extra_info" rows="4" v-model="listingData.extra_info"></textarea>
            </div>
            <h4 style="margin: 20px 0 10px 0">YOUTUBE</h4>
            <h4 style="margin: 20px 0 10px 0">FOTO'S</h4>
            <div>
                <div v-for="(imageUrl, index) in temporaryImages">
                    <img :src="imageUrl" height="100"> <span v-on:click="removeImage">DELETE</span>
                </div>
            </div>
            <progress id="upload-progress" value="0" max="100">0%</progress>
            <input id="upload-choose" type="file" accept="image/x-png,image/jpeg" value="upload" v-on:change="getImageAndResize" multiple>
            
            
            <div>
                <input type="submit" value="Plaatsen" v-on:click.prevent="submitCreateForm">
            </div>
        </form>
        <div v-if="hasErrors">
            <p v-for="error in errors">{{ error }}</p>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: 'create',

        data() {
            return {
                errors: [],
                listingData: {
                    // Contact data
                    name: '',
                    address: '',
                    postalcode: '',
                    email: '',
                    phone: '',
                    website: '',
                    socialmedia: {},

                    // Practical Data
                    type: [],
                    accomodation: [],
                    offer: [],
                    discipline: [],

                    // Extra Info
                    food: {
                        food_a: [],
                        food_b: []
                    },
                    stable: {
                        cleaning: [],
                        floor: [],
                        hygiene: [],
                        storage: [],
                        cafetaria: []
                    },
                    extra_info: '',
                    availability: '',
                    images_url: []
                },
                // Storage
                uploadedImages: [],

                // Temporary
                temporaryImages: [],

                // Firebase
                listingPostKey: '',
                listingRef: ''
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            },
            ...mapGetters(['currentUser'])
        },
        methods: {
            resetCreateForm() {
                // Reset data object to initial values
                Object.assign(this.$data, this.$options.data.call(this))
                // Reset form 
                document.getElementById("form__create").reset()
                console.log("Form has been reset")
            },
            submitCreateForm() {
                this.errors = []

                if (this.isFormValid()) {
                    console.log("Posting...")
                    const user = firebase.auth().currentUser
                    const listingPostKey = firebase.database().ref('listings/').push().key
                    const listingRef = firebase.database().ref('listings/' + listingPostKey)

                    this.listingPostKey = listingPostKey
                    this.listingRef = listingRef

                    // Map uploadedImages to array of uploadTasks (promises)
                    const uploads = this.uploadedImages.map((uploadedImage, index) => {
                        // Rename the images
                        let newImageName = this.listingPostKey + index + '.jpg'

                        // Create a storage reference and an upload task to that reference
                        const storageRef = firebase.storage().ref('images/' + user.uid + '/' + newImageName)
                        const uploadTask = storageRef.put(uploadedImage)
                        console.log("image " + index + " uploaded")

                        return uploadTask.then(snapshot => {
                            this.listingData.images_url.push(snapshot.downloadURL)
                        })
                    })

                    // Wait for all uploadTasks to be done
                    Promise.all(uploads).then(() => {
                        this.createListing()
                    })
                }
            },
            createListing() {
                this.errors = []
                const user = firebase.auth().currentUser

                return this.listingRef.update(this.listingData).then(() => {
                    console.log("Posting complete")
                    this.resetCreateForm()
                }, error => {
                    console.log(error.message)
                    this.errors.push(error.message)
                })
            },
            isEmpty() {
                if (
                    this.listingData.name.length == 0 ||
                    this.listingData.address.length == 0 ||
                    this.listingData.postalcode.length == 0 ||
                    this.listingData.email.length == 0 ||
                    this.listingData.type.length == 0 ||
                    this.listingData.food.food_a.length == 0 ||
                    this.listingData.food.food_b.length == 0 ||
                    this.listingData.stable.cleaning.length == 0 ||
                    this.uploadedImages.length == 0
                ) {
                    return true
                }
                return false
            },
            isFormValid() {
                if (this.isEmpty()) {
                    this.errors.push('Please fill in all required fields')
                    return false
                }
                return true
            },
            setCheckedStable(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingData.stable.cleaning = event.target.value
            },
            setCheckedFoodA(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingData.food.food_a = event.target.value
            },
            checkNumber(event) {
                let inputValue = event.currentTarget
                if (inputValue.value < 1) {
                    inputValue.value = 1
                }
            },
            getImageAndResize() {
                const user = firebase.auth().currentUser
                this.errors = []

                // Get images and push to array if amount does not exceed 5
                let images = event.currentTarget.files
                let sumImages = images.length + this.uploadedImages.length

                if (images.length <= 5 && sumImages <= 5) {
                    for (let i = 0; i < images.length; i++) {
                        if (images[i].name.lastIndexOf('.') <= 0) {
                            this.errors.push('"' + images[i].name + '" does not have a valid file extension')
                        } else {
                            // Get dataURL of added images and push to temporary array
                            const fileReader = new FileReader()
                            fileReader.addEventListener('load', () => {
                                this.temporaryImages.push(fileReader.result)
                            })
                            fileReader.readAsDataURL(images[i])

                            // Resize the image
                            this.resizeImage({
                                file: images[i],
                                maxSize: 500
                            }).then((resizedImage) => {
                                resizedImage.lastModifiedDate = new Date()
                                resizedImage.name = images[i].name

                                // Push images to array
                                this.uploadedImages.push(resizedImage)
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }
                } else {
                    this.errors.push("You can only upload a maximum of 5 images")
                }
            },
            removeImage(event) {
                this.errors = []
                // Get index of parent container
                const imageContainer = event.currentTarget.parentNode
                const thisIndex = this.indexInParent(imageContainer)

                // Remove image from arrays
                if (thisIndex > -1) {
                    this.temporaryImages.splice(thisIndex, 1)
                    this.uploadedImages.splice(thisIndex, 1)
                }
            },
            indexInParent(node) {
                let children = node.parentNode.childNodes
                let num = 0
                for (let i = 0; i < children.length; i++) {
                    if (children[i] == node) return num
                    if (children[i].nodeType == 1) num++
                }
                return -1
            },
            resizeImage(settings) {
                var file = settings.file
                var maxSize = settings.maxSize
                var reader = new FileReader()
                var image = new Image()
                var canvas = document.createElement('canvas')
                var dataURItoBlob = (dataURI) => {
                    var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                        atob(dataURI.split(',')[1]) :
                        unescape(dataURI.split(',')[1])
                    var mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
                    var max = bytes.length
                    var ia = new Uint8Array(max)
                    for (var i = 0; i < max; i++)
                        ia[i] = bytes.charCodeAt(i)
                    return new Blob([ia], {
                        type: mime
                    });
                };
                var resize = () => {
                    var width = image.width
                    var height = image.height
                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width
                            width = maxSize
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height
                            height = maxSize
                        }
                    }
                    canvas.width = width
                    canvas.height = height
                    canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                    var dataUrl = canvas.toDataURL('image/jpeg')
                    return dataURItoBlob(dataUrl)
                };
                return new Promise((ok, no) => {
                    if (!file.type.match(/image.*/)) {
                        no(new Error("Not an image"))
                        return
                    }
                    reader.onload = (readerEvent) => {
                        image.onload = () => {
                            return ok(resize())
                        }
                        image.src = readerEvent.target.result
                    }
                    reader.readAsDataURL(file)
                })
            }
        }
    }

</script>
