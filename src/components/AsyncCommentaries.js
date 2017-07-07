// @flow
import Loadable from 'react-loadable'

import LoadingComponent from './LoadingComponent'

const AsyncCommentaries = Loadable({
  loader: () => import('./Commentaries'),
  loading: LoadingComponent,
})

export default AsyncCommentaries
