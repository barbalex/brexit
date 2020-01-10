// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncArticles = Loadable({
  loader: () => import('./Articles'),
  loading: LoadingComponent,
})

export default AsyncArticles
