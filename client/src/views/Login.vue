<template>
    <div class="w-full h-screen flex justify-center items-center bg-grey-lighter">
        <div class="w-full max-w-xs mx-auto">
            <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  method="post">
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input :class="{'border-red': errors.has('email')}"
                           class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                           id="username" name="password" placeholder="email@server.com" type="email" v-model="email"
                           v-validate="'required|email'">
                    <p class="text-red text-xs italic" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                </div>
                <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input :class="{'border-red': errors.has('email')}"
                           class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                           id="password" name="password" placeholder="******************" type="password"
                           v-model="password" v-validate="'required'">
                    <p class="text-red text-xs italic" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                        Sign In
                    </button>
                    <router-link class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                                 to="/reset">
                        Forgot Password?
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import AuthServices from "../services/AuthServices";

    export default {
        name: 'Register',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        mounted() {
            if (this.$route.params.refer === 'reset') {
                this.$swal({
                    title: '<strong>Password Reset</strong>',
                    type: 'info',
                    html:
                        'Please keep in mind that if <b>' + this.$route.params.email + '</b>, ' +
                        'exists, you\'ll receive an email with a news automatically generated password',
                    showCloseButton: true,
                })
            }
        },
        methods: {
            handleLogin() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        AuthServices.auth({
                            logemail: this.email,
                            logpassword: this.password
                        }).then((response) => {
                            this.$store.dispatch('setToken', response.data.token);
                            this.$store.dispatch('setUser', response.data.user);
                            this.$router.push('/');
                        });
                        return;
                    }

                    alert('Correct them errors!');
                });
            }
        }
    }
</script>

