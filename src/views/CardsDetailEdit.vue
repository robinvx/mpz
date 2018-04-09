<template>
    <section>
        <div class="form-progress">
            <div class="form-progress__list">
                <div class="form-progress__item" 
                     v-for="(value, key, index) in formProgressSteps" 
                     @click="formProgressChangeStep(index)"
                >
                    <div class="form-progress__label" :class="{ active: formProgressActive(index) }">{{ value }}</div>    
                    <div class="form-progress__circle" :class="{ active: formProgressActive(index) }"></div>    
                </div>
            </div>
        </div>
        <form id="form__edit">
            <div v-show="formProgressCurrentStep === 1">
                <div class="input-field">
                    <input type="text" name="name" v-model="listingsDetail.contact.name" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="name">Naam</label>
                </div>
                <div class="input-field">
                    <input type="text" name="address" v-model="listingsDetail.contact.address" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="address">Adres</label>
                </div>
                
                <autocomplete :options="options" :autofill="autofillPostalCodeAndCity" v-on:autocomplete="setPostalcodeAndCity"></autocomplete>
                
                <div class="input-field">
                    <input type="email" name="email" v-model.trim="listingsDetail.contact.email" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="email">E-mail</label>
                </div>
                <div class="input-field">
                    <input type="text" name="phone" v-model.trim="listingsDetail.contact.phone" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="phone">Telefoonnummer</label>
                </div>
                <div class="input-field">
                    <input type="text" name="website" v-model.trim="listingsDetail.contact.website" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="website">Website</label>
                </div>
            </div>
            <div v-show="formProgressCurrentStep === 2">
                <h3 style="margin-top: 20px">STAP 2 - PRAKTISCH</h3>
                <h4 style="margin: 20px 0 10px 0">Type</h4>
                <div>
                    <div>
                        <input type="radio" id="type_stalling" value="Stalling" v-model="listingsDetail.practical.type">
                        <label for="type_stalling">Stalling</label>
                    </div>
                    <div>
                        <input type="radio" id="type_weide" value="Weide" v-model="listingsDetail.practical.type">
                        <label for="type_weide">Weide</label>
                    </div>
                    <div>
                        <input type="radio" id="type_paddockparadise" value="Paddock Paradise" v-model="listingsDetail.practical.type">
                        <label for="type_paddockparadise">Paddock Paradise</label>
                    </div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0">Beschikbaarheid</h4>
                <h5 style="margin-top: 20px">Volzet?</h5>
                <div>
                    <div>
                        <input type="radio" id="booked_yes" value="Ja" v-model="listingsDetail.practical.booked">
                        <label for="booked_yes">Ja</label>
                    </div>
                    <div>
                        <input type="radio" id="booked_no" value="Nee" v-model="listingsDetail.practical.booked">
                        <label for="booked_no">Neen, wij hebben nog een plaatsje vrij!</label>
                    </div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0">Accomodatie</h4>
                <h5 style="margin-top: 20px;">Piste</h5>
                <div>
                    <div>
                        <input type="checkbox" id="accomodation_binnenpiste" class="accomodation" value="Binnenpiste" v-model="listingsDetail.practical.accomodation.option01">
                        <label for="accomodation_binnenpiste">Binnenpiste</label>
                    </div>
                    <div>
                        <input type="checkbox" id="accomodation_buitenpiste" class="accomodation" value="Buitenpiste" v-model="listingsDetail.practical.accomodation.option02">
                        <label for="accomodation_buitenpiste">Buitenpiste</label>
                    </div>
                    <div>
                        <input type="checkbox" id="accomodation_roundpen" class="accomodation" value="Roundpen" v-model="listingsDetail.practical.accomodation.option03">
                        <label for="accomodation_roundpen">Roundpen</label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Weidegang</h5>
                <div>
                    <div>
                        <input type="checkbox" id="accomodation_weidegang" value="Mogelijkheid tot weidegang" v-model="listingsDetail.practical.accomodation.option04" @click="toggleWeidegang">
                        <label for="accomodation_weidegang">Mogelijkheid tot weidegang</label>   
                                 
                        <div v-show="weidegangChecked">
                            <input type="number" id="accomodation_weidegang_hours" min="1" max="24" value="1" v-on:keyup="checkHour" v-model="listingsDetail.practical.accomodation.option04Hours">
                            <label for="accomodation_weidegang_hours">uur/dag</label>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" id="accomodation_samenstaan" class="accomodation" value="Mogelijkheid tot samenstaan met andere paarden" v-model="listingsDetail.practical.accomodation.option05">
                        <label for="accomodation_samenstaan">Mogelijkheid tot samenstaan met andere paarden</label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Opberging</h5>
                <div>
                    <div>
                        <input type="checkbox" id="stable_storage_zadelkamer" value="Zadelkamer" v-model="listingsDetail.practical.accomodation.storage.option01">
                        <label for="stable_storage_zadelkamer">Zadelkamer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_storage_zadelkast" value="Zadelkast" v-model="listingsDetail.practical.accomodation.storage.option02">
                        <label for="stable_storage_zadelkast">Zadelkast</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_storage_vvdklant" value="Verantwoordelijkheid van de klant" v-model="listingsDetail.practical.accomodation.storage.option03">
                        <label for="stable_storage_vvdklant">Verantwoordelijkheid van de klant</label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Verzorging</h5>
                <div>
                    <div>
                        <input type="checkbox" id="stable_hygiene_poetsplaats" value="Poetsplaats" v-model="listingsDetail.practical.accomodation.hygiene.option01">
                        <label for="stable_hygiene_poetsplaats">Poetsplaats</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_hygiene_wasplaats" value="Wasplaats" v-model="listingsDetail.practical.accomodation.hygiene.option02">
                        <label for="stable_hygiene_wasplaats">Wasplaats</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_hygiene_solarium" value="Solarium" v-model="listingsDetail.practical.accomodation.hygiene.option03">
                        <label for="stable_hygiene_solarium">Solarium</label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Cafetaria</h5>
                <div>
                    <div>
                        <input type="checkbox" id="cafetaria_sanitair" value="Sanitair" v-model="listingsDetail.practical.accomodation.cafetaria.option01">
                        <label for="cafetaria_sanitair">Sanitair</label>
                    </div>
                    <div>
                        <input type="checkbox" id="cafetaria_food" value="Mogelijkheid tot eten" v-model="listingsDetail.practical.accomodation.cafetaria.option02">
                        <label for="cafetaria_food">Mogelijkheid tot eten</label>
                    </div>
                    <div>
                        <input type="checkbox" id="cafetaria_zelfbediening" value="Zelfbediening" v-model="listingsDetail.practical.accomodation.cafetaria.option03">
                        <label for="cafetaria_zelfbediening">Zelfbediening</label>
                    </div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0">Aanbod</h4>
                <div>
                    <div>
                        <input type="checkbox" id="offer_groepslessen_prive" value="Groepslessen privé" v-model="listingsDetail.practical.offer.option01">
                        <label for="offer_groepslessen_prive">Groepslessen privé</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_groepslessen_manegepaarden" value="Groepslessen manègepaarden" v-model="listingsDetail.practical.offer.option02">
                        <label for="offer_groepslessen_manegepaarden">Groepslessen manègepaarden</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_privelessen" value="Privélessen" v-model="listingsDetail.practical.offer.option03">
                        <label for="offer_privelessen">Privélessen</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_externe_instructeur" value="Mogelijkheid tot externe instructeur" v-model="listingsDetail.practical.offer.option04">
                        <label for="offer_externe_instructeur">Mogelijkheid tot externe instructeur</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_begeleide_buitenritten" value="Begeleide buitenritten" v-model="listingsDetail.practical.offer.option05">
                        <label for="offer_begeleide_buitenritten">Begeleide buitenritten</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_kinderkampen" value="Kinderkampen" v-model="listingsDetail.practical.offer.option06">
                        <label for="offer_kinderkampen">Kinderkampen</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_erkende_opleidingen" value="Erkende opleidingen" v-model="listingsDetail.practical.offer.option07">
                        <label for="offer_erkende_opleidingen">Erkende opleidingen</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_training_paard" value="Training voor het paard" v-model="listingsDetail.practical.offer.option08">
                        <label for="offer_training_paard">Training voor het paard</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_clinics" value="Clinics" v-model="listingsDetail.practical.offer.option09">
                        <label for="offer_clinics">Clinics</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offer_winkel" value="Winkel" v-model="listingsDetail.practical.offer.option10">
                        <label for="offer_winkel">Winkel</label>
                    </div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0">Discipline</h4>
                <div>
                    <div>
                        <input type="checkbox" id="discipline_recreatie" value="Recreatie" v-model="listingsDetail.practical.discipline.option01">
                        <label for="discipline_recreatie">Recreatie</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_dressuur" value="Dressuur" v-model="listingsDetail.practical.discipline.option02">
                        <label for="discipline_dressuur">Dressuur</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_natural_horsemanship" value="Natural Horsemanship" v-model="listingsDetail.practical.discipline.option03">
                        <label for="discipline_natural_horsemanship">Natural Horsemanship</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_fokkerij" value="Fokkerij" v-model="listingsDetail.practical.discipline.option04">
                        <label for="discipline_fokkerij">Fokkerij</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_trickriding" value="Trickriding" v-model="listingsDetail.practical.discipline.option05">
                        <label for="discipline_trickriding">Trickriding</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_eventing" value="Eventing" v-model="listingsDetail.practical.discipline.option06">
                        <label for="discipline_eventing">Eventing</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_springen" value="Springen" v-model="listingsDetail.practical.discipline.option07">
                        <label for="discipline_springen">Springen</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_western" value="Western" v-model="listingsDetail.practical.discipline.option08">
                        <label for="discipline_western">Western</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_academische_rijkunst" value="Academische rijkunst" v-model="listingsDetail.practical.discipline.option09">
                        <label for="discipline_academische_rijkunst">Academische rijkunst</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_voltige" value="Voltige" v-model="listingsDetail.practical.discipline.option10">
                        <label for="discipline_voltige">Voltige</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_endurance" value="Endurance" v-model="listingsDetail.practical.discipline.option11">
                        <label for="discipline_endurance">Endurance</label>
                    </div>
                    <div>
                        <input type="checkbox" id="discipline_mennen" value="Mennen" v-model="listingsDetail.practical.discipline.option12">
                        <label for="discipline_mennen">Mennen</label>
                    </div>
                </div>
            </div>
            <div v-show="formProgressCurrentStep === 3">
                <h3 style="margin-top: 20px">STAP 3 - EXTRA INFO</h3>
                <h4 style="margin: 20px 0 10px 0">Voeder</h4>
                <h5 style="margin-top: 20px">Ruwvoeder</h5>
                <div>
                    <div>
                        <input type="radio" id="food_food_a_food_a1" name="foodOptions" value="24/7" v-model="listingsDetail.extra_info.food.food_a">
                        <label for="food_food_a_food_a1">24/7</label>
                    </div>
                    <div>
                        <input type="radio" id="food_food_a_food_a2" name="foodOptions" :value="listingsDetail.extra_info.food.food_a" v-on:click="listingsDetail.extra_info.food.food_a = $event.currentTarget.nextElementSibling.firstChild.value" ref="foodA2Radio">
                        <label for="food_food_a_food_a2">
                            <input type="number" min="1" value="1" @input="listingsDetail.extra_info.food.food_a = $event.target.value" v-on:click="setCheckedFoodA" v-on:keyup="checkNumber" ref="foodA2Input">/dag
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="food_food_a_food_a3" name="foodOptions" value="Verantwoordelijkheid van de klant" v-model="listingsDetail.extra_info.food.food_a">
                        <label for="food_food_a_food_a3">Verantwoordelijkheid van de klant</label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Krachtvoeder</h5>
                <div>
                    <div>
                        <input type="radio" id="food_food_b_food_b1" value="Keuze van de klant" v-model="listingsDetail.extra_info.food.food_b">
                        <label for="food_food_b_food_b1">Keuze van de klant</label>
                    </div>
                    <div>
                        <input type="radio" id="food_b2" value="Nee" v-model="listingsDetail.extra_info.food.food_b">
                        <label for="food_b2">Nee</label>
                    </div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0">Stalling</h4>
                <div>
                    <h5 style="margin-top: 20px;">Mest de klant zelf uit?</h5>
                    <div>
                        <input type="radio" id="stable_cleaning_cleaning_a" name="cleaningOptions" value="Nee" v-model="listingsDetail.extra_info.stable.cleaning">
                        <label for="stable_cleaning_cleaning_a">Nee</label>
                    </div>
                    <div>
                        <input type="radio" id="stable_cleaning_cleaning_b" name="cleaningOptions" v-on:click="listingsDetail.extra_info.stable.cleaning = $event.currentTarget.nextElementSibling.firstChild.value" ref="cleaningRadio">
                        <label for="stable_cleaning_cleaning_b">
                            <input type="number" min="1" value="1" @input="listingsDetail.extra_info.stable.cleaning = $event.target.value" v-on:click="setCheckedStable" v-on:keyup="checkNumber" ref="cleaningInput">/week
                        </label>
                    </div>
                </div>
                
                <h5 style="margin-top: 20px;">Stalbedekking</h5>
                <div>
                    <div>
                        <input type="checkbox" id="stable_floor_stro" value="Stro" v-model="listingsDetail.extra_info.stable.floor.option01">
                        <label for="stable_floor_stro">Stro</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_floor_vlas" value="Vlas" v-model="listingsDetail.extra_info.stable.floor.option02">
                        <label for="stable_floor_vlas">Vlas</label>
                    </div>
                    <div>
                        <input type="checkbox" id="stable_floor_houtkrullen" value="Houtkrullen" v-model="listingsDetail.extra_info.stable.floor.option03">
                        <label for="stable_floor_houtkrullen">Houtkrullen</label>
                    </div>
                </div>
                
                
                <h5 style="margin-top: 20px;">Extra info</h5>
                <div>
                    <textarea id="extra_info_comments" rows="4" v-model="listingsDetail.extra_info.other.comments"></textarea>
                </div>
                <div>
                    <input type="text" name="extra_info_facebook" placeholder="Facebook" v-model="listingsDetail.extra_info.other.facebook">
                </div>
                <div>
                    <input type="text" name="extra_info_youtube" placeholder="Youtube" v-model="listingsDetail.extra_info.other.youtube">
                </div>
                
                <h5 style="margin-top: 20px;">Beschikbaarheid</h5>
                <div>
                    <div>
                        <p style="margin-top:10px;">Maandag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.mon.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.mon.time2">
                        </div>
                        
                        <input type="radio" id="availability_mon_open" value="Open" v-model="listingsDetail.extra_info.availability.mon.open" @click="showHours">
                        <label for="availability_mon_open">Open</label> 
                        <input type="radio" id="availability_mon_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.mon.open" @click="hideHours">
                        <label for="availability_mon_closed">Gesloten</label>   
                    </div>
                    <div>
                        <p style="margin-top:10px;">Dinsdag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.tue.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.tue.time2">
                        </div>
                        
                        <input type="radio" id="availability_tue_open" value="Open" v-model="listingsDetail.extra_info.availability.tue.open" @click="showHours">
                        <label for="availability_tue_open">Open</label> 
                        <input type="radio" id="availability_tue_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.tue.open" @click="hideHours">
                        <label for="availability_tue_closed">Gesloten</label>   
                    </div>
                    <div>
                        <p style="margin-top:10px;">Woensdag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.wed.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.wed.time2">
                        </div>
                        
                        <input type="radio" id="availability_wed_open" value="Open" v-model="listingsDetail.extra_info.availability.wed.open" @click="showHours">
                        <label for="availability_wed_open">Open</label> 
                        <input type="radio" id="availability_wed_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.wed.open" @click="hideHours">
                        <label for="availability_wed_closed">Gesloten</label> 
                    </div>
                    <div>
                        <p style="margin-top:10px;">Donderdag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.thu.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.thu.time2">
                        </div>
                        
                        <input type="radio" id="availability_thu_open" value="Open" v-model="listingsDetail.extra_info.availability.thu.open" @click="showHours">
                        <label for="availability_thu_open">Open</label> 
                        <input type="radio" id="availability_thu_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.thu.open" @click="hideHours">
                        <label for="availability_thu_closed">Gesloten</label> 
                    </div>
                    <div>
                        <p style="margin-top:10px;">Vrijdag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.fri.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.fri.time2">
                        </div>
                        
                        <input type="radio" id="availability_fri_open" value="Open" v-model="listingsDetail.extra_info.availability.fri.open" @click="showHours">
                        <label for="availability_fri_open">Open</label> 
                        <input type="radio" id="availability_fri_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.fri.open" @click="hideHours">
                        <label for="availability_fri_closed">Gesloten</label> 
                    </div>
                    <div>
                        <p style="margin-top:10px;">Zaterdag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.sat.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.sat.time2">
                        </div>
                        
                        <input type="radio" id="availability_sat_open" value="Open" v-model="listingsDetail.extra_info.availability.sat.open" @click="showHours">
                        <label for="availability_sat_open">Open</label> 
                        <input type="radio" id="availability_sat_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.sat.open" @click="hideHours">
                        <label for="availability_sat_closed">Gesloten</label>   
                    </div>
                    <div>
                        <p style="margin-top:10px;">Zondag:</p>
                        <div class="hide">
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.sun.time1"> - 
                            <input type="time" min="00:00" max="24:00" v-model="listingsDetail.extra_info.availability.sun.time2">
                        </div>
                        
                        <input type="radio" id="availability_sun_open" value="Open" v-model="listingsDetail.extra_info.availability.sun.open" @click="showHours">
                        <label for="availability_sun_open">Open</label> 
                        <input type="radio" id="availability_sun_closed" value="Gesloten" v-model="listingsDetail.extra_info.availability.sun.open" @click="hideHours">
                        <label for="availability_sun_closed">Gesloten</label>   
                    </div>
                </div>
                
                <div v-for="(image, index) in listingsDetail.images_url">
                    <img  :src="image" alt="" height="100"> <span v-if="!minImagesReached" v-on:click="removeOriginalImage(image, index)">X</span>    
                </div>
                
                <div v-if="!maxImagesReached">
                    <div>
                        <div v-for="(imageUrl, index) in temporaryImages">
                            <img :src="imageUrl" height="100"> <span v-on:click="removeImage">DELETE</span>
                        </div>
                    </div>
                    <progress id="upload-progress" value="0" max="100">0%</progress>
                    <input 
                        id="upload-choose" 
                        type="file" 
                        accept="image/x-png,image/jpeg" 
                        value="upload" 
                        v-on:change="getImageAndResize" 
                        v-if="!maxTemporaryImagesReached"
                        multiple>
                </div>
            </div>
        </form>
        
        <div class="form-progress__buttons">
            <button class="btn btn--prev btn--light" @click="previous" v-if="formProgressCurrentStep != 1">Vorige</button>
            <button class="btn btn--next btn--success" @click="next" v-if="!formProgressLastStep()">Volgende</button>
        </div>
        <div class="form-progress__buttons">
            <button class="btn btn--cancel btn--error" @click="cancel">Annuleren</button>
            <button class="btn btn--save btn--success" @click.prevent="submitEditForm" v-if="formProgressLastStep()">Opslaan</button>
        </div>
        <div v-if="hasErrors">
            <p v-for="error in errors">{{ error }}</p>
        </div>
    </section>
