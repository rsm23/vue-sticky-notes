<template>
    <div>
        <div class="container px-2 mx-auto">
            <div class="flex">
                <div class="w-full pr-4 pl-4 pr-4 pl-4 shadow-lg m-4 p-6 relative rounded-lg bg-white"
                     v-bind:class="[newNote.color]">
                    <div class="single-note add-note">
                        <input class="appearance-none bg-transparent border-b border-b-2 border-grey-ligher w-full text-grey-darker p-4 focus:outline-none mb-1"
                               placeholder="Type a title ..." type="text" v-model="noteTitle">
                        <textarea @input="textareaResize"
                                  class="w-full p-4 border-0 bg-transparent focus:outline-none text-grey-darker "
                                  placeholder="Type a description ..." ref="textarea" v-model="noteText"></textarea>
                        <div class="flex justify-around">
                        <span @click="toggleTransition(-1)" class="cursor-pointer"><svg
                                class="feather feather-folder-plus" fill="none"
                                height="24" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2"
                                viewBox="0 0 24 24" width="24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line
                                x1="12" x2="12" y1="11" y2="17"></line><line x1="9" x2="15" y1="14"
                                                                             y2="14"></line></svg></span>
                            <small class="block text-center">Today: {{ new Date() | moment("dddd, MMMM Do YYYY") }}</small>
                            <span @click="insertNote" class="cursor-pointer"><svg class="feather feather-check"
                                                                                  fill="none" height="24"
                                                                                  stroke="currentColor"
                                                                                  stroke-linecap="round"
                                                                                  stroke-linejoin="round"
                                                                                  stroke-width="2" viewBox="0 0 24 24"
                                                                                  width="24"
                                                                                  xmlns="http://www.w3.org/2000/svg"><polyline
                                    points="20 6 9 17 4 12"></polyline></svg></span>
                        </div>
                        <div :class="{openDivs: currentID == -1}" class="colors">
                            <div :class="{selected: newNote.color == 'blue'}" @click="noteColor = 'blue'"
                                 class="circle blue"></div>
                            <div :class="{selected: newNote.color == 'yellow'}" @click="noteColor = 'yellow'"
                                 class="circle yellow"></div>
                            <div :class="{selected: newNote.color == 'red'}" @click="noteColor = 'red'"
                                 class="circle red"></div>
                            <div :class="{selected: newNote.color == 'purple'}" @click="noteColor = 'purple'"
                                 class="circle purple"></div>
                            <div :class="{selected: newNote.color == 'white'}" @click="noteColor = 'white'"
                                 class="circle whiteCircle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Start The Loop-->
        <SingleNote :all-notes="allNotes"></SingleNote>
    </div>
</template>

<script>
    import SingleNote from './SingleNote'
    import NotesServices from '@/services/NotesServices'

    export default {
        name: 'StickyNotes',
        components: {
            SingleNote
        },
        data: function () {
            return {
                allNotes : [],
                // The Note Props
                noteTitle: '',
                noteColor: 'white',
                noteText: '',

                // Transitions
                opened: false,

                // Temporary IDs
                currentID: -2,
                editId: -1,
                idToCopy: -1
            }
        },
        beforeCreate() {
            if(!this.$store.state.isUserLoggedIn) {
                this.$router.push('/login');
            }
        },
        computed: {
            // Check if the note is longer than 106 letters
            longNote: function () {
                return this.noteText.length > 106;
            },

            // Collect Note Data
            newNote: function () {
                return {
                    title: this.noteTitle,
                    date: new Date(),
                    text: this.noteText,
                    color: this.noteColor,
                    long: this.longNote,
                    completed: false,
                    userId: this.$store.state.user._id
                }
            }
        },
        mounted() {
            this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px';
            this.getNotes();
        },
        methods: {
            async getNotes () {
                const response = await NotesServices.fetchNotes(this.$store.state.user._id)
                this.allNotes = response.data.notes
            },
            // Toggle The Effect
            toggleTransition: function (id) {
                if (id >= 0) {
                    this.currentID = id;
                } else if (id === -1) {
                    this.currentID = -1;
                }

                if (this.opened === false) {
                    this.opened = true;
                } else {
                    this.currentID = -2;
                    this.opened = false;
                }
            },
            async todoSave (note) {
                await NotesServices.addNote({
                    note
                })
            },
            insertNote: function () {
                if (this.noteTitle !== '' && this.noteText !== '') {
                    this.allNotes.unshift(this.newNote);
                    this.todoSave(this.newNote);
                    // Remove!
                    this.noteTitle = '';
                    this.noteText = '';
                    this.noteColor = '#fff';
                    this.currentID = -2;
                    this.$refs.textarea.style.minHeight = 'inherit';
                }
            },
            textareaResize() {
                this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px';
            }
        }
    }
</script>
<style scoped>
    input {
        box-shadow: inset 0 -2px 4px 0px rgba(0, 0, 0, .16)
    }

    textarea {
        box-shadow: inset 0 2px 4px 0px rgba(0, 0, 0, .16)
    }
</style>

