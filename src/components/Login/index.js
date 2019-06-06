// @flow

import React, { useCallback, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import DocumentTitle from 'react-document-title'

import LoginForm from './LoginForm'
import storeContext from '../../storeContext'

const Login = () => {
  const store = useContext(storeContext)
  const onClickLogout = useCallback(
    (): void => {
      console.log('log out clicked')
      store.login.logout()
    },
  )

  return (
    <DocumentTitle title="brexit | Login">
      <div>
        <h1>Login</h1>
        {!store.login.email && <LoginForm />}
        {store.login.email && (
          <Button className="btn-primary" onClick={onClickLogout}>
            log out
          </Button>
        )}
      </div>
    </DocumentTitle>
  )
}

Login.displayName = 'Login'

export default observer(Login)
