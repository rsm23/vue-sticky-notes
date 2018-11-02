import Api from '@/services/Api'

export default {
    fetchNotes () {
        return Api().get('notes')
    },
    addNote(params) {
        return Api().post('notes', params)
    },
    deleteNote (id) {
        return Api().delete('notes/' + id)
    }
}