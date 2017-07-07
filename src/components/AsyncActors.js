// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncActors = Loadable({
  loader: () => import('./Actors'),
  loading: LoadingComponent,
})

export default AsyncActors
