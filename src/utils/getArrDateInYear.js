import strftime from 'strftime'
export default function getArrDateInYear (year = 2022) {
    const arrDateStrEnd = []
    for (let i = 1; i<=12; i++ ) {
        const date = new Date(`${year}-${i}-01`)
        var firstDay = strftime('%Y-%m-%d', new Date(date.getFullYear(), date.getMonth(), 1))
        var lastDay = strftime('%Y-%m-%d', new Date(date.getFullYear(), date.getMonth() + 1, 0))
        arrDateStrEnd.push({ begin: firstDay, end: lastDay, index: i })
    }
    return arrDateStrEnd
}