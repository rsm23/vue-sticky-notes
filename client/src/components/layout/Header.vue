<template>
    <div>
        <div class="font-sans antialiased" id="app">
            <nav class="flex items-center justify-between flex-wrap bg-orange p-4 title">
                <div class="flex items-center flex-no-shrink text-white mr-6">
                    <span class="font-semibold text-xl tracking-tight">Sticky Notes</span>
                </div>
                <div class="block sm:hidden">
                    <button @click="toggle"
                            class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>
                            Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
                <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                    <div class="text-sm sm:flex-grow">
                        <router-link
                                class="no-underline block mt-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4"
                                to="/">
                            Home
                        </router-link>
                    </div>
                    <div v-if="!$store.state.isUserLoggedIn">
                        <router-link
                                class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:orange hover:bg-white mt-4 sm:mt-0"
                                to="/register">
                            Register
                        </router-link>

                        <router-link
                                class="ml-3 no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-orange bg-white border-white mt-4 sm:mt-0"
                                to="/login">
                            Login
                        </router-link>
                    </div>
                    <div v-else>

                        <a
                                class="ml-3 no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-orange bg-white border-white mt-4 sm:mt-0"
                                href="#">
                            {{$store.state.user.name}}
                        </a>
                    </div>
                </div>
            </nav>
        </div>

        <div class="relative bg-grey-lighter antialiased border-grey-lighter border-b-2 pt-24 pb-32 md:pb-40"
             id="banner">
            <div class="max-w-lg mx-auto">
                <h1 class="title text-center text-white text-white py-6 md:mx-24">Sticky Note</h1>
                <h2 class="text-2xl md:text-3xl text-center pt-8 text-grey-darkest font-normal leading-tight">A notes
                    taking app <strong>that is shamelessly</strong> a clone of Google's <strong>Keep Note</strong> app.
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                open: false,
            }
        },
        methods: {
            toggle() {
                this.open = !this.open
            }
        }
    }
</script>

<style scoped>
    #banner {
        background-color: #fff;
        background-image: url('/img/bg.svg');
    }

    .title {
        background-color: #f6993f;
        background-image: url('/img/bgTitle.svg');
    }

    h2.title {
        font-size: 3.5rem;
        letter-spacing: 3px;
    }
</style>
