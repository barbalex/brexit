// @flow
import { extendObservable, action, computed } from 'mobx'
import app from 'ampersand-app'
import slug from 'speakingurl'

import getPathFromDocId from '../../modules/getPathFromDocId'
import getActors from '../../modules/getActors'
import sortActors from '../../modules/sortActors'

export default (store: Object): void => {
  extendObservable(store.actors, {
    actors: [],

    // cache the id, not the entire doc
    // advantage: on first load actors is empty so no activeActor can be gotten
    // but if id is used, it can be cached
    activeActorId: null,

    activeActor: computed(
      (): ?Object =>
        store.actors.actors.find(
          actor => actor._id === store.actors.activeActorId
        ),
      { name: `activeActor` }
    ),

    getActorsCallback: null,

    getActors: action('getActors', async (): Promise<void> => {
      try {
        const actors = await getActors(store)
        store.actors.actors = actors
        if (store.actors.getActorsCallback) {
          store.actors.getActorsCallback()
          store.actors.getActorsCallback = null
        }
      } catch (error) {
        store.error.showError({
          msg: error,
        })
      }
    }),

    newActor: action('newActor', (category: string): void => {
      const categorySlugified = slug(category, { lower: true })
      const _id = `actors_${categorySlugified}`
      const draft = true
      const article = 'IA=='
      const type = 'actors'
      const actor = { _id, category, draft, article, type }
      store.actors.saveActor(actor)
    }),

    showNewActor: false,

    setShowNewActor: action('setShowNewActor', show => {
      store.actors.showNewActor = show
    }),

    getActor: action('getActor', (id: ?string, history: Object): void => {
      if (!id) {
        history.push('/actors')
        store.actors.activeActorId = null
      } else {
        store.actors.activeActorId = id
        const path = getPathFromDocId(id)
        history.push(`/${path}`)
      }
    }),

    updateActorsInCache: action(
      'updateActorsInCache',
      (actor: Object): void => {
        // first update the actor in store.actors.actors
        store.actors.actors = store.actors.actors.filter(
          a => a._id !== actor._id
        )
        store.actors.actors.push(actor)
        store.actors.actors = sortActors(store.actors.actors)
      }
    ),

    revertCache: action(
      'revertCache',
      (oldActors: Array<Object>, oldActiveActorId: string): void => {
        store.actors.actors = oldActors
        store.actors.activeActorId = oldActiveActorId
      }
    ),

    saveActor: action('saveActor', async (actor: Object): Promise<void> => {
      // keep old cache in case of error
      const oldActors = store.actors.actors
      const oldActiveActorId = store.actors.activeActorId
      // optimistically update in cache
      store.actors.updateActorsInCache(actor)
      try {
        const resp = await app.db.put(actor)
        // resp.rev is new rev
        actor._rev = resp.rev
        // definitely update in cache
        store.actors.updateActorsInCache(actor)
      } catch (error) {
        store.actors.revertCache(oldActors, oldActiveActorId)
        store.error.showError({
          title: 'Error saving actor:',
          msg: error,
        })
      }
    }),

    removeActorFromCache: action(
      'removeActorFromCache',
      (actor: Object): void => {
        // first update the actor in store.actors.actors
        store.actors.actors = store.actors.actors.filter(
          thisActor => thisActor._id !== actor._id
        )
        store.actors.actors = sortActors(store.actors.actors)
        // now update store.actors.activeActorId if it is the active actor's _id
        const isActiveActor = store.actors.activeActorId === actor._id
        if (isActiveActor) store.actors.activeActorId = null
      }
    ),

    removeActor: action('removeActor', (actor: Object): void => {
      // keep old cache in case of error
      const oldActors = store.actors.actors
      const oldActiveActorId = store.actors.activeActorId
      // optimistically remove event from cache
      store.actors.removeActorFromCache(actor)
      app.db.remove(actor).catch(error => {
        // oops. Revert optimistic removal
        store.actors.revertCache(oldActors, oldActiveActorId)
        store.error.showError({
          title: 'Error removing actor:',
          msg: error,
        })
      })
    }),

    actorToRemove: null,

    setActorToRemove: action('setActorToRemove', (actor: Object): void => {
      store.actors.actorToRemove = actor
    }),

    toggleDraftOfActor: action('toggleDraftOfActor', (actor: Object): void => {
      if (actor.draft === true) {
        delete actor.draft
      } else {
        actor.draft = true
      }
      store.actors.saveActor(actor)
    }),
  })
}
