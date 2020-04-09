//
import React from 'react'
import app from 'ampersand-app'
import pouchdbUpsert from 'pouchdb-upsert'
import pouchdbAuthentication from 'pouchdb-authentication'
import 'mobx-react-lite/batchingForReactDom'

import store from './store'
import couchUrl from './modules/getCouchUrl'
// need this polyfill to transform promise.all
// without it IE 11 and lower bark
import 'babel-polyfill'
// make webpack import styles
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

import { StoreContextProvider } from './storeContext'
import Errors from './components/Errors'
import Layout from './components/Layout'

// some old browsers can't deal with ArrayBuffer
// pouchdb needs it
// give the users an explanation instead of an empty page
if (typeof window !== `undefined` && !window.ArrayBuffer) {
  window.alert(
    `brexit-chronology.ch nutzt moderne Technologien, welche von Ihrem Browser nicht unterstützt werden.

Bitte versuchen Sie es mit einer aktuellen Version von (zum Beispiel):
- Chrome
- Firefox
- Safari
- Internet Explorer (ab Version 10)
- Edge`,
  )
}

let PouchDB = null
if (typeof window !== `undefined`) {
  // need to import pouchdb only client side or gatsby will not build
  import('pouchdb').then((pouchdb) => {
    PouchDB = pouchdb.default
    /**
     * set up pouchdb plugins
     */
    PouchDB.plugin(pouchdbUpsert)
    PouchDB.plugin(pouchdbAuthentication)
    // expose 'app' to the browser console
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
  })
}

const { errors } = store.error

// BEWARE: The redirect caused the app to ALWAYS redirect when it was refreshed
// and also when it was opened at a sub-route like /login
const App = ({ element }) => (
  <StoreContextProvider value={store}>
    <div className="container">
      <Layout>
        {/*<Redirect from="/chronology" exact to="/" noThrow />*/}
        {element}
        {errors && errors.length > 0 && <Errors />}
      </Layout>
    </div>
  </StoreContextProvider>
)

export default App
