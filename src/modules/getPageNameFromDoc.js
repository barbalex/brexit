// @flow
/**
 * TODO: unused after refactoring routing?
 */
import getYearFromEventId from './getYearFromEventId'
import getMonthFromEventId from './getMonthFromEventId'

export default (doc: Object): string => {
  const docIsEmpty = Object.keys(doc).length === 0
  if (docIsEmpty) return 'Login'
  if (doc.type !== 'monthlyEvents') return doc.title
  // if it is a monthly event:
  const year = getYearFromEventId(doc._id)
  const month = getMonthFromEventId(doc._id)
  return `${month} ${year}`
}
