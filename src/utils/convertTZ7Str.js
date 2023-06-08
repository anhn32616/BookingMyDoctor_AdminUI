import strftime from 'strftime'
import convertTZ from './convertTZ'

function convertTZ7Str(date) {
    return strftime('%Y-%m-%dT%H:%M:%S', convertTZ(date))
}
export default convertTZ7Str
