// @flow
import extendStore from './extend'
import moment from 'moment'

function Store(): void {
  this.page = {
    activePage: null,
    editing: false,
    showMeta: false,
    getPage: null,
    savePage: null,
    addPageAttachments: null,
    removePageAttachment: null,
  }
  this.monthlyEvents = {
    monthlyEvents: [],
    activeMonthlyEventId: null,
    activeMonthlyEvent: null,
    getMonthlyEventsCallback: null,
    getMonthlyEvents: null,
    getMonthlyEvent: null,
    updateMonthlyEventsInCache: null,
    revertCache: null,
    saveMonthlyEvent: null,
  }
  this.yearsOfEvents = {
    yearsOfEvents: [parseInt(moment().format('YYYY'), 0)],
    getYearsOfEvents: null,
    activeEventYears: [parseInt(moment().format('YYYY'), 0)],
    setActiveEventYears: null,
  }
  this.events = {
    events: [],
    activeEventId: null,
    activeEvent: null,
    getEventsCallback: null,
    getEvents: null,
    newEvent: null,
    showNewEvent: null,
    setShowNewEvent: null,
    getEvent: null,
    updateEventsInCache: null,
    revertCache: null,
    saveEvent: null,
    removeEventFromCache: null,
    removeEvent: null,
    eventToRemove: null,
    setEventToRemove: null,
    replaceEvent: null,
  }
  this.commentaries = {
    commentaries: [],
    activeCommentaryId: null,
    activeCommentary: null,
    getCommentariesCallback: null,
    getCommentaries: null,
    showNewCommentary: false,
    toggleShowNewCommentary: null,
    newCommentary: null,
    getCommentary: null,
    updateCommentariesInCache: null,
    revertCache: null,
    saveCommentary: null,
    removeCommentaryFromCache: null,
    removeCommentary: null,
    commentaryToRemove: null,
    setCommentaryToRemove: null,
    toggleDraftOfCommentary: null,
  }
  this.publications = {
    publications: [],
    activePublicationCategory: null,
    activePublicationId: null,
    activePublication: null,
    getPublicationsCallback: null,
    getPublications: null,
    newPublication: null,
    showNewPublication: null,
    setShowNewPublication: null,
    getPublication: null,
    updatePublicationInCache: null,
    revertCache: null,
    savePublication: null,
    removePublicationFromCache: null,
    removePublication: null,
    toggleDraftOfPublication: null,
    getPublicationCategories: null,
    setPublicationCategory: null,
  }
  this.actors = {
    actors: [],
    activeActorId: null,
    activeActor: null,
    getActorsCallback: null,
    getActors: null,
    newActor: null,
    showNewActor: false,
    setShowNewActor: null,
    getActor: null,
    updateActorsInCache: null,
    revertCache: null,
    saveActor: null,
    removeActorFromCache: null,
    removeActor: null,
    actorToRemove: null,
    setActorToRemove: null,
    toggleDraftOfActor: null,
  }
  /*
   * contains email of logged in user
   * well, it is saved in localStorage as window.localStorage.email
   * app.js sets default email (null) if not exists on app start
   */
  this.login = {
    getLogin: null,
    login: null,
    logout: null,
    email: null,
  }
  /*
   * receives an error object with two keys: title, msg
   * keeps error objects in the array errors
   * deletes errors after a defined time - the time while the error will be shown to the user
   *
   * if a view wants to inform of an error it
   * calls action showError and passes the object
   *
   * the errorStore triggers, passing the errors array
   * ...then triggers again after removing the last error some time later
   *
   * Test: app.store.error.showError({title: 'testTitle', msg: 'testMessage'})
   * template: app.store.error.showError({title: 'title', msg: error})
   */
  this.error = {
    errors: [],
    showError: null,
  }
  this.editing = false
  this.toggleEditing = null
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
