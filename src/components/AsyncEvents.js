// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncEvents = Loadable({
  loader: () => import('./Events'),
  loading: LoadingComponent,
})

export default AsyncEvents
