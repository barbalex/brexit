//
// in development should return local path
import isDev from 'isdev'

export default () => {
  if (typeof window === `undefined`) return 'localhost:5984/brexit'

  const hostname = isDev
    ? `${window.location.hostname}:5984/brexit`
    : `${window.location.hostname}/api/brexit`

  return `${window.location.protocol}//${hostname}`
}
