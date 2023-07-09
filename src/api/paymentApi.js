import http from '../utils/http'

const paymentApi = {
    getAllPayment(params) {
        return http.get('/payment', { params: params })
    },

    getDetailPayment(id) {
        return http.get(`/payment/${id}`)
    },
    deletePayment(id, config) {
        return http.delete(`/payment/${id}`, { id: id }, config)
    }
}
export default paymentApi