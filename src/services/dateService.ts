const JP_CAL = 'ja.japanese#holiday@group.v.calendar.google.com'

/**
 * 平日か否かを判定する
 * @param date 日付
 */
export const isBusinessDay = (date: Date) => {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return false
    }

    const calJa = CalendarApp.getCalendarById(JP_CAL)

    return calJa.getEventsForDay(date).length <= 0
}

/**
 * 月曜日を除いて平日か否かを判定する
 * @param date 日付
 */
export const isBusinessDayExceptMonday = (date: Date) => {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return false
    }

    if (date.getDay() == 1) {
        return false // 週次MTGのある月曜は走らせない
    }

    const calJa = CalendarApp.getCalendarById(JP_CAL)

    return calJa.getEventsForDay(date).length <= 0
}
