// @flow
// in development should return local path
import isDev from 'isdev'

const hostname = isDev
  ? `${window.location.hostname}:5984/bb`
  : `${window.location.hostname}/api/bb`

export default (): string => `${window.location.protocol}//${hostname}`
