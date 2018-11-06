// @flow

import React, { useState, useCallback, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import DocumentTitle from 'react-document-title'

import LoginForm from './LoginForm'
import storeContext from '../../storeContext'

const enhance = compose(
  inject(`store`),
  withHandlers({
    onClickLogout: props => (): void => {
      console.log('log out clicked')
      props.store.login.logout()
    },
  }),
  observer,
)

const Login = ({ onClickLogout }: { onClickLogout: () => void }) => {
  const store = useContext(storeContext)

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

export default enhance(Login)
