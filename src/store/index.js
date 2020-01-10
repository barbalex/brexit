// @flow
import { observable, extendObservable } from 'mobx'

import yearsOfEvents from './yearsOfEvents'
import page from './page'
import events from './events'
import articles from './articles'
import actors from './actors'
import login from './login'
import error from './error'
import store from './store'

function Store(): void {
  extendObservable(this, store(this))
  this.page = observable(page(this))
  this.yearsOfEvents = observable(yearsOfEvents(this))
  this.events = observable(events(this))
  this.articles = observable(articles(this))
  this.actors = observable(actors(this))
  this.login = observable(login(this))
  this.error = observable(error(this))
}

const MyStore = new Store()

export default MyStore
