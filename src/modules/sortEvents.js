//      
export default (events               )                =>
  [...events].sort((a, b) => {
    if (a._id < b._id) return 1
    return -1
  })
