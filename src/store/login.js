//
/*
 * contains email of logged in user
 * well, it is saved in localStorage as window.localStorage.email
 * app.js sets default email (null) if not exists on app start
 */
import { action } from 'mobx'
import { navigate } from '@reach/router'

export default store => {
  if (typeof window === `undefined`) return {}

  return {
    getLogin: action('getLogin', () => window.localStorage.email),

    email: window.localStorage.email,

    login: action('login', email => {
      // change email only if it was passed
      const changeEmail = email !== undefined
      let lsEmail = window.localStorage.email
      if ((changeEmail && lsEmail !== email) || !email) {
        if (changeEmail) {
          lsEmail = email
        } else {
          email = lsEmail
        }
        window.localStorage.email = email
        store.login.email = email
        navigate('/')
      }
    }),

    logout: action('logout', () => {
      delete window.localStorage.email
      store.login.email = ''
    }),
  }
}
