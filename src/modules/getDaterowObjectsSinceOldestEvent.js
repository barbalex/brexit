//
import moment from 'moment'
import max from 'lodash/max'
import getDateFromEventId from './getDateFromEventId'

export default (events, activeEventYears) => {
  const oldestEvent = events[events.length - 1]
  if (oldestEvent) {
    const oldestDate = getDateFromEventId(oldestEvent._id)
    const daterowObjects = []
    const activeYearIsCurrentYear = activeEventYears.includes(
      parseInt(moment().format('YYYY'), 0),
    )
    let date = activeYearIsCurrentYear
      ? moment()
      : moment(`31.12.${max(activeEventYears)}`, 'DD.MM.YYYY')
    while (date >= oldestDate) {
      const year = moment(date).format('YYYY')
      const month = moment(date).format('MM')
      const day = moment(date).format('DD')
      const gbEvents = events.filter(
        (event) =>
          event._id.startsWith(`events_${year}_${month}_${day}`) &&
          event.eventType === 'gb',
      )
      const euEvents = events.filter(
        (event) =>
          event._id.startsWith(`events_${year}_${month}_${day}`) &&
          event.eventType === 'eu',
      )
      const bothEvents = events.filter(
        (event) =>
          event._id.startsWith(`events_${year}_${month}_${day}`) &&
          event.eventType === 'both',
      )
      // order
      gbEvents.sort((a, b) => (a.order || 99) - (b.order || 99))
      euEvents.sort((a, b) => (a.order || 99) - (b.order || 99))
      bothEvents.sort((a, b) => (a.order || 99) - (b.order || 99))
      const daterowObject = {
        date,
        gbEvents,
        euEvents,
        bothEvents,
      }
      if (gbEvents.length > 0 || euEvents.length > 0 || bothEvents.length > 0) {
        daterowObjects.push(daterowObject)
      }
      date = moment(date).subtract(1, 'days')
    }
    return daterowObjects
  }
  return []
}
