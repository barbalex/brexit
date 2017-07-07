// @flow
import app from 'ampersand-app'
import map from 'lodash/map'
import sortCommentaries from './sortCommentaries'

const options = {
  include_docs: true,
  startkey: 'commentaries_',
  endkey: 'commentaries_\uffff',
}

export default async (store: Object): Promise<Array<Object>> => {
  try {
    const result = await app.db.allDocs(options)
    let commentaries = map(result.rows, 'doc')
    commentaries = sortCommentaries(commentaries)
    return commentaries
  } catch (error) {
    store.error.showError('Error fetching commentaries:', error)
    return []
  }
}
