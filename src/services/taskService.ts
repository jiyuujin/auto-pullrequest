import { isBusinessDay } from './dateService'
import { SlackService } from './slackService'

import { getPropertyValue } from '~/utils'

export class TaskService {
    static postDaily() {
        if (isBusinessDay(new Date())) {
            return
        }

        const botMessage = {
            text : `*■本日の予定報告 (${Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd')})*`
        }

        SlackService.sendMessage(getPropertyValue('SLACK_INCOMING_API'), JSON.stringify(botMessage))
    }
}
