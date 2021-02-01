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
            <CountryTimeline v-if="series.length" :options="options" :series="series"/>
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
import CountryTimeline from './Timeline.vue';

export default {
    name: 'Dashboard',
    components: { 
        CountryStats,
        imageCarousel,
        CountryTimeline
    },
    data: () => ({
        images: ['https://media.gettyimages.com/photos/corona-virus-picture-id1212213054'],
        country: '',
        options: {
            xaxis: {
                categories: []
            }
        },
        series: []
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
        
        // Fetch covid related images
        var { data } = await axios.get("https://pixabay.com/api/?q=" + 'Covid' + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
        this.images = data.hits.map(el => el.largeImageURL);
    },
    methods: {
        dropdownChange: async function(){
            var { data } = await axios.get("https://pixabay.com/api/?q=" + this.country + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
            this.images = data.hits.map(el => el.largeImageURL);

            var tempData = await axios.get("https://covid-193.p.rapidapi.com/history",{
                headers: {
                    'x-rapidapi-key': process.env.VUE_APP_COVID_API_KEY,
                    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                    'useQueryString': true
                },
                params: {
                    country: this.country
                }
            });

            data = tempData.data;
            this.options = {
                xaxis: {
                    categories: data.response.map(el => el.day).reverse(),
                    labels: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        show: true
                    }
                },
                colors: ['#0a043c', '#00e396', '#ef4f4f'],
                grid: {
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                chart: {
                    toolbar: {
                        show: false
                    },
                    animations: {
                        enabled: false
                    },
                    markers: {
                        size: 0
                    }
                }
            };
            this.series = [{
                    name: 'Total Active',
                    data: data.response.map(el => el.cases.active).reverse()
                },{
                    name: 'Total Recovered',
                    data: data.response.map(el => el.cases.recovered).reverse()
                },{
                    name: 'Total Deaths',
                    data: data.response.map(el => el.deaths.total).reverse()
            }];
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