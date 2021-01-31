<template>
   <apexchart type="line" v-if="series.length > 1" :options="options" :series="series"></apexchart>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CountryTimeline',
    props: [
        'countryName'
    ],
    async created(){
        this.updateStats();
    },
    async updated(){
        this.updateStats();
    },
    data: function() {
        return {
            options: {
                xaxis: {
                    categories: []
                }
            },
            series: []
        }
    },
    methods: {
        updateStats: async function(){
            var { data } = await axios.get("https://covid-193.p.rapidapi.com/history",{
                headers: {
                    'x-rapidapi-key': process.env.VUE_APP_COVID_API_KEY,
                    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                    'useQueryString': true
                },
                params: {
                    country: this.countryName
                }
            });
            this.options = {
                xaxis: {
                    categories: data.response.map(el => el.day).reverse(),
                    labels: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                colors: ['#0a043c', '#00e396', '#ef4f4f'],
                grid: {
                    yaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                chart: {
                   
                    toolbar: {
                        show: false
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
            }]
        }
    }
}
</script>

<style scoped>

</style>