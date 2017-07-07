// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncMonthlyPublications = Loadable({
  loader: () => import('./Publications'),
  loading: LoadingComponent,
})

export default AsyncMonthlyPublications
