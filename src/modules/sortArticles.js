// @flow
export default (articles: Array<Object>): Array<Object> =>
  [...articles].sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
