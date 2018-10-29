<template>
    <div>
        <div class="container px-2 mx-auto">
            <div class="flex">
                <div class="w-full pr-4 pl-4 pr-4 pl-4 shadow-lg m-4 p-6 relative rounded-lg" v-bind:class="[newNote.color]">
                    <div class="single-note add-note">
                        <input class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                               placeholder="Type a title ..." type="text" v-model="noteTitle">
                        <small class="text-left">Today: {{ todayDate }}</small>
                        <hr>
                        <textarea class="w-full shadow-inner p-4 border-0 rounded bg-transparent" placeholder="Type a description ..."
                                  v-model="noteText"></textarea>
                        <div class="flex justify-around">
                        <span @click="toggleTransition(-1)" class="cursor-pointer"><svg class="feather feather-folder-plus" fill="none"
                                                                                        height="24" stroke="currentColor" stroke-linecap="round"
                                                                                        stroke-linejoin="round" stroke-width="2"
                                                                                        viewBox="0 0 24 24" width="24"
                                                                                        xmlns="http://www.w3.org/2000/svg"><path
                                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line
                                x1="12" x2="12" y1="11" y2="17"></line><line x1="9" x2="15" y1="14"
                                                                             y2="14"></line></svg></span>
                            <span @click="insertNote" class="cursor-pointer"><svg class="feather feather-check" fill="none" height="24"
                                                                                  stroke="currentColor" stroke-linecap="round"
                                                                                  stroke-linejoin="round"
                                                                                  stroke-width="2" viewBox="0 0 24 24" width="24"
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
        <SingleNote :all-notes="theNotes"></SingleNote>
    </div>
</template>

<script>
    import SingleNote from './SingleNote'

    export default {
        name: 'StickyNotes',
        components: {
            SingleNote
        },
        data: function () {
            return {
                theNotes: this.todoFetch(),
                // The Note Props
                noteTitle: '',
                noteColor: 'white',
                noteText: '',

                // Transitions
                opened: false,

                // Temporary IDs
                currentID: -2,
                editId: -1,
                idToCopy: -1,
            }
        },
        computed: {
            // Define The Date
            todayDate: function () {
                let d = new Date();
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let today = d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();

                return today;
            },

            // Check if the note is longer than 106 letters
            longNote: function () {
                if (this.noteText.length > 106) {
                    return true;
                } else {
                    return false;
                }
            },

            // Collect Note Data
            newNote: function () {
                return {
                    id: (this.theNotes.length + 1),
                    title: this.noteTitle,
                    date: this.todayDate,
                    text: this.noteText,
                    color: this.noteColor,
                    long: this.longNote,
                    completed: false
                }
            }
        },
        methods: {
            // Toggle The Effect
            toggleTransition: function (id) {
                if (id >= 0) {
                    this.currentID = id;
                } else if (id == -1) {
                    this.currentID = -1;
                }

                if (this.opened == false) {
                    this.opened = true;
                } else {
                    this.currentID = -2;
                    this.opened = false;
                }
            },
            // To-Do Storage
            todoFetch: function () {
                let notes = JSON.parse(localStorage.getItem('notes') || '[]');
                //console.log(notes);
                return notes;
            },
            todoSave: function (notes) {
                //console.log(JSON.stringify(notes));
                localStorage.setItem('notes', JSON.stringify(notes));
            },
            insertNote: function () {
                if (this.noteTitle !== '' && this.noteText !== '') {
                    this.theNotes.push(this.newNote);
                    this.todoSave(this.theNotes);

                    // Remove!
                    this.noteTitle = '';
                    this.noteText = '';
                    this.noteColor = '#fff';
                    this.currentID = -2;
                }
            }
        }
    }
</script>

