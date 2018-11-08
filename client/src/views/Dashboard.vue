<template>
    <div>
        <div class="w-full h-screen flex justify-center items-center bg-grey-lighter">
            <div class="max-w-md w-full lg:flex" v-if="!edit">
                <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                     style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"
                     title="Woman holding a mug">
                </div>
                <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                        <div class="text-black font-bold text-xl mb-2">{{name}}</div>
                        <p class="text-grey-darker text-base">{{about}}</p>
                    </div>
                </div>
            </div>

            <div class="container mx-auto lg:flex" v-if="edit">
                <form @submit.prevent="handleSubmit" class="flex w-full" enctype="multipart/form-data" method="post">
                    <label :style="{ 'background-image': 'url(' + this.showAvatar + ')' , 'background-position-x':'-15px'}"
                           class="h-48 h-auto w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden avatar relative">
                        <input @change="previewImage" accept="image/*"
                               class="hidden" name='avatar' type='file'/>
                    </label>
                    <div class="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="mb-8 flex flex-wrap">
                            <div class="w-1/2 px-4">
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                       name="name" placeholder="Full Name" type="text" v-model="name">
                            </div>
                            <div class="w-1/2 px-4">
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                       name="name" placeholder="Full Name" type="text" v-model="email">
                            </div>
                            <div class="w-full px-4 mt-4">
                                <textarea
                                        class="w-full shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                        id="about" name="about"
                                        v-model="about">
                                </textarea>
                            </div>
                        </div>
                        <div class="w-full px-4">
                            <button class="w-full bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow"
                                    type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import AuthServices from '../services/AuthServices'

    export default {
        name: 'Dashboard',
        data() {
            return {
                edit: true,
                name: this.$store.state.user.name,
                email: this.$store.state.user.email,
                about: this.$store.state.user.about,
                imageData: ""
            }
        },
        created() {
            console.log();
        },
        computed: {
            showAvatar() {
                if (this.imageData) {
                    return this.imageData
                } else {
                    return process.env.VUE_APP_API_SERVER + this.$store.state.user.avatar
                }
            }
        },
        methods: {
            async handleSubmit() {
                await AuthServices.updateDetails({
                    id: this.$store.state.user._id,
                    name: this.name,
                    email: this.email,
                    about: this.about
                }).then((response) => {
                    this.$store.dispatch('setToken', response.data.token);
                    this.$store.dispatch('setUser', response.data.user);
                    this.$router.push('/dashboard');
                });
            },
            previewImage: function (event) {
                let file = event.target.files;
                // Ensure that you have a file before attempting to read it
                if (file && file[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imageData = e.target.result;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(file[0]);

                    let formData = new FormData();
                    formData.append('avatar', file[0]);
                    formData.append('id', this.$store.state.user._id);

                    AuthServices.saveAvatar(formData)
                        .then((response) => {
                            this.$store.dispatch('setToken', response.data.token);
                            this.$store.dispatch('setUser', response.data.user);
                            this.$router.push('/dashboard');
                        });
                }
            }
        }
    }
</script>
<style scoped>
    .avatar:after {
        content: '\A';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        cursor: pointer;
    }

    .avatar:hover:after {
        opacity: 1;
    }
</style>