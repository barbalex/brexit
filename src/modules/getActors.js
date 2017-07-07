// @flow
import app from 'ampersand-app'
import map from 'lodash/map'
import sortActors from './sortActors'

const options = {
  include_docs: true,
  startkey: 'actors_',
  endkey: 'actors_\uffff',
}

export default async (store: Object): Promise<Array<Object>> => {
  try {
    const result = await app.db.allDocs(options)
    let actors = map(result.rows, 'doc')
    actors = sortActors(actors)
    return actors
  } catch (error) {
    store.error.showError('Error fetching actors:', error)
    return []
  }
}
