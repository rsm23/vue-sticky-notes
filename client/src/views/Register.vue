<template>
    <div class="w-full h-screen flex justify-center items-center bg-grey-lighter">
        <div class="w-full max-w-md mx-auto">
            <form class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="handleRegister">
                <div class="flex flex-wrap mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block text-grey-darker text-sm font-bold mb-2"
                               for="full-name">
                            Full Name
                        </label>
                        <input :class="(errors.has('name')) ? 'border-red' : 'border-grey-lighter'"
                               class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                               id="full-name" name="name" placeholder="John Doe" type="text"
                               v-model="fullName" v-validate="'required|alpha_spaces'">
                        <p class="text-red text-xs italic" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block text-grey-darker text-sm font-bold mb-2"
                               for="username">
                            Username
                        </label>
                        <input :class="(errors.has('username')) ? 'border-red' : 'border-grey-lighter'"
                               class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                               id="username" name="username" placeholder="john" type="text" v-model="username"
                               v-validate="'required|alpha_dash'">
                        <p class="text-red text-xs italic" v-if="errors.has('username')">{{ errors.first('username')
                            }}</p>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="w-full px-3">
                        <label class="block text-grey-darker text-sm font-bold mb-2"
                               for="email">
                            Email
                        </label>
                        <input :class="(errors.has('email')) ? 'border-red' : 'border-grey-lighter'"
                               class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                               id="email" name="email" placeholder="email@server.com" type="email" v-model="email"
                               v-validate="'required|email'">
                        <p class="text-red text-xs italic" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="w-1/2 px-3">
                        <label class="block text-grey-darker text-sm font-bold mb-2"
                               for="password">
                            Password
                        </label>
                        <input :class="(errors.has('password')) ? 'border-red' : 'border-grey-lighter'"
                               class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                               id="password" name="password" placeholder="******************" ref="password"
                               type="password" v-model="password" v-validate="'required'">
                        <p class="text-grey-dark text-xs italic">Make it as long and as crazy as you'd like</p>
                        <p class="text-red text-xs italic" v-if="errors.has('password')">{{ errors.first('password')
                            }}</p>

                    </div>
                    <div class="w-1/2 px-3">
                        <label class="block text-grey-darker text-sm font-bold mb-2"
                               for="confirm-password">
                            Confirm Password
                        </label>
                        <input :class="(errors.has('passwordConf')) ? 'border-red' : 'border-grey-lighter'"
                               class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                               id="confirm-password" name="passwordConf" placeholder="******************"
                               type="password"
                               v-model="passwordConf" v-validate="'required|confirmed:password'">
                        <p class="text-red text-xs italic" v-if="errors.has('passwordConf')">{{
                            errors.first('passwordConf')
                            }}</p>
                    </div>
                </div>
                <div class="w-1/2 px-3">
                    <button class="no-underline bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            type="submit">
                        Register
                    </button>
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
                fullName: '',
                username: '',
                email: '',
                password: '',
                passwordConf: ''
            }
        },
        methods: {
            handleRegister() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        AuthServices.auth({
                            name: this.fullName,
                            username: this.username,
                            email: this.email,
                            password: this.password,
                            passwordConf: this.passwordConf
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

