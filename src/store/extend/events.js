// @flow
import { extendObservable, action, computed } from 'mobx'
import app from 'ampersand-app'
import moment from 'moment'
import slug from 'speakingurl'

import getEvents from '../../modules/getEvents'
import sortEvents from '../../modules/sortEvents'

export default (store: Object): void => {
  extendObservable(store.events, {
    events: [],

    // cache the id, not the entire doc
    // advantage: on first load events is empty so no activeEvent can be gotten
    // but if id is used, this can be cached
    activeEventId: null,

    activeEvent: computed(
      (): ?Object =>
        store.events.events.find(
          event => event._id === store.events.activeEventId
        ),
      { name: `activeEvent` }
    ),

    getEventsCallback: null,

    getEvents: action('getEvents', async (years: Array<number>): Promise<
      void
    > => {
      try {
        const events = await getEvents(store, years)
        store.events.events = events
        if (store.events.getEventsCallback) {
          store.events.getEventsCallback()
          store.events.getEventsCallback = null
        }
      } catch (error) {
        store.error.showError({
          msg: error,
        })
      }
    }),

    newEvent: action('newEvent', (event: Object): void => {
      const title = event.title
      const year = moment(event.date).year()
      const month = moment(event.date).format('MM')
      const day = moment(event.date).format('DD')
      const _id = `events_${year}_${month}_${day}_${slug(title)}`
      const type = 'events'
      const eventType = event.eventType || 'migration'
      const links = event.links || []
      const order = event.order || 99
      const tags = event.tags || []
      const newEvent = {
        _id,
        type,
        title,
        links,
        eventType,
        order,
        tags,
      }
      store.events.activeEventId = _id
      store.events.saveEvent(newEvent)
    }),

    showNewEvent: false,

    setShowNewEvent: action('setShowNewEvent', show => {
      store.events.showNewEvent = show
    }),

    getEvent: action('getEvent', (id: ?string): void => {
      if (!id) {
        store.events.activeEventId = null
      } else {
        if (store.events.events.length === 0) {
          // on first load events is empty
          // need to wait until onGetEvents fires
          store.events.getEventsCallback = () => {
            store.events.activeEventId = id
          }
        } else {
          store.events.activeEventId = id
        }
      }
    }),

    updateEventsInCache: action(
      'updateEventsInCache',
      (event: Object): void => {
        // first update the event
        store.events.events = store.events.events.filter(
          thisEvent => thisEvent._id !== event._id
        )
        store.events.events.push(event)
        store.events.events = sortEvents(store.events.events)
      }
    ),

    revertCache: action(
      'revertCache',
      (oldEvents: Array<Object>, oldActiveEventId: string): void => {
        store.events.events = oldEvents
        store.events.activeEventId = oldActiveEventId
      }
    ),

    saveEvent: action('saveEvent', async (event: Object): Promise<void> => {
      // keep old cache in case of error
      const oldEvents = store.events.events
      const oldActiveEventId = store.events.activeEventId
      // optimistically update in cache
      store.events.updateEventsInCache(event)
      try {
        const resp = await app.db.put(event)
        event._rev = resp.rev
        // definitely update in cache
        store.events.updateEventsInCache(event)
      } catch (error) {
        store.events.revertCache(oldEvents, oldActiveEventId)
        store.error.showError({
          title: 'Error saving event:',
          msg: error,
        })
      }
    }),
    removeEventFromCache: action(
      'removeEventFromCache',
      (event: Object): void => {
        // first update the event in store.events.events
        store.events.events = store.events.events.filter(
          thisEvent => thisEvent._id !== event._id
        )
        store.events.events = sortEvents(store.events.events)
        // now update it in store.events.activeEvent if it is the active event
        const isActiveEvent = store.events.activeEventId === event._id
        if (isActiveEvent) store.events.activeEventId = null
      }
    ),

    removeEvent: action('removeEvent', (event: Object): void => {
      // keep old cache in case of error
      const oldEvents = store.events.events
      const oldActiveEventId = store.events.activeEventId
      // optimistically remove event from cache
      store.events.removeEventFromCache(event)
      app.db.remove(event).catch(error => {
        // oops. Revert optimistic removal
        store.events.revertCache(oldEvents, oldActiveEventId)
        store.error.showError({
          title: 'Error removing event:',
          msg: error,
        })
      })
    }),

    eventToRemove: null,

    setEventToRemove: action('setEventToRemove', (event: Object): void => {
      store.events.eventToRemove = event
    }),

    replaceEvent: action('replaceEvent', (event: Object): void => {
      // if an event's title or date are changed, it has to be replaced with a new one
      store.events.newEvent(event)
      store.events.removeEvent(event)
    }),
  })
}
