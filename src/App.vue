<template>
    <div id="app">
        <Header />
        <StickyNotes msg="Welcome to Your Vue.js App"/>
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
        text-align: center;
        color: #2c3e50;
    }
</style>
