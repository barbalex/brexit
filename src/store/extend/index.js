// @flow
import extendPage from './page'
import extendYearsOfEvents from './yearsOfEvents'
import extendEvents from './events'
import extendCommentaries from './commentaries'
import extendActors from './actors'
import extendLogin from './login'
import extendStore from './store'
import extendError from './error'

export default (store: Object): void => {
  extendPage(store)
  extendYearsOfEvents(store)
  extendEvents(store)
  extendCommentaries(store)
  extendActors(store)
  extendLogin(store)
  extendStore(store)
  extendError(store)
}
