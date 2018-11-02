<template>
    <div class="relative bg-grey-lighter antialiased border-grey-lighter border-b-2 pt-24 pb-32 md:pb-40" id="banner">
        <div class="max-w-lg mx-auto">
            <h1 class="title text-center text-white text-white py-6 md:mx-24">Sticky Note</h1>
            <h2 class="text-2xl md:text-3xl text-center pt-8 text-grey-darkest font-normal leading-tight">A notes taking app <strong>that is shamelessly</strong> a clone of Google's <strong>Keep Note</strong> app.</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style scoped>
    #banner {
        background-color: #fff;
        background-image: url('/img/bg.svg');
    }

    h1.title {
        font-size: 3.5rem;
        letter-spacing: 3px;
        background-color: #f6993f;
        background-image: url('/img/bgTitle.svg'); }
</style>
