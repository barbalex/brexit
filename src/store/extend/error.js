// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.error, {
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
}
