// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncMonthlyEvents = Loadable({
  loader: () => import('./MonthlyEvents'),
  loading: LoadingComponent,
})

export default AsyncMonthlyEvents
