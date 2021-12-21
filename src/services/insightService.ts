import { getCurrentDate } from './dateService'
import { ApiService } from './apiService'
import { SlackService } from './slackService'

import { SLACK_INCOMING_API, INSIGHT_API, INSIGHT_KEY, SPREADSHEET_NAME } from '~/constants'

const ss = SpreadsheetApp.openById(SPREADSHEET_NAME)

export class InsightService {
  static analyze(sheetName, siteName, siteUrl) {
    const sheet = ss.getSheetByName(sheetName)

    const lastRow = sheet.getLastRow()
    const target = sheet.getRange(lastRow + 1, 1)
    target.setValue(getCurrentDate())

    // デスクトップとモバイルの両方を計測
    const request = [this.fetchQuery(siteUrl, true), this.fetchQuery(siteUrl, false)]

    try {
      const res = [ApiService.getApi(request[0]), ApiService.getApi(request[1])]

      const resData = [JSON.parse(res[0].getContentText()), JSON.parse(res[1].getContentText())]

      const pcResData = this.convertResult(0, resData[0])

      sheet.getRange(lastRow + 1, 2, pcResData.length, pcResData[0].length).setValues(pcResData)

      const botMessage = {
        text: '分析が終了しました',
      }

      SlackService.sendMessage(SLACK_INCOMING_API, JSON.stringify(botMessage))
    } catch (err) {
      Logger.log(err)
      return
    }
  }

  static fetchQuery(websiteUrl, isPc) {
    const parameters = {
      url: encodeURIComponent(websiteUrl),
      key: INSIGHT_KEY,
    }

    const category = ['accessibility', 'best-practices', 'performance', 'pwa', 'seo']

    let query = INSIGHT_API + '?'
    for (const key in parameters) {
      query += '&' + key + '=' + parameters[key]
    }

    category.forEach(function (tmp) {
      query += '&category=' + tmp
    })

    if (isPc) {
      query += '&strategy=desktop'
    } else {
      query += '&strategy=mobile'
    }

    return query
  }

  static convertResult(type, content) {
    let arr = [[]]

    arr[0].push(type === 0 ? 'desktop' : 'mobile')

    // アクセシビリティ
    arr[0].push(content.lighthouseResult.categories['accessibility'].score)
    // ベストプラクティス
    arr[0].push(content.lighthouseResult.categories['best-practices'].score)
    // パフォーマンス
    arr[0].push(content.lighthouseResult.categories['performance'].score)
    // プログレッシブウェブアプリ
    arr[0].push(content.lighthouseResult.categories['pwa'].score)
    // サーチエンジンオプティマイゼイション
    arr[0].push(content.lighthouseResult.categories['seo'].score)

    // コンテンツの初回ペイント
    arr[0].push(content.lighthouseResult.audits['first-contentful-paint'].displayValue)
    // 速度インデックス
    arr[0].push(content.lighthouseResult.audits['speed-index'].displayValue)
    // インタラクティブになるまでの時間
    arr[0].push(content.lighthouseResult.audits['interactive'].displayValue)
    // 意味のあるコンテンツの初回ペイント
    arr[0].push(content.lighthouseResult.audits['first-meaningful-paint'].displayValue)
    // CPU の初回アイドル
    arr[0].push(content.lighthouseResult.audits['first-cpu-idle'].displayValue)
    // 入力の待ち時間 (推定)
    arr[0].push(content.lighthouseResult.audits['estimated-input-latency'].displayValue)

    return arr
  }
}
