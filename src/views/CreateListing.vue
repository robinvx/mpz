<template>
    <section class="cd-create">
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
        <form id="form__create">
            <div v-show="formProgressCurrentStep === 1">
                <div class="input-field">
                    <input type="text" name="name" v-model="listingData.contact.name" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="name">Naam</label>
                </div>
                <div class="input-field">
                    <input type="text" name="address" v-model="listingData.contact.address" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="address">Adres</label>
                </div>
                
                <autocomplete :options="options" v-on:autocomplete="setPostalcodeAndCity"></autocomplete>
                
                <div class="input-field">
                    <input type="email" name="email" v-model.trim="listingData.contact.email" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="email">E-mail</label>
                </div>
                <div class="input-field">
                    <input type="text" name="phone" v-model.trim="listingData.contact.phone" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="phone">Telefoonnummer</label>
                </div>
                <div class="input-field">
                    <input type="text" name="website" v-model.trim="listingData.contact.website" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="website">Website</label>
                </div>
            </div>
            <div v-show="formProgressCurrentStep === 2">
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Type</h4>
                    </div>
                    <div class="cd-block__content">
                        <div class="radio-field">
                            <input type="radio" id="type_stalling" value="Stalling" v-model="listingData.practical.type">
                            <label for="type_stalling">Stalling</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="type_weide" value="Weide" v-model="listingData.practical.type">
                            <label for="type_weide">Weide</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="type_paddockparadise" value="Paddock Paradise" v-model="listingData.practical.type">
                            <label for="type_paddockparadise">Paddock Paradise</label>
                        </div>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Beschikbaarheid</h4>
                    </div>
                    <div class="cd-block__content">
                        <h5 class="list-subtitle">Volzet?</h5>
                        <div class="radio-field">
                            <input type="radio" id="booked_yes" value="Ja" v-model="listingData.practical.booked">
                            <label for="booked_yes">Ja</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="booked_no" value="Nee" v-model="listingData.practical.booked">
                            <label for="booked_no">Neen, wij hebben nog een plaatsje vrij!</label>
                        </div>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Accomodatie</h4>
                    </div>
                    <div class="cd-block__content">
                        <h5 class="list-subtitle">Piste</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_binnenpiste" class="accomodation" value="Binnenpiste" v-model="listingData.practical.accomodation.option01">
                            <label for="accomodation_binnenpiste">Binnenpiste</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_buitenpiste" class="accomodation" value="Buitenpiste" v-model="listingData.practical.accomodation.option02">
                            <label for="accomodation_buitenpiste">Buitenpiste</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_roundpen" class="accomodation" value="Roundpen" v-model="listingData.practical.accomodation.option03">
                            <label for="accomodation_roundpen">Roundpen</label>
                        </div>
                        <h5 class="list-subtitle">Weidegang</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_weidegang" value="Mogelijkheid tot weidegang" v-model="listingData.practical.accomodation.option04" @click="toggleWeidegang">
                            <label for="accomodation_weidegang">Mogelijkheid tot weidegang</label>   
                        
                            <div class="checkbox-field__child-input" v-show="weidegangChecked">
                                <input type="number" id="accomodation_weidegang_hours" min="1" max="24" value="1" v-on:keyup="checkHour" v-model="listingData.practical.accomodation.option04Hours">
                                <label for="accomodation_weidegang_hours">uur/dag</label>
                            </div>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_samenstaan" class="accomodation" value="Mogelijkheid tot samenstaan met andere paarden" v-model="listingData.practical.accomodation.option05">
                            <label for="accomodation_samenstaan">Mogelijkheid tot samenstaan met andere paarden</label>
                        </div>
                        <h5 class="list-subtitle">Opberging</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_storage_zadelkamer" value="Zadelkamer" v-model="listingData.practical.accomodation.storage.option01">
                            <label for="accomodation_stable_storage_zadelkamer">Zadelkamer</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_storage_zadelkast" value="Zadelkast" v-model="listingData.practical.accomodation.storage.option02">
                            <label for="accomodation_stable_storage_zadelkast">Zadelkast</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_storage_vvdklant" value="Verantwoordelijkheid van de klant" v-model="listingData.practical.accomodation.storage.option03">
                            <label for="accomodation_stable_storage_vvdklant">Verantwoordelijkheid van de klant</label>
                        </div>
                        <h5 class="list-subtitle">Verzorging</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_hygiene_poetsplaats" value="Poetsplaats" v-model="listingData.practical.accomodation.hygiene.option01">
                            <label for="accomodation_stable_hygiene_poetsplaats">Poetsplaats</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_hygiene_wasplaats" value="Wasplaats" v-model="listingData.practical.accomodation.hygiene.option02">
                            <label for="accomodation_stable_hygiene_wasplaats">Wasplaats</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_stable_hygiene_solarium" value="Solarium" v-model="listingData.practical.accomodation.hygiene.option03">
                            <label for="accomodation_stable_hygiene_solarium">Solarium</label>
                        </div>
                        <h5 class="list-subtitle">Cafetaria</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_cafetaria_sanitair" value="Sanitair" v-model="listingData.practical.accomodation.cafetaria.option01">
                            <label for="accomodation_cafetaria_sanitair">Sanitair</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_cafetaria_food" value="Mogelijkheid tot eten" v-model="listingData.practical.accomodation.cafetaria.option02">
                            <label for="accomodation_cafetaria_food">Mogelijkheid tot eten</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="accomodation_cafetaria_zelfbediening" value="Zelfbediening" v-model="listingData.practical.accomodation.cafetaria.option03">
                            <label for="accomodation_cafetaria_zelfbediening">Zelfbediening</label>
                        </div>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Aanbod</h4>
                    </div>
                    <div class="cd-block__content">
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_groepslessen_prive" value="Groepslessen privé" v-model="listingData.practical.offer.option01">
                            <label for="offer_groepslessen_prive">Groepslessen privé</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_groepslessen_manegepaarden" value="Groepslessen manègepaarden" v-model="listingData.practical.offer.option02">
                            <label for="offer_groepslessen_manegepaarden">Groepslessen manègepaarden</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_privelessen" value="Privélessen" v-model="listingData.practical.offer.option03">
                            <label for="offer_privelessen">Privélessen</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_externe_instructeur" value="Mogelijkheid tot externe instructeur" v-model="listingData.practical.offer.option04">
                            <label for="offer_externe_instructeur">Mogelijkheid tot externe instructeur</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_begeleide_buitenritten" value="Begeleide buitenritten" v-model="listingData.practical.offer.option05">
                            <label for="offer_begeleide_buitenritten">Begeleide buitenritten</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_kinderkampen" value="Kinderkampen" v-model="listingData.practical.offer.option06">
                            <label for="offer_kinderkampen">Kinderkampen</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_erkende_opleidingen" value="Erkende opleidingen" v-model="listingData.practical.offer.option07">
                            <label for="offer_erkende_opleidingen">Erkende opleidingen</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_training_paard" value="Training voor het paard" v-model="listingData.practical.offer.option08">
                            <label for="offer_training_paard">Training voor het paard</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_clinics" value="Clinics" v-model="listingData.practical.offer.option09">
                            <label for="offer_clinics">Clinics</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="offer_winkel" value="Winkel" v-model="listingData.practical.offer.option10">
                            <label for="offer_winkel">Winkel</label>
                        </div>
                    </div>
                </div>
                
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Discipline</h4>
                    </div>
                    <div class="cd-block__content">
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_recreatie" value="Recreatie" v-model="listingData.practical.discipline.option01">
                            <label for="discipline_recreatie">Recreatie</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_dressuur" value="Dressuur" v-model="listingData.practical.discipline.option02">
                            <label for="discipline_dressuur">Dressuur</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_natural_horsemanship" value="Natural Horsemanship" v-model="listingData.practical.discipline.option03">
                            <label for="discipline_natural_horsemanship">Natural Horsemanship</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_fokkerij" value="Fokkerij" v-model="listingData.practical.discipline.option04">
                            <label for="discipline_fokkerij">Fokkerij</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_trickriding" value="Trickriding" v-model="listingData.practical.discipline.option05">
                            <label for="discipline_trickriding">Trickriding</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_eventing" value="Eventing" v-model="listingData.practical.discipline.option06">
                            <label for="discipline_eventing">Eventing</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_springen" value="Springen" v-model="listingData.practical.discipline.option07">
                            <label for="discipline_springen">Springen</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_western" value="Western" v-model="listingData.practical.discipline.option08">
                            <label for="discipline_western">Western</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_academische_rijkunst" value="Academische rijkunst" v-model="listingData.practical.discipline.option09">
                            <label for="discipline_academische_rijkunst">Academische rijkunst</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_voltige" value="Voltige" v-model="listingData.practical.discipline.option10">
                            <label for="discipline_voltige">Voltige</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_endurance" value="Endurance" v-model="listingData.practical.discipline.option11">
                            <label for="discipline_endurance">Endurance</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="discipline_mennen" value="Mennen" v-model="listingData.practical.discipline.option12">
                            <label for="discipline_mennen">Mennen</label>
                        </div>
                    </div>
                </div>
            </div>          
            <div v-show="formProgressCurrentStep === 3">
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Voeder</h4>
                    </div>
                    <div class="cd-block__content">
                        <h5 class="list-subtitle">Ruwvoeder</h5>
                        <div class="radio-field">
                            <input type="radio" id="food_food_a_food_a1" name="foodOptions" value="24/7" v-model="listingData.extra_info.food.food_a">
                            <label for="food_food_a_food_a1">24/7</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="food_food_a_food_a2" name="foodOptions" :value="listingData.extra_info.food.food_a" v-on:click="listingData.extra_info.food.food_a = $event.currentTarget.nextElementSibling.firstChild.value">
                            <label for="food_food_a_food_a2">
                                <input type="number" min="1" value="1" class="radio-field__child-input" @input="listingData.extra_info.food.food_a = $event.target.value" v-on:click="setCheckedFoodA" v-on:keyup="checkNumber"><span>keer/dag</span>
                            </label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="food_food_a_food_a3" name="foodOptions" value="Verantwoordelijkheid van de klant" v-model="listingData.extra_info.food.food_a">
                            <label for="food_food_a_food_a3">Verantwoordelijkheid van de klant</label>
                        </div>
                        <h5 class="list-subtitle">Krachtvoeder</h5>
                        <div class="radio-field">
                            <input type="radio" id="food_food_b_food_b1" value="Keuze van de klant" v-model="listingData.extra_info.food.food_b">
                            <label for="food_food_b_food_b1">Keuze van de klant</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="food_b2" value="Nee" v-model="listingData.extra_info.food.food_b">
                            <label for="food_b2">Nee</label>
                        </div>
                    </div>
                </div>
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Stalling</h4>
                    </div>
                    <div class="cd-block__content">
                        <h5 class="list-subtitle">Mest de klant zelf uit?</h5>
                        <div class="radio-field">
                            <input type="radio" id="stable_cleaning_cleaning_a" name="cleaningOptions" value="Nee" v-model="listingData.extra_info.stable.cleaning">
                            <label for="stable_cleaning_cleaning_a">Nee</label>
                        </div>
                        <div class="radio-field">
                            <input type="radio" id="stable_cleaning_cleaning_b" name="cleaningOptions" v-on:click="listingData.extra_info.stable.cleaning = $event.currentTarget.nextElementSibling.firstChild.value">
                            <label for="stable_cleaning_cleaning_b">
                                <input type="number" min="1" value="1" class="radio-field__child-input" @input="listingData.extra_info.stable.cleaning = $event.target.value" v-on:click="setCheckedStable" v-on:keyup="checkNumber"><span>keer/week</span>
                            </label>
                        </div>
                        <h5 class="list-subtitle">Stalbedekking</h5>
                        <div class="checkbox-field">
                            <input type="checkbox" id="stable_floor_stro" value="Stro" v-model="listingData.extra_info.stable.floor.option01">
                            <label for="stable_floor_stro">Stro</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="stable_floor_vlas" value="Vlas" v-model="listingData.extra_info.stable.floor.option02">
                            <label for="stable_floor_vlas">Vlas</label>
                        </div>
                        <div class="checkbox-field">
                            <input type="checkbox" id="stable_floor_houtkrullen" value="Houtkrullen" v-model="listingData.extra_info.stable.floor.option03">
                            <label for="stable_floor_houtkrullen">Houtkrullen</label>
                        </div>
                    </div>
                </div>
                
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Extra info</h4>
                    </div>
                    <div class="textarea-field">
                        <textarea id="extra_info_comments" v-model="listingData.extra_info.other.comments" @focus="addActiveClass" @blur="removeActiveClass"></textarea>
                    </div>
                </div>
                
                <div class="input-field">
                    <input type="text" name="extra_info_facebook" v-model="listingData.extra_info.other.facebook" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="extra_info_facebook">Facebook</label>
                </div>
                <div class="input-field">
                    <input type="text" name="extra_info_youtube" v-model="listingData.extra_info.other.youtube" @focus="addActiveClass" @blur="removeActiveClass">
                    <label for="extra_info_youtube">YouTube</label>
                </div>
                
                <div class="cd-block">
                    <div class="list-title">
                        <div class="list-title__icon icon icon--checklist icon--xxsmall"></div>
                        <h4>Beschikbaarheid</h4>
                    </div>
                    <div class="cd-block__content">
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Maandag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.mon.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.mon.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_mon_open" value="Open" v-model="listingData.extra_info.availability.mon.open">
                                <label for="availability_mon_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_mon_closed" value="Gesloten" v-model="listingData.extra_info.availability.mon.open">
                                <label for="availability_mon_closed">Gesloten</label>
                            </div>   
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Dinsdag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.tue.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.tue.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_tue_open" value="Open" v-model="listingData.extra_info.availability.tue.open">
                                <label for="availability_tue_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_tue_closed" value="Gesloten" v-model="listingData.extra_info.availability.tue.open">
                                <label for="availability_tue_closed">Gesloten</label>
                            </div>   
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Woensdag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.wed.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.wed.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_wed_open" value="Open" v-model="listingData.extra_info.availability.wed.open">
                                <label for="availability_wed_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_wed_closed" value="Gesloten" v-model="listingData.extra_info.availability.wed.open">
                                <label for="availability_wed_closed">Gesloten</label>
                            </div> 
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Donderdag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.thu.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.thu.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_thu_open" value="Open" v-model="listingData.extra_info.availability.thu.open">
                                <label for="availability_thu_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_thu_closed" value="Gesloten" v-model="listingData.extra_info.availability.thu.open">
                                <label for="availability_thu_closed">Gesloten</label>
                            </div> 
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Vrijdag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.fri.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.fri.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_fri_open" value="Open" v-model="listingData.extra_info.availability.fri.open">
                                <label for="availability_fri_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_fri_closed" value="Gesloten" v-model="listingData.extra_info.availability.fri.open" >
                                <label for="availability_fri_closed">Gesloten</label>
                            </div> 
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Zaterdag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.sat.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.sat.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_sat_open" value="Open" v-model="listingData.extra_info.availability.sat.open">
                                <label for="availability_sat_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_sat_closed" value="Gesloten" v-model="listingData.extra_info.availability.sat.open">
                                <label for="availability_sat_closed">Gesloten</label>
                            </div>   
                        </div>
                        
                        <div class="cd-edit-time">
                            <h5 class="list-subtitle">Zondag:</h5>
                            <div class="hide">
                                <div class="time-field">
                                    <label>Van</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.sun.time1">
                                </div>
                                <div class="time-field">
                                    <label>Tot</label>
                                    <input type="time" min="00:00" max="24:00" v-model="listingData.extra_info.availability.sun.time2">
                                </div>
                            </div>
                            
                            <div class="radio-field" @click="showHours">
                                <input type="radio" id="availability_sun_open" value="Open" v-model="listingData.extra_info.availability.sun.open">
                                <label for="availability_sun_open">Open</label>
                            </div> 
                            <div class="radio-field" @click="hideHours">
                                <input type="radio" id="availability_sun_closed" value="Gesloten" v-model="listingData.extra_info.availability.sun.open">
                                <label for="availability_sun_closed">Gesloten</label>
                            </div>   
                        </div>
                    </div>
                </div>
                
                
                <h4 style="margin: 20px 0 10px 0">FOTO'S</h4>
                <div>
                    <div v-for="(imageUrl, index) in temporaryImages">
                        <img :src="imageUrl" height="100"> <span v-on:click="removeImage">DELETE</span>
                    </div>
                </div>
                <progress id="upload-progress" value="0" max="100">0%</progress>
                <input id="upload-choose" type="file" accept="image/x-png,image/jpeg" value="upload" v-on:change="getImageAndResize" multiple>
                
                </div>
        </form>
        <div class="form-progress__buttons">
            <button class="btn btn--prev btn--light" @click="previous" v-if="formProgressCurrentStep != 1">Vorige</button>
            <button class="btn btn--next btn--success" @click="next" v-if="!formProgressLastStep()">Volgende</button>
        </div>
        <div class="form-progress__buttons">
            <router-link to="/" class="btn btn--cancel btn--error">Annuleren</router-link>
            <button class="btn btn--save btn--success" @click.prevent="submitCreateForm" v-if="formProgressLastStep()">Plaatsen</button>
        </div>
        <div v-if="hasErrors">
            <p v-for="error in errors">{{ error }}</p>
        </div>
    </section>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    import Autocomplete from './../components/Autocomplete'
    import Postalcodes from './../datasets/postalcodes.json'

    export default {
        name: 'create',

        data() {
            return {
                options: Postalcodes,
                weidegangChecked: false,
                errors: [],
                listingData: {
                    // User ID
                    userId: '',
                    // Timestamp Unix
                    createdOn: '',
                    // Contact data
                    contact: {
                        name: '',
                        address: '',
                        postalcode: '',
                        city: '',
                        email: '',
                        phone: '',
                        website: ''
                    },

                    // Practical Data
                    practical: {
                        type: [],
                        booked: [],
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
                            food_a: [],
                            food_b: []
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
                            comments: '',
                            youtube: '',
                            facebook: ''
                        },
                        availability: {
                            mon: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            tue: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            wed: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            thu: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            fri: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            sat: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            },
                            sun: {
                                open: '',
                                time1: '00:00',
                                time2: '00:00'
                            }
                        }
                    },

                    images_url: []
                },
                // Storage
                uploadedImages: [],

                // Temporary
                temporaryImages: [],

                // Firebase
                listingPostKey: '',
                listingRef: '',
                
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
            ...mapGetters(['currentUser'])
        },
        methods: {
            formProgressActive(index) {
                return index + 1 <= this.formProgressCurrentStep
            },
            formProgressChangeStep(index) {
                this.formProgressCurrentStep = index + 1
            },
            formProgressLastStep() {
                return this.formProgressCurrentStep === Object.keys(this.formProgressSteps).length
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
                this.listingData.userId = user.uid
                this.listingData.createdOn = Date.now()

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
                    this.listingData.contact.name.length == 0 ||
                    this.listingData.contact.address.length == 0 ||
                    this.listingData.contact.postalcode.length == 0 ||
                    this.listingData.contact.city.length == 0 ||
                    this.listingData.contact.email.length == 0 ||
                    this.listingData.practical.type.length == 0 ||
                    this.listingData.practical.booked.length == 0 ||
                    this.listingData.extra_info.food.food_a.length == 0 ||
                    this.listingData.extra_info.food.food_b.length == 0 ||
                    this.listingData.extra_info.stable.cleaning.length == 0 ||
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
            toggleWeidegang() {
                this.weidegangChecked = !this.weidegangChecked
                this.listingData.practical.accomodation.option04Hours = 1
            },
            setCheckedStable(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingData.extra_info.stable.cleaning = event.target.value
            },
            setCheckedFoodA(event) {
                let radioBtn = event.currentTarget.parentElement.previousElementSibling
                radioBtn.checked = true
                this.listingData.extra_info.food.food_a = event.target.value
            },
            checkNumber(event) {
                let inputValue = event.currentTarget
                if (inputValue.value < 1) {
                    inputValue.value = 1
                }
            },
            checkHour(event) {
                let inputValue = event.currentTarget
                if (inputValue.value < 1 || inputValue.value > 24) {
                    inputValue.value = 1
                }
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
            setPostalcodeAndCity(option) {
                this.listingData.contact.postalcode = option.zip
                this.listingData.contact.city = option.city
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
                                maxSize: 700
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
            },
            addActiveClass() {
                event.target.parentElement.classList.add('active')
            },
            removeActiveClass() {
                event.target.parentElement.classList.remove('active')
            }
        },
        components: {
            Autocomplete
        }
    }

</script>
