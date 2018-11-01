<template>
    <div class="px-4">
        <section class="flex -mx-4 flex-wrap">
            <div :key="oneNote.i" class="md:w-1/4 sm:w-1/2 shadow-lg px-4 py-6 flex flex-col"
                 v-bind:class="[oneNote.color]" v-for="(oneNote, i) in allNotes">
                <div class="relative" v-if="oneNote.text">
                    <span @click="finishTask(i)" class="absolute pin-r cursor-pointer" id="check">
                        <svg :class="{'checked': oneNote.completed}" viewBox="0 0 100 100">
                            <path
                            class="frame"
                            d="m 59.977808,90.908624 h -43.310291 c -4.057278,0 -7.3236058,-3.266329 -7.3236058,-7.323606 v -65.91245 c 0,-4.057278 3.2663278,-7.323606 7.3236058,-7.323606 h 66.417531 c 4.057278,0 7.323606,3.266328 7.323606,7.323606 v 21.592009 44.320441 c 0,4.057277 -3.266328,7.323606 -7.323606,7.323606 h -23.10724"/>
                            <path
                            class="check"
                            d="m 90.408654,39.264577 v 44.320441 c 0,4.057277 -3.266328,7.323606 -7.323606,7.323606 h -23.10724"/>
                        </svg>
                    </span>
                    <input autofocus="true"
                           class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                           placeholder="Type a title ..." style="max-width: 92%;"
                           type="text"
                           v-if="edit && editId == i" v-model="oneNote.title">
                    <h2 :class="{isDone: oneNote.completed}" class="overflow-auto" style="max-width: 92%;"
                        v-else>{{oneNote.title}}</h2>
                    <small class="mt-4 text-sm text-left" :class="{isDone: oneNote.completed}">Last update: {{oneNote.date}}</small>
                    <hr>
                    <textarea class="w-full shadow-inner p-4 border-0 rounded bg-transparent"
                              placeholder="Type a description ..."
                              v-if="edit && editId == i"
                              v-model="oneNote.text"></textarea>
                    <p :class="{expand: idToExpand == i, isDone: oneNote.completed}"
                       class="text-left overflow-x-auto h-16 break-words"
                       v-else v-html="modifiedText(i)"></p>
                    <div :class="(idToExpand == i) ? 'mt-2' : 'mt-10' " class="flex justify-between">
                        <span @click="updateNote(i, oneNote)" class="cursor-pointer" v-if="edit && editId == i"><svg
                                class="feather feather-check"
                                fill="none" height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24" width="24"
                                xmlns="http://www.w3.org/2000/svg"><polyline
                                points="20 6 9 17 4 12"></polyline></svg></span>
                        <span @click=editNote(i) class="cursor-pointer" v-else><svg class="feather feather-edit"
                                                                                    fill="none" height="24"
                                                                                    stroke="currentColor"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="2" viewBox="0 0 24 24"
                                                                                    width="24"
                                                                                    xmlns="http://www.w3.org/2000/svg"><path
                                d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon
                                points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg></span>
                        <span @click="toggleTransition(i)" class="cursor-pointer"><svg
                                class="feather feather-folder-plus" fill="none"
                                height="24" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2"
                                viewBox="0 0 24 24" width="24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line
                                x1="12" x2="12" y1="11" y2="17"></line><line x1="9" x2="15" y1="14"
                                                                             y2="14"></line></svg></span>
                        <span @click="deleteNote(i)" class="cursor-pointer"><svg class="feather feather-trash-2"
                                                                                 fill="none" height="24"
                                                                                 stroke="currentColor"
                                                                                 stroke-linecap="round"
                                                                                 stroke-linejoin="round"
                                                                                 stroke-width="2" viewBox="0 0 24 24"
                                                                                 width="24"
                                                                                 xmlns="http://www.w3.org/2000/svg"><polyline
                                points="3 6 5 6 21 6"></polyline><path
                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line
                                x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11"
                                                                             y2="17"></line></svg></span>
                        <span @click="expandNote(i)" class="cursor-pointer" v-if="oneNote.long"><svg
                                class="feather feather-maximize"
                                fill="none" height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2" viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></span>
                    </div>
                    <div :class="{openDivs: currentID == i}" class="colors">
                        <div :class="{selected: oneNote.color == 'blue'}" @click="changeColor(i, 'blue')"
                             class="circle blue"></div>
                        <div :class="{selected: oneNote.color == 'yellow'}" @click="changeColor(i, 'yellow')"
                             class="circle yellow"></div>
                        <div :class="{selected: oneNote.color == 'red'}" @click="changeColor(i, 'red')"
                             class="circle red"></div>
                        <div :class="{selected: oneNote.color == 'purple'}" @click="changeColor(i, 'purple')"
                             class="circle purple"></div>
                        <div :class="{selected: oneNote.color == 'white'}" @click="changeColor(i, 'white')"
                             class="circle whiteCircle"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'SingleNote',
        props: ['allNotes'],
        data: function () {
            return {
                // Temporary IDs
                currentID: -2,
                editId: -1,
                idToCopy: -1,

                // Transitions
                opened: false,

                // Confirm Delete
                confrim: '',

                // Edit Mode
                edit: false,

                // Expand
                idToExpand: -1,
                expanded: false,
            }
        },
        methods: {
            // Define The Date
            todayDate: function () {
                let d = new Date();
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let today = d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();

                return today;
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
            modifiedText: function (id) {
                // Detect Links
                let detectLinks = /((https?:\/\/)(\S+))/g;
                let detectLinksWWW = /(((www\.))(\S+))/g;

                /*
                    Ends with ".com" => /(\S+)\.com/g
                */

                // Detect Hashtags
                let detecthash = /#(\S+)/g;

                if (this.allNotes[id].text.match(detectLinks) || this.allNotes[id].text.match(detecthash)) {
                    return this.allNotes[id].text.replace(detectLinks, '<a href="$1" target="_black">$1</a>').replace(detectLinksWWW, '<a href="http://$1" target="_black">$1</a>').replace(detecthash, '<a href=?s=$1>#$1</a>');
                } else {
                    return this.allNotes[id].text;
                }

            },

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
            // Note Processes
            deleteNote: function (id) {
                this.confirm = confirm("Are You Sure You Want To Delete It ?");
                if (this.confirm) {
                    this.allNotes.splice(id, 1);
                    this.todoSave(this.allNotes);
                }
            },
            changeColor: function (id, color) {
                this.allNotes[id].color = color;
                this.todoSave(this.allNotes);
                this.currentID = -2;
                this.opened = false;
            },
            editNote: function (i) {
                this.edit = true;
                this.editId = i;
            },
            updateNote: function (id, note) {
                note.date = this.todayDate();
                if (note.text.length > 106) {
                    note.long = true;
                } else {
                    note.long = false;
                }
                this.allNotes[id] = note;
                this.todoSave(this.allNotes);
                this.editId = -1;
                this.edit = false;
            },
            expandNote: function (id) {
                if (this.expanded == false) {
                    this.idToExpand = id;
                    this.expanded = true;
                } else {
                    this.expanded = false;
                    this.idToExpand = -1;
                }
            },
            finishTask: function (id) {
                if (this.allNotes[id].completed == false) {
                    this.allNotes[id].completed = true;
                    this.allNotes[id].date = this.todayDate();
                } else {
                    this.allNotes[id].completed = false;
                    this.allNotes[id].date = this.todayDate();
                }
                this.todoSave(this.allNotes);
            }
        }
    }
</script>
<style scoped>
    .isDone {
        text-decoration: line-through !important;
        color: rgba(0, 0, 0, 0.3607843137254902) !important;
    }

    .expand {
        height: auto !important;
        overflow: unset !important;
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    }

    #check svg {
        height: 24px;
        width: 24px;
    }
    #check path {
        fill:none;
        stroke-linecap:round;
        stroke-width:8;
        stroke:#2C3E50;
    }
    #check .frame {
        stroke-dasharray: 232 311;
        transition: stroke-dasharray 300ms;
    }
    #check .check {
        transition: transform 400ms 50ms;
    }
    #check .checked .frame {
        stroke-dasharray: 311 311;
        transition: stroke-dasharray 400ms 50ms;
    }
    #check .checked .check {
        transform: translateX(16%) translateY(-48%) rotate(30deg);
        transition: transform 300ms;
    }
</style>