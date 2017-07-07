// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncMonthlyLogin = Loadable({
  loader: () => import('./Login'),
  loading: LoadingComponent,
})

export default AsyncMonthlyLogin
