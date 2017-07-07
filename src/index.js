// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import app from 'ampersand-app'
import PouchDB from 'pouchdb'
import pouchdbUpsert from 'pouchdb-upsert'
import pouchdbAuthentication from 'pouchdb-authentication'

import Main from './components/Main'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import couchUrl from './modules/getCouchUrl'
// need this polyfill to transform promise.all
// without it IE 11 and lower bark
import 'babel-polyfill'
// make webpack import styles
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

registerServiceWorker()

// some old browsers can't deal with ArrayBuffer
// pouchdb needs it
// give the users an explanation instead of an empty page
if (!window.ArrayBuffer) {
  window.alert(
    `blue-borders.ch nutzt moderne Technologien, welche von Ihrem Browser nicht unterstützt werden.

Bitte versuchen Sie es mit einer aktuellen Version von (zum Beispiel):
- Chrome
- Firefox
- Safari
- Internet Explorer (ab Version 10)
- Edge`
  )
}

/**
 * set up pouchdb plugins
 */
PouchDB.plugin(pouchdbUpsert)
PouchDB.plugin(pouchdbAuthentication)

/**
 * expose 'app' to the browser console
 * this is handy to call actions and stores in the browser console
 */
window.app = app
/**
 * enable pouch inspector in chrome
 * (https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa)
 */
window.PouchDB = PouchDB

/**
 * ampersand-app is extended with app methods (=singleton)
 * modules that need an app method import ampersand-app instead of using a global
 */
app.extend({
  init() {
    this.store = store
    this.db = new PouchDB(couchUrl())
  },
})
app.init()

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
)
