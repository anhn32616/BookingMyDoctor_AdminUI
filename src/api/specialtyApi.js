import http from '../utils/http'

const specialtyApi = {
    getAllSpecialty(params) {
        return http.get('/speciatly', { params: params })
    },
    addSpecialty(data, config) {
        return http.post('/speciatly', data, config)
    },
    updateSpecialty(data, config) {
        console.log(data.id);
        return http.put(`/speciatly/${data.id}`, data, config)
    },
    getDetailSpecialty(id) {
        return http.get(`/speciatly/${id}`)
    },
    deleteSpecialty(id, config) {
        return http.delete(`/speciatly/${id}`, { id: id }, config)
    }
}
export default specialtyApi