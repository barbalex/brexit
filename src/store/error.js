// @flow
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
import { action } from 'mobx'

export default (store: Object): Object => ({
  errors: [],
  showError: action('showError', (error: Object): void => {
    // const duration = 10000
    const duration = 100000000
    if (!error) {
      // user wants to remove error messages
      store.error.errors = []
    } else {
      if (error.msg && error.msg.message) {
        error.msg = error.msg.message
      }
      store.error.errors.unshift(error)
      setTimeout(() => {
        store.error.errors.pop()
      }, duration)
    }
  }),
})