</template>

<script>
    import Autocomplete from './../components/Autocomplete'
    import Postalcodes from './../datasets/postalcodes.json'

    export default {
        props: ['listingsDetail'],

        data() {
            return {
                options: Postalcodes,
                weidegangChecked: false,
                maxImagesReached: false,
                minImagesReached: false,
                errors: [],

                // Storage
                uploadedImages: [],

                // Temporary
                temporaryImages: [],
                temporaryImagesAmount: null,
                maxTemporaryImagesReached: false,

                // Current amount of images
                currentImageAmount: null,

                // Form progress
                formProgressSteps: {
                    1: 'Contact',
                    2: 'Praktisch',
                    3: 'Extra info'
                },
                formProgressCurrentStep: 1
            }
        },
        computed: {
            hasErrors() {
                return this.errors.length > 0
            },
            autofillPostalCodeAndCity() {
                return this.listingsDetail.contact.postalcode + ' - ' + this.listingsDetail.contact.city
            }
        },
        watch: {
            currentImageAmount: function() {
                if (this.currentImageAmount <= 1) {
                    this.minImagesReached = true
                } else {
                    this.minImagesReached = false
                }
                if (this.currentImageAmount >= 5) {
                    this.maxImagesReached = true
                } else {
                    this.maxImagesReached = false
                }
            },
            temporaryImagesAmount: function() {
                if ((this.currentImageAmount + this.temporaryImagesAmount) >= 5) {
                    this.maxTemporaryImagesReached = true
                } else {
                    this.maxTemporaryImagesReached = false
                }
            }
        },
        mounted() {
            // Check Weidegang
            if (this.listingsDetail.practical.accomodation.option04 === true) {
                this.weidegangChecked = true
            }
            // Check Food a2
            if (!isNaN(this.listingsDetail.extra_info.food.food_a)) {
                this.$refs.foodA2Radio.checked = true
                this.$refs.foodA2Input.value = this.listingsDetail.extra_info.food.food_a
            }
            // Check Stable cleaning
            if (!isNaN(this.listingsDetail.extra_info.stable.cleaning)) {
                this.$refs.cleaningRadio.checked = true
                this.$refs.cleaningInput.value = this.listingsDetail.extra_info.stable.cleaning
            }
            // Check openinghours and show if OPEN
            let openinghours = this.listingsDetail.extra_info.availability
            for (let i in openinghours) {
                if (openinghours[i].open === 'Open') {
                    let el = document.getElementById('availability_' + i + '_open')
                    el.previousElementSibling.classList.remove('hide')
                    el.previousElementSibling.classList.add('show')
                }
            }
            // Set current amount of images
            this.currentImageAmount = this.listingsDetail.images_url.length

            console.log('currentImageAmount: ' + this.currentImageAmount)
            // Check amount of uploaded images
            if (this.currentImageAmount >= 5) {
                this.maxImagesReached = true
            }

            console.log(this.listingsDetail.images_url)
        },
        methods: {
            removeActiveClass() {
                event.target.parentElement.classList.remove('active')
            },
            formProgressActive(index) {
                return index + 1 <= this.formProgressCurrentStep
            },
            formProgressChangeStep(index) {
                this.formProgressCurrentStep = index + 1
            },
            formProgressLastStep() {
                return this.formProgressCurrentStep === Object.keys(this.formProgressSteps).length
            },
            cancel() {
                this.$emit('cancelEdit')
            },
            next() {
                if (this.formProgressCurrentStep < Object.keys(this.formProgressSteps).length) {
                    this.formProgressCurrentStep++
                }
            },
            previous() {
                if (this.formProgressCurrentStep > 1) {
                    this.formProgressCurrentStep--
                }
            },
            submitEditForm() {
                this.errors = []

                if (this.isFormValid()) {
                    console.log("Editing...")
                    const user = firebase.auth().currentUser

                    // Map uploadedImages to array of uploadTasks (promises)
                    const uploads = this.uploadedImages.map((uploadedImage, index) => {
                        // Get highest number of currentImages
                        const vm = this
                        let imageNumbers = []

                        this.listingsDetail.images_url.forEach((image) => {
                            let imageName = image.substr(image.lastIndexOf(vm.$route.params.listingKey)).split('.jpg?')[0]
                            let imageNumber = imageName.replace(vm.$route.params.listingKey, '')
                            imageNumbers.push(imageNumber)
                        })
                        let highestImageNumber = Math.max(...imageNumbers)

                        // Rename the images
                        let newImageName = this.$route.params.listingKey + (highestImageNumber + index + 1) + '.jpg'

                        // Create a storage reference and an upload task to that reference
                        const storageRef = firebase.storage().ref('images/' + user.uid + '/' + newImageName)
                        const uploadTask = storageRef.put(uploadedImage)
                        console.log("image " + index + " uploaded")

                        return uploadTask.then(snapshot => {
                            this.listingsDetail.images_url.push(snapshot.downloadURL)
                        })
                    })

                    // Wait for all uploadTasks to be done
                    Promise.all(uploads).then(() => {
                        this.createEdit()
                    })
                }
            },
            createEdit() {
                this.errors = []
                const listingsDetailRef = firebase.database().ref('listings/' + this.$route.params.listingKey)

                return listingsDetailRef.update(this.listingsDetail).then(() => {
                    console.log("Edit complete")
                    this.$emit('cancelEdit')
                }, error => {
                    console.log(error.message)
                    this.errors.push(error.message)
                })
            },
            setPostalcodeAndCity(option) {
                this.listingsDetail.contact.postalcode = option.zip
                this.listingsDetail.contact.city = option.city
            },
            toggleWeidegang() {
                this.weidegangChecked = !this.weidegangChecked
                this.listingsDetail.practical.accomodation.option04Hours = 1
            },
            checkHour(event) {
                let inputValue = event.currentTarget
                if (inputValue.value < 1 || inputValue.value > 24) {
                    inputValue.value = 1
                }
            },
            checkNumber(event) {
                let inputValue = event.currentTarget
                if (inputValue.value < 1) {
                    inputValue.value = 1
                }
            },
            setCheckedFoodA(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingsDetail.extra_info.food.food_a = event.target.value
            },
            setCheckedStable(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingsDetail.extra_info.stable.cleaning = event.target.value
            },
            showHours(event) {
                let hours = event.currentTarget.previousElementSibling
                hours.classList.remove('hide');
                hours.classList.add('show');
            },
            hideHours(event) {
                let hours = event.currentTarget.parentElement.firstChild.nextElementSibling
                hours.classList.remove('show');
                hours.classList.add('hide');
            },
            getImageAndResize() {
                const user = firebase.auth().currentUser
                this.errors = []

                // Get images and push to array if amount does not exceed 5
                let images = event.currentTarget.files
                let sumImages = images.length + this.uploadedImages.length

                if ((images.length + this.currentImageAmount) <= 5 && (sumImages + this.currentImageAmount) <= 5) {
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
                                maxSize: 700
                            }).then((resizedImage) => {
                                resizedImage.lastModifiedDate = new Date()
                                resizedImage.name = images[i].name

                                // Push images to array
                                this.uploadedImages.push(resizedImage)

                                // Increase temporaryImagesAmount
                                this.temporaryImagesAmount++
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
                    this.temporaryImagesAmount--
                }
            },
            removeOriginalImage(imageUrl, index) {
                this.removeOriginalImageFromListing(index)
                this.removeOriginalImageFromStorage(imageUrl, index)
            },
            removeOriginalImageFromStorage(imageUrl, index) {
                // Remove everything before listingKey
                // Remove everything after/including '?'   
                const user = firebase.auth().currentUser
                const storageRef = firebase.storage().ref('images')
                let imageName = imageUrl.substr(imageUrl.lastIndexOf(this.$route.params.listingKey)).split('?')[0]
                let deleteImageRef = storageRef.child(user.uid + '/' + imageName)

                // Delete the file
                deleteImageRef.delete().then(() => {
                    console.log("Image removed from Storage")
                }, error => {
                    console.log(error.message)
                    this.errors.push(error.message)
                })
            },
            removeOriginalImageFromListing(index) {
                // Remove image from array before updating database
                this.listingsDetail.images_url.splice(index, 1)

                const imageRef = firebase.database().ref('listings/' + this.$route.params.listingKey + '/images_url')
                return imageRef.set(this.listingsDetail.images_url).then(() => {
                    this.currentImageAmount--
                        console.log("Image removed from database")
                }, error => {
                    console.log(error.message)
                    this.errors.push(error.message)
                })
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
            isEmpty() {
                if (
                    this.listingsDetail.contact.name.length == 0 ||
                    this.listingsDetail.contact.address.length == 0 ||
                    this.listingsDetail.contact.postalcode.length == 0 ||
                    this.listingsDetail.contact.city.length == 0 ||
                    this.listingsDetail.contact.email.length == 0 ||
                    this.listingsDetail.practical.type.length == 0 ||
                    this.listingsDetail.practical.booked.length == 0 ||
                    this.listingsDetail.extra_info.food.food_a.length == 0 ||
                    this.listingsDetail.extra_info.food.food_b.length == 0 ||
                    this.listingsDetail.extra_info.stable.cleaning.length == 0
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
            },
            addActiveClass() {
                event.target.parentElement.classList.add('active')
            }
        },
        components: {
            Autocomplete,
            Postalcodes
        }
    }

</script>
