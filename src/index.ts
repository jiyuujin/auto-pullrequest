import { SheetService } from './services/sheetService'
import { TaskService } from './services/taskService'

import { getDayFormat } from './utils'

declare let global: any

global.createNewSpreadsheet = (): void => {
    const title = `New File ${getDayFormat()}`
    SheetService.createNewFile(title)
}

global.postDaily = (): void => {
    TaskService.postDaily()
}
