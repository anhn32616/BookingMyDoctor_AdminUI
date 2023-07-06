import http from '../utils/http'

const statisticalApi = {
    getStatistical(params) {
        return http.get('/statistical',{ params: params })
    },
    getQuantityStatistical() {
        return http.get('/statistical/quantity')
    }, 
} 
export default statisticalApi