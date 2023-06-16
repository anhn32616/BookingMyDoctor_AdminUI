import http from '../utils/http'

const scheduleApi = {
    getAllSchedule(params) {
        return http.get('/schedule', { params: params })
    },
    addSchedule(data, config) {
        return http.post('/schedule', data, config)
    },
    updateSchedule(data, config) {
        console.log(data.id);
        return http.put(`/schedule/${data.id}`, data, config)
    },
    getDetailSchedule(id) {
        return http.get(`/schedule/${id}`)
    },
    deleteSchedule(id, config) {
        return http.delete(`/schedule/${id}`, { id: id }, config)
    }
}
export default scheduleApi