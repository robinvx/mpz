<template>
    <button class="btn btn--icon" v-bind:class="'btn--' + type">
        <span class="icon icon--small" v-bind:class="'icon--' + icon"></span>
        <span class="btn__txt">{{ message }}</span>
    </button>
</template>


<script>
    export default {
        props: {
            message: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: "dark"
            }
        }
    }
</script>