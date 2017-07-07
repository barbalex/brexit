// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    editing: false,
    toggleEditing: action('toggleEditing', () => {
      store.editing = !store.editing
    }),
  })
}
