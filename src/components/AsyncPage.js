// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncMonthlyPage = Loadable({
  loader: () => import('./Page'),
  loading: LoadingComponent,
})

export default AsyncMonthlyPage
