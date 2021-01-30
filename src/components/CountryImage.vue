<template>
    <imageCarousel :images="images" v-if="images.length > 0" />
</template>

<script>
import axios from 'axios'
import imageCarousel from './Carousel.vue'
export default {
    name: 'CountryImage',
    props: [
        'countryName'
    ],
    components: {
        imageCarousel
    },
    data(){
        return{
            images: []
        }
    },
    async created() {
        await this.updateImages();
    },
    async updated() {
        await this.updateImages();
    },
    methods:{
        updateImages: async function(){
            this.images = ['https://media.gettyimages.com/photos/corona-virus-picture-id1212213054'];
            var tempData = await axios.get("https://pixabay.com/api/?q=" + this.countryName + "&key=" + process.env.VUE_APP_IMAGE_API_KEY);
            tempData.data.hits.forEach((element) => {
                this.images.push(element.largeImageURL);
            });
        }
    }
}
</script>

<style scoped>

</style>