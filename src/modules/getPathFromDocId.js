//      
import last from 'lodash/last'

export default (id        )         => {
  let path = id
  if (path.startsWith('pages_')) path = path.slice(6)
  // last el may contain ?
  // need to encodeURIComponent or ? will be removed
  const pathArray = path.split('_')
  const lastEl = last(pathArray)
  pathArray.pop()
  const newPathArray = [...pathArray, encodeURIComponent(lastEl)]
  return newPathArray.join('/')
}
