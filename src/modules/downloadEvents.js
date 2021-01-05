import app from 'ampersand-app'
import map from 'lodash/map'
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'

import sortEvents from './sortEvents'
import addWorksheetToExceljsWorkbook from './addWorksheetToExceljsWorkbook'
import downloadExceljsWorkbook from './downloadExceljsWorkbook'

const downloadEvents = async (store) => {
  const options = {
    include_docs: true,
    startkey: `events_`,
    endkey: `events_\uffff`,
  }
  let result
  try {
    result = await app.db.allDocs(options)
  } catch (error) {
    store.error.showError('Error fetching events:', error)
    return []
  }
  let events = map(result.rows, 'doc')
  events = sortEvents(events)
  const workbook = new ExcelJs.Workbook()
  const data = events.map((ev) => ({
    datum: `${ev._id.substring(7, 11)}.${ev._id.substring(
      12,
      14,
    )}.${ev._id.substring(15, 17)}`,
    type: ev.eventType ?? '',
    links: ev.links?.map((l) => l.url).join(', ') ?? '',
    order: ev.order ?? '',
    tags: ev.tags?.join(', ') ?? '',
    title: ev.title ?? '',
  }))
  addWorksheetToExceljsWorkbook({
    workbook,
    title: 'Events',
    data,
  })
  downloadExceljsWorkbook({
    store,
    fileName: `Events`,
    workbook,
  })
}

export default downloadEvents
