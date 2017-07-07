// @flow
export default (publications: Array<Object>): Array<Object> =>
  publications.sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
