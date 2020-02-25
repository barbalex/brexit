//      
// in development should return local path
import isDev from 'isdev'

const hostname = isDev
  ? `${window.location.hostname}:5984/brexit`
  : `${window.location.hostname}/api/brexit`

export default ()         => `${window.location.protocol}//${hostname}`
