import http from '../utils/http'

const doctorApi = {
    getAllDoctor(params) {
        return http.get('/doctor', { params: params })
    },
    addDoctor(data, config) {
        return http.post('/doctor', data, config)
    },
    updateDoctor(data, config) {
        return http.put(`/doctor/${data.id}`, data, config)
    },
    getDetailDoctor(id) {
        return http.get(`/doctor/${id}`)
    },
    deleteDoctor(id, config) {
        return http.delete(`/doctor/${id}`, { id: id }, config)
    }
}
export default doctorApi