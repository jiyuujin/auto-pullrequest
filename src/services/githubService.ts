import { ApiService } from './apiService'
import { SlackService } from './slackService'

import { SLACK_INCOMING_API, GITHUB_API, GITHUB_LABEL_ID, GITHUB_TOKEN } from '~/constants'

const options: {
    Authorization: string
    Accept: string
} = {
    'Authorization' : 'Bearer ' +  GITHUB_TOKEN,
    'Accept' : 'application/vnd.github.starfire-preview+json',
}

export class GithubService {
    /**
     * 新しいissueを切る
     * @param repo
     * @param title
     * @param body
     */
    static createNewIssue(repo: string, title: string, body: string) {
        const mutation = `mutation {
            createIssue(input:{repositoryId:"${repo}", title:"${title}", body:"${body}", labelIds: ["${GITHUB_LABEL_ID}"]}) {
                issue {
                    title,
                    url
                }
            }
        }`

        const payload = JSON.stringify({ query: mutation })

        const response = ApiService.postAuthenticationApi(GITHUB_API, options, payload)
        const json = JSON.parse(response.getContentText())
        Logger.log(json)

        const botMessage = {
            text: '新しいissueを切りました'
        }

        SlackService.sendMessage(
            SLACK_INCOMING_API,
            JSON.stringify(botMessage)
        )
    }
}
