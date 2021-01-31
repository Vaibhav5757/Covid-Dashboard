<template>
    <div>
        <span class="d-none">{{ countryName }}</span>
        <div class="icon-container">
            <div class="icon">
                <v-icon class="warning" name="plus-circle" scale="5"></v-icon>
                <StatsBubble name="Confirmed" :value="confirmed"/>
            </div>
            <div class="icon">
                <v-icon class="success" name="check-circle" scale="5"></v-icon>
                <StatsBubble name="recovered" :value="recovered"/>
            </div>
            <div class="icon">
                <v-icon class="danger" name="exclamation-circle" scale="5"></v-icon>
                <StatsBubble name="critical" :value="critical"/>
            </div>
            <div class="icon">
                <v-icon class="death" name="thermometer-half" scale="5"></v-icon>
                <StatsBubble name="deaths" :value="deaths"/>
            </div>
        </div>
    </div>
</template>

<script>
import StatsBubble from './StatsBubble.vue'

export default {
    name: 'CountryStats',
    components: {
        StatsBubble
    },
    props: [
        'countryName'
    ],
    data() {
        return {
            stats: [],
            confirmed: 0,
            recovered: 0,
            critical: 0,
            deaths: 0
        }
    },
    async created() {
        this.updateStats();
    },
    async updated() {
        this.updateStats();
    },
    methods: {
        updateStats: function() {
            var stats = this.$store.state.countryWiseStats.filter(el => el.country == this.countryName);
            this.confirmed = stats[0].cases.total;
            this.recovered = stats[0].cases.recovered;
            this.critical = stats[0].cases.critical;
            this.deaths = stats[0].deaths.total;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap');
.spinner {
    display: block;
    margin: 30px 0;
}
.icon-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 30px auto;
}
.icon {
    font-family: 'Balsamiq Sans', cursive;
    width: 25%;
}
.warning {
    color: #212529;
    background-color: #ffc107;
    border-radius: 50%;
}
.success{
    color: #28a745;
    background-color: #fff;
    border-radius: 50%;
    border-color: #FFF;
}
.danger{
    color: #FFF;
    background-color: #dc3545;
    border-radius: 50%;
}
.death {
    color: #6c757d;
    background-color: #FFF;
    border-color: #6c757d;
    border-radius: 50%;
}
@media screen and (max-width: 767px) {
    .icon {
        width: 50%;
    }
}
</style>