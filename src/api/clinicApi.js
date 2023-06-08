import http from '../utils/http'

const clinicApi = {
    getAllClinic(params) {
        return http.get('/clinic', { params: params })
    },
    addClinic(data, config) {
        return http.post('/clinic', data, config)
    },
    updateClinic(data, config) {
        console.log(data.id);
        return http.put(`/clinic/${data.id}`, data, config)
    },
    getDetailClinic(id) {
        return http.get(`/clinic/${id}`)
    },
    deleteClinic(id, config) {
        return http.delete(`/clinic/${id}`, { id: id }, config)
    }
}
export default clinicApi