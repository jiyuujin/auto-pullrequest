/**
 * 現在の日付を取得する
 */
export const getCurrentYear = (date) => {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy')
}

/**
 * 現在の日付を取得する
 */
export const getCurrentMonth = (date) => {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'MM')
}

/**
 * 現在の日付を取得する
 */
export const getCurrentDate = () => {
    return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm')
}
