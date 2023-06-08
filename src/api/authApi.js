import http from '../utils/http'

const authApi = {
    login(data) {
        return http.post('/auth/login', data)
    },
//     addHospital(data, config) {
//         return http.post('/hospital', data, config)
//     },
//     updateHospital(data, config) {
//         console.log(data.id);
//         return http.put(`/hospital/${data.id}`, data, config)
//     },
//     getDetailHospital(id) {
//         return http.get(`/hospital/${id}`)
//     },
//     deleteHospital(id, config) {
//         return http.delete(`/hospital/${id}`, { id: id }, config)
//     }
}
export default authApi