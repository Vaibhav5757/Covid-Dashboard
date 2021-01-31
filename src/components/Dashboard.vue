<template>
    <div class="text-center">
        
        <h1 class="heading">
            Covid - 19 Dashboard
        </h1>
        
        <!-- Country List -->
        <div v-if="countries.length > 0" class="country-select">
            <label for="country">Select your country</label>
            <v-select @input=dropdownChange() v-model="country" :options="countries">
            </v-select>
        </div>
        
        <!-- Covid Image carousel -->
        <imageCarousel :images="images" />

        <!-- Data related to country -->
        <div class="mt-5" v-if="country != ''">
            <CountryStats :countryName="country" />
        </div>
        
        <!-- Warning message -->
        <p class="disclaimer">
            *Data might vary when compared with Official Sources
        </p>
    </div>
</template>

<script>
const axios = require('axios').default
import CountryStats from './CountryStats.vue'
import imageCarousel from './Carousel.vue'

export default {
    name: 'Dashboard',
    components: { 
        CountryStats,
        imageCarousel,
        
    },
    data: () => ({
        images: ['https://media.gettyimages.com/photos/corona-virus-picture-id1212213054'],
        country: '',
    }),
    computed: {
        countries(){
            return this.$store.state.countryNames;
        }
    },
    async created(){
        // Fetch Name of all Countries
        this.$store.dispatch('getCountries');

        // Fetch Stats of all Countries
        this.$store.dispatch('getCompleteStats');

        let tempData = [];
        
        // Fetch covid related images
        tempData = await axios.get("https://pixabay.com/api/?q=" + 'Covid' + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
        tempData.data.hits.forEach((element) => {
            this.images.push(element.largeImageURL);
        });
    },
    methods: {
        dropdownChange: async function(){
            var tempData = await axios.get("https://pixabay.com/api/?q=" + this.country + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
            if(tempData.data.totalHits > 0){
                this.images = [];
                tempData.data.hits.forEach((element) => {
                    this.images.push(element.largeImageURL);
                });
            }
        }
    }
}
</script>

<style>
.heading {
    margin-bottom: 30px;
}
.disclaimer{
    color: #c00;
    padding-bottom: 20px;
}
.country-select {
    width: 25%;
    margin: 30px auto;
}
@media screen and (max-width: 767px){
    .country-select {
        width: 80%;
    }
}
</style>