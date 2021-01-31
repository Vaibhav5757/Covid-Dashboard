import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const covidAPIHeader = {
    'x-rapidapi-key': process.env.VUE_APP_COVID_API_KEY,
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'useQueryString': true
}

export default new Vuex.Store({
    state: {
        countryNames: [],
        countryWiseStats: null
    },
    mutations: {
        setCountryNames(state, countryNames){
            state.countryNames = countryNames;
        },
        setCountryWiseStats(state, countryWiseStats){
            state.countryWiseStats = countryWiseStats;
        }
    },
    actions: {
        async getCountries({ commit }){
            var { data } = await axios.get("https://covid-193.p.rapidapi.com/countries",{
                headers: covidAPIHeader
            });
            commit('setCountryNames', data.response);
        },
        async getCompleteStats({ commit }){
            var { data } = await axios.get("https://covid-193.p.rapidapi.com/statistics",{
                headers: covidAPIHeader
            });
            commit('setCountryWiseStats', data.response);
        }
    }
})