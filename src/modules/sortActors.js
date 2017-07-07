// @flow
export default (actors: Array<Object>): Array<Object> =>
  actors.sort((a, b) => {
    if (a._id < b._id) return -1
    return 1
  })
