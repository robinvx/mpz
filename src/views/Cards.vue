<template>
<section class="cards">
    <div class="card" v-bind:data-id="card.id" v-for="card in cards">
        <figure class="card__figure">
            <img class="card__figure__image" src="../assets/img/card2.jpg" alt="">
<!--        <img v-bind:src="card.image" alt="">-->
            <figcaption class="card__figure__figcaption">
                <div class="card__figure__figcaption__info">
                    <span class="card__figure__figcaption__info__type icon" v-bind:class="['icon--' + card.type]"></span>
                    <h2 class="card__figure__figcaption__info__location">{{ card.location }}</h2>
                </div>
            </figcaption>
        </figure>
    </div>
</section>
</template>


<script>
    export default {
        data() {
            return {
                cards: [
                    {
                        id: 1,
                        image: '', 
                        type: 'paddock-paradise',
                        location: 'Kalmthout'
                    },
                    {
                        id: 2,
                        image: '',
                        type: 'weide',
                        location: 'Chaussé-Notre-Dame-Louvignies' 
                    },
                    {
                        id: 3,
                        image: '',
                        type: 'stalling',
                        location: 'Sint-Job-in\'t-Goor'  
                    }
                ]
            }
        }
    }
</script>