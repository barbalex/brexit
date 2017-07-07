// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import DocumentTitle from 'react-document-title'

import LoginForm from './LoginForm'

const enhance = compose(
  inject(`store`),
  withHandlers({
    onClickLogout: props => () => props.store.login.logout(),
  }),
  observer
)

const Login = ({
  store,
  onClickLogout,
}: {
  store: Object,
  onClickLogout: () => void,
}) =>
  <DocumentTitle title="blue-borders | Login">
    <div>
      <h1>Login</h1>
      {!store.login.email && <LoginForm />}
      {store.login.email &&
        <Button className="btn-primary" onClick={onClickLogout}>
          log out
        </Button>}
    </div>
  </DocumentTitle>

Login.displayName = 'Login'

export default enhance(Login)
