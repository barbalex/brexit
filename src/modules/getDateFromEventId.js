// @flow
import moment from 'moment'

export default (id: string): Date => {
  const idArray = id.split('_')
  const year = idArray[1]
  const month = idArray[2]
  const day = idArray[3]
  const dateString = `${day}.${month}.${year}`

  return moment(dateString, 'DD.MM.YYYY')
}
