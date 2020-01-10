// @flow
import app from 'ampersand-app'
import map from 'lodash/map'
import sortArticles from './sortArticles'

const options = {
  include_docs: true,
  startkey: 'commentaries_',
  endkey: 'commentaries_\uffff',
}

export default async (store: Object): Promise<Array<Object>> => {
  try {
    const result = await app.db.allDocs(options)
    let articles = map(result.rows, 'doc')
    articles = sortArticles(articles)
    return articles
  } catch (error) {
    store.error.showError('Error fetching articles:', error)
    return []
  }
}
