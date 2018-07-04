// @flow
export default (commentaries: Array<Object>): Array<Object> =>
  [...commentaries].sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
