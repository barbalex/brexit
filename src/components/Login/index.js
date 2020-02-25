//      

import React, { useCallback, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import DocumentTitle from 'react-document-title'

import LoginForm from './LoginForm'
import storeContext from '../../storeContext'

const Login = () => {
  const store = useContext(storeContext)
  const { logout, email } = store.login
  const onClickLogout = useCallback(()       => {
    console.log('log out clicked')
    logout()
  }, [logout])

  return (
    <DocumentTitle title="brexit | Login">
      <div>
        <h1>Login</h1>
        {!email && <LoginForm />}
        {email && (
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
