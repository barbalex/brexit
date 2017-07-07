// @flow
import app from 'ampersand-app'
import getYearFromEventId from './getYearFromEventId'

const options = {
  include_docs: false,
  startkey: 'events_0000',
  endkey: 'events_9999_\uffff',
  descending: false,
  limit: 1,
}

export default async (store: Object): Promise<number> => {
  try {
    const result = await app.db.allDocs(options)
    const id = result.rows[0].id
    const year = getYearFromEventId(id)
    return year
  } catch (error) {
    store.error.showError('Error fetching events:', error)
    return new Date().getFullYear()
  }
}
