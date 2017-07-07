// @flow
import app from 'ampersand-app'
import map from 'lodash/map'
import sortMonthlyEvents from './sortMonthlyEvents'

const options = {
  include_docs: true,
  startkey: 'monthlyEvents_',
  endkey: 'monthlyEvents_\uffff',
}

export default async (store: Object): Promise<Array<Object>> => {
  try {
    const result = await app.db.allDocs(options)
    let monthlyEvents = map(result.rows, 'doc')
    monthlyEvents = sortMonthlyEvents(monthlyEvents)
    return monthlyEvents
  } catch (error) {
    store.error.showError('Error fetching monthly events:', error)
    return []
  }
}
