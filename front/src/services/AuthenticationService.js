import Api From '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials)
    }
}

// AuthenticationService.register({
//     email: 'ndgutierrez@bancomercantil.com'
//     password: '123456'
// })