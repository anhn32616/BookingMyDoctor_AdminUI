import http from '../utils/http'

const userApi = {
    getAllUser(params) {
        return http.get('/user', { params: params })
    },
    getAllPatient(params) {
        return http.get('/user', { params: {...params, roleName: 'ROLE_PATIENT'} })
    },
    addUser(data, config) {
        return http.post('/user', data, config)
    },
    updateUser(data, config) {
        return http.put(`/user/${data.id}`, data, config)
    },
    getDetailUser(id) {
        return http.get(`/user/${id}`)
    },
    deleteUser(id, config) {
        return http.delete(`/user/${id}`, { id: id }, config)
    },
    openCloseUser(id, config) {
        return http.put(`/user/open-close/${id}`, { id: id }, config)
    },
    getMyProfile() {
        return http.get('/user/profile')
    },
    getBaseProfile() {
        return http.get('/user/users-base-info')
    },
    getBaseProfileById(id) {
        return http.get('/user/users-base-info', { params : {userId: id}})
    },
}
export default userApi