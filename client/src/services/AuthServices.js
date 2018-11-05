import Api from '@/services/Api'
export default {
    auth(params) {
        return Api().post('users', params)
    }
}