<template>
    <div id="app" class="bg-grey-light">
        <Header />
        <router-view/>
    </div>
</template>

<script>
    import StickyNotes from './components/StickyNotes'
    import Header from './components/layout/Header'

    export default {
        name: 'app',
        components: {
            StickyNotes,
            Header
        }
    }
</script>

<style>
    #app {
        font-family: 'poppin-reg', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
