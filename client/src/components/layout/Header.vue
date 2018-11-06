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
                                class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange hover:bg-white mt-4 sm:mt-0"
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

                        <a
                                class="ml-3 no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-red-dark border-white mt-4 sm:mt-0"
                                href="#" @click="logout">
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
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
            },
            logout() {
                this.$store.dispatch('setToken', null);
                this.$store.dispatch('setUser', null);
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
    h2.title {
        font-size: 3.5rem;
        letter-spacing: 3px;
    }
</style>
