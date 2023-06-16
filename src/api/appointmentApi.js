import http from '../utils/http'

const appointmentApi = {
    getAllAppointment(params) {
        return http.get('/appointment', { params: params })
    },
    addAppointment(data, config) {
        return http.post('/appointment', data, config)
    },
    getDetailAppointment(id) {
        return http.get(`/appointment/${id}`)
    },
    deleteAppointment(id, config) {
        return http.delete(`/appointment/${id}`, { id: id }, config)
    },
    handleReportAppointment(id, data, config) {
        return http.put(`/appointment/handle-report/${id}`, data, config)
    }
}
export default appointmentApi