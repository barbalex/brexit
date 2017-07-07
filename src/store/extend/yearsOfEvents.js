// @flow
import { extendObservable, action } from 'mobx'
import moment from 'moment'

import getYearsOfEvents from '../../modules/getYearsOfEvents'

export default (store: Object): void => {
  extendObservable(store.yearsOfEvents, {
    yearsOfEvents: [parseInt(moment().format('YYYY'), 0)],

    getYearsOfEvents: action('getYearsOfEvents', async (): Promise<void> => {
      try {
        const years = await getYearsOfEvents(store)
        store.yearsOfEvents.yearsOfEvents = years
      } catch (error) {
        console.log('yearsOfEventsStore, error getting years of events', error)
      }
    }),

    activeEventYears: [parseInt(moment().format('YYYY'), 0)],

    setActiveEventYears: action('setActiveEventYears', activeEventYears => {
      store.yearsOfEvents.activeEventYears = activeEventYears
    }),
  })
}
