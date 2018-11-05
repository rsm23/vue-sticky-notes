<template>
    <div class="bg-grey-lightest">
        <div class="container mx-auto pt-5">
            <StickyNotes/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import StickyNotes from '@/components/StickyNotes.vue'

    export default {
        name: 'home',
        components: {
            StickyNotes
        }
    }
</script>
