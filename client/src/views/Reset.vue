<template>
    <div class="w-full h-screen flex justify-center items-center bg-grey-lighter">
        <div class="w-full max-w-md mx-auto">
            <form @submit.prevent="handleReset" class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                <div class="flex items-center justify-between px-3">
                    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                        Send Email
                    </button>
                    <router-link class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                                 to="/login">
                        Back to login
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import AuthServices from "../services/AuthServices";

    export default {
        name: 'Reset',
        data() {
            return {
                email: '',
            }
        },
        methods: {
            handleReset() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        AuthServices.reset({
                            email: this.email
                        });
                        this.$router.push({
                            name: 'login', params: {
                                refer: 'reset',
                                email: this.email
                            }
                        });
                        return;
                    }
                    alert('Correct them errors!');
                });
            }
        }
    }
</script>

