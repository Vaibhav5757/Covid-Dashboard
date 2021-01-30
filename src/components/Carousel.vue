<template>
    <carousel v-if="images.length > 0" :per-page="1" 
        :paginationEnabled="false" :autoplay="true" :autoplayTimeout="5000"
        :autoplayHoverPause="false" :adjustableHeight="true">
        <slide v-for="(image,index) in images" :key="index">
            <img :src="image" class="country-image">
        </slide>
    </carousel>
</template>

<script>
export default {
    name: 'imageCarousel',
    props: [
        'images'
    ],
}
</script>

<style scoped>

</style>