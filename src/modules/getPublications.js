// @flow
import app from 'ampersand-app'
import map from 'lodash/map'
import sortPublications from './sortPublications'

const options = {
  include_docs: true,
  startkey: 'publications_',
  endkey: 'publications_\uffff',
}

export default async (store: Object): Promise<Array<Object>> => {
  try {
    const result = await app.db.allDocs(options)
    let publications = map(result.rows, 'doc')
    publications = sortPublications(publications)
    return publications
  } catch (error) {
    store.error.showError('Error fetching publications:', error)
    return []
  }
}
