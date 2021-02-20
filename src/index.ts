import { SheetService } from './services/sheetService'
import { getCurrentYear, getCurrentMonth, getCurrentDate } from './services/dateService'
import { GithubService } from './services/githubService'

import { getPropertyValue, getDayFormat } from './utils'

declare let global: any

global.createNewSpreadsheet = (): void => {
    const title = `New File ${getDayFormat()}`
    SheetService.createNewFile(title)
}

global.createNewIssue = (): void => {
    const GITHUB_REPO_ID = getPropertyValue('GITHUB_REPO_ID')

    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth()-1, date.getDate())
    const currentYear = getCurrentYear(lastMonth)
    const currentMonth = getCurrentMonth(lastMonth)

    const title = `[feat] ${getCurrentDate()} 更新`
    const body = `## はじめに\n${currentYear}年 ${currentMonth}月 を振り返ってみます。`

    GithubService.createNewIssue(GITHUB_REPO_ID, title, body)
}
