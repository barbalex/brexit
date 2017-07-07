// @flow
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import AsyncPage from './AsyncPage'
import AsyncEvents from './AsyncEvents'
import AsyncCommentaries from './AsyncCommentaries'
import AsyncActors from './AsyncActors'
import AsyncMonthlyEvents from './AsyncMonthlyEvents'
import AsyncPublications from './AsyncPublications'
import AsyncLogin from './AsyncLogin'
import Errors from './Errors'
import NotFound from './NotFound'

const enhance = compose(inject(`store`), observer)

const Main = ({ store, login }: { store: Object, login: boolean }) => {
  const { errors } = store.error

  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <Switch>
          <Redirect from="/" exact to="/events" />
          <Route
            path="/events"
            render={() => {
              store.page.getPage('pages_events')
              return <AsyncEvents />
            }}
          />
          <Route
            path="/monthlyEvents/:year/:month"
            exact
            render={({ match }) => {
              const { year, month } = match.params
              store.page.getPage('pages_monthlyEvents')
              store.monthlyEvents.activeMonthlyEventId = `monthlyEvents_${year}_${month}`
              return <AsyncMonthlyEvents />
            }}
          />
          <Route
            path="/monthlyEvents"
            exact
            render={() => {
              store.page.getPage('pages_monthlyEvents')
              return <AsyncMonthlyEvents />
            }}
          />
          <Route
            path="/commentaries/:year/:month/:day/:title"
            exact
            render={({ match }) => {
              const { year, month, day, title } = match.params
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
            path="/publications/:category/:title"
            exact
            render={({ match }) => {
              const { category, title } = match.params
              store.page.getPage('pages_publications')
              store.publications.activePublicationId = `publications_${category}_${title}`
              return <AsyncPublications />
            }}
          />
          <Route
            path="/publications/:category"
            exact
            render={() => {
              store.page.getPage('pages_publications')
              return <AsyncPublications />
            }}
          />
          <Route
            path="/publications"
            exact
            render={() => {
              store.page.getPage('pages_publications')
              return <AsyncPublications />
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
      </div>
    </Router>
  )
}

Main.displayName = 'Main'

export default enhance(Main)
