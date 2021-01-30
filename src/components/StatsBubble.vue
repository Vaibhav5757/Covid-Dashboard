<template>
    <div>
        <h5 class="m-md-0 mt-md-3 mt-3 text-uppercase">
            {{ name }}
        </h5>
        <p class="m-md-0 mt-0 mb-3">
            {{ value }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'StatBubble',
    props:[
        'name',
        'value'
    ]
}
</script>

<style scoped>
.text-uppercase{
    text-transform: uppercase;
}
</style>