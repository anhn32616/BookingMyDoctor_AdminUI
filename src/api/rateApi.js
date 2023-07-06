import http from '../utils/http'

const rateApi = {
    getAllRate(params) {
        return http.get('/rate', { params: params })
    },
    getRateByAppointmentId(id) {
        return http.get(`/rate/appointment/${id}`)
    }
}
export default rateApi