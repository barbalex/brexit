// @flow
export default (monthlyEvents: Array<Object>): Array<Object> =>
  monthlyEvents.sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
