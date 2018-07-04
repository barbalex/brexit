// @flow
export default (events: Array<Object>): Array<Object> =>
  [...events].sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
