import Api from '@/services/Api'

export default {
    fetchNotes () {
        return Api().get('notes')
    },
    addNote(params) {
        return Api().post('notes', params)
    },
    updatePost (params) {
        return Api().put('notes/' + params.id, params)
    },
    deleteNote (id) {
        return Api().delete('notes/' + id)
    }
}