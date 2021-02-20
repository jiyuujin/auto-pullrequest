export class ApiService {
    /**
     * POST通信を行う
     * @param api 
     * @param payload 
     */
    static postApi(api: string, payload: string) {
        return UrlFetchApp.fetch(api, {
            method: 'post',
            contentType: 'application/json',
            muteHttpExceptions: true,
            payload: payload
        })
    }
}
