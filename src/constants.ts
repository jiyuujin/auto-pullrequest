import { getPropertyValue } from '~/utils'

export const SLACK_INCOMING_API = getPropertyValue('SLACK_INCOMING_API')
export const GITHUB_API = 'https://api.github.com/graphql'
export const INSIGHT_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
export const GITHUB_LABEL_ID = getPropertyValue('GITHUB_LABEL_ID')
export const GITHUB_TOKEN = getPropertyValue('GITHUB_TOKEN')
export const INSIGHT_KEY = getPropertyValue('INSIGHT_KEY')
export const SPREADSHEET_NAME = getPropertyValue('SPREADSHEET_NAME')

export const products = [
  {
    sheetName: 'webneko-blog',
    name: 'Web猫ブログ',
    url: 'https://webneko.dev/',
  },
  {
    sheetName: 'yuukit-me',
    name: 'Web Developer | Yuma Kitamura',
    url: 'https://yuukit.me/',
  },
  {
    sheetName: 'covid19',
    name: 'COVID19 (新型コロナウイルス感染症) について',
    url: 'https://stopcovid19.vercel.app/',
  },
  {
    sheetName: 'routine',
    name: 'Routine | Daily',
    url: 'https://routine.nekohack.app/',
  },
]
