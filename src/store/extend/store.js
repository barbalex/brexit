// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    editing: false,
    toggleEditing: action('toggleEditing', () => {
      store.editing = !store.editing
    }),
    updateAvailable: false,
    setUpdateAvailable: action(
      'setUpdateAvailable',
      (updateAvailable: boolean) => {
        if (updateAvailable) {
          store.updateAvailable = true
          setTimeout(() => {
            store.updateAvailable = false
          }, 1000 * 30)
        } else {
          store.updateAvailable = false
        }
      }
    ),
  })
}
