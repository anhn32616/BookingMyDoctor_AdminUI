const getDaysOfWeekBetweenDates = ( sDate, eDate) => {
    const startDate = new Date(sDate)
    const endDate = new Date(eDate)

    endDate.setDate(endDate.getDate() + 1)

    const daysOfWeek = []

    let i = 0

    while (i < 7 && startDate < endDate) {
        daysOfWeek.push(startDate.getDay())
        startDate.setDate(startDate.getDate() + 1)
        i++
    }

    return daysOfWeek
}

export default getDaysOfWeekBetweenDates