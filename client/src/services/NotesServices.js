import Api from '@/services/Api'

export default {
    fetchNotes(id) {
        return Api().get('notes', {
            params: {
                id: id
            }
        })
    },
    addNote(params) {
        return Api().post('notes', params)
    },
    updateNote(params) {
        return Api().put('notes/' + params.id, params)
    },
    deleteNote(id) {
        return Api().delete('notes/' + id)
    }
}