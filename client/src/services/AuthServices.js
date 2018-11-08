import Api from '@/services/Api'

export default {
    auth(params) {
        return Api().post('users', params)
    },
    saveAvatar(data) {
        return Api().put('users/avatar', data)
    },
    updateDetails(params) {
        return Api().put('users', params)
    }
}