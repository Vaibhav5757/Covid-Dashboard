<template>
   <apexchart type="line" v-if="series.length > 1" :options="options" :series="series"></apexchart>
</template>

<script>

export default {
    name: 'CountryTimeline',
    props: [
        'options',
        'series'
    ]
}
</script>

<style scoped>

</style>