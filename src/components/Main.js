// @flow
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { observer } from 'mobx-react'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AsyncPage from './AsyncPage'
import AsyncEvents from './AsyncEvents'
import AsyncCommentaries from './AsyncCommentaries'
import AsyncActors from './AsyncActors'
import AsyncLogin from './AsyncLogin'
import Errors from './Errors'
import UpdateAvailable from './UpdateAvailable'
import NotFound from './NotFound'
import storeContext from '../storeContext'

const Main = ({ login }: { login: boolean }) => {
  const store = useContext(storeContext)
  const { errors } = store.error

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Header />
        <Switch>
          <Redirect from="/chronology" exact to="/" />
          <Route
            path="/"
            exact
            render={() => {
              store.page.getPage('pages_events')
              return <AsyncEvents />
            }}
          />
          <Route
            path="/commentaries/:year/:month/:day/:title"
            exact
            render={({ match }) => {
              let { year, month, day, title } = match.params
              title = decodeURIComponent(title)
              store.page.getPage('pages_commentaries')
              store.commentaries.activeCommentaryId = `commentaries_${year}_${month}_${day}_${title}`
              return <AsyncCommentaries />
            }}
          />
          <Route
            path="/commentaries"
            exact
            render={() => {
              store.page.getPage('pages_commentaries')
              return <AsyncCommentaries />
            }}
          />
          <Route
            path="/actors/:category"
            exact
            render={({ match }) => {
              const { category } = match.params
              store.page.getPage('pages_actors')
              store.actors.activeActorId = `actors_${category}`
              return <AsyncActors />
            }}
          />
          <Route
            path="/actors"
            exact
            render={() => {
              store.page.getPage('pages_actors')
              return <AsyncActors />
            }}
          />
          <Route
            path="/links"
            exact
            render={() => {
              store.page.getPage('pages_links')
              return <AsyncPage />
            }}
          />
          <Route
            path="/aboutUs"
            exact
            render={() => {
              store.page.getPage('pages_aboutUs')
              return <AsyncPage />
            }}
          />
          <Route path="/login" exact component={AsyncLogin} />
          <Route component={NotFound} />
        </Switch>
        {errors && errors.length > 0 && <Errors />}
        {store.updateAvailable && <UpdateAvailable />}
      </div>
    </Router>
  )
}

Main.displayName = 'Main'

export default observer(Main)
