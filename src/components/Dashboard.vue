<template>
    <div class="text-center">
        
        <h1 class="heading">
            Covid - 19 Dashboard
        </h1>
        
        <!-- Country List -->
        <div v-if="countries.length > 0" class="country-select">
            <label for="country">Select your country</label>
            <v-select v-model="country" :options="countries">
            </v-select>
        </div>
        
        <!-- Covid Image carousel -->
        <imageCarousel :images="images" v-if="country == ''" />

        <!-- Data related to country -->
        <div class="mt-5" v-if="country != ''">
            <CountryImage :countryName="country" />
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
import CountryImage from './CountryImage.vue'

export default {
    name: 'Dashboard',
    components: { 
        CountryStats,
        imageCarousel,
        CountryImage
    },
    data: () => ({
        images: [],
        country: '',
        countries: []
    }),
    async created(){
        let tempData = [];
        
        // Fetch covid related images
        this.images = ['https://media.gettyimages.com/photos/corona-virus-picture-id1212213054'];
        tempData = await axios.get("https://pixabay.com/api/?q=" + 'Covid' + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
        tempData.data.hits.forEach((element) => {
            this.images.push(element.largeImageURL);
        });
        
        // Fetch Name of all Countries
        tempData = await axios.get("https://covid-19-data.p.rapidapi.com/help/countries", {
            headers: {
                'x-rapidapi-key': process.env.VUE_APP_COVID_API_KEY,
                'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
            }
        });
        tempData.data.forEach(el => {
            this.countries.push(el.name);
        }); 
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