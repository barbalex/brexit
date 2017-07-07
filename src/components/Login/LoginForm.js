// @flow

import app from 'ampersand-app'
import React from 'react'
import {
  Alert,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import isObject from 'lodash/isObject'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import validateEmail from './validateEmail'

const StyledAlert = styled(Alert)`
  margin-bottom: 8px;
`
const ValidateDivAfterRBC = styled.div`
  color: #a94442;
  margin-top: -15px;
  margin-bottom: 5px;
`

const enhance = compose(
  inject(`store`),
  withRouter,
  withState('invalidEmail', 'changeInvalidEmail', false),
  withState('invalidPassword', 'changeInvalidPassword', false),
  withState('newEmail', 'changeNewEmail', ''),
  withState('password', 'changePassword', ''),
  withState('loginError', 'changeLoginError', ''),
  withHandlers({
    validEmail: props => (newEmail: string): boolean => {
      const validEmail = newEmail && validateEmail(newEmail)
      const invalidEmail = !validEmail
      props.changeInvalidEmail(invalidEmail)
      return !!validEmail
    },
    validPassword: props => (password: boolean): boolean => {
      const validPassword = !!password
      const invalidPassword = !validPassword
      props.changeInvalidPassword(invalidPassword)
      return validPassword
    },
  }),
  withHandlers({
    validSignin: props => (newEmail: string, password: string): boolean => {
      const validEmail = props.validEmail(newEmail)
      const validPassword = props.validPassword(password)
      return validEmail && validPassword
    },
  }),
  withHandlers({
    checkSignin: props => async (newEmail, password): Promise<void> => {
      if (props.validSignin(newEmail, password)) {
        try {
          await app.db.login(newEmail, password)
          props.store.login.login(newEmail, props.history)
        } catch (error) {
          props.changeNewEmail(null)
          props.changeLoginError(error)
        }
      }
    },
  }),
  withHandlers({
    onKeyDownEmail: props => event => {
      const enter = 13
      if (event.keyCode === enter) {
        // if enter was pressed, update the value first
        const newEmail = event.target.value
        props.changeNewEmail(newEmail)
        props.checkSignin(newEmail, props.password)
      }
    },
    onKeyDownPassword: props => event => {
      const enter = 13
      if (event.keyCode === enter) {
        // if enter was pressed, update the value first
        const password = event.target.value
        props.changePassword(password)
        props.checkSignin(props.newEmail, password)
      }
    },
    onBlurEmail: props => event => {
      const newEmail = event.target.value
      props.changeNewEmail(newEmail)
      props.validEmail(newEmail)
    },
    onBlurPassword: props => event => props.changePassword(event.target.value),
    onAlertDismiss: props => () => props.changeLoginError(null),
    onClickLogin: props => () =>
      props.checkSignin(props.newEmail, props.password),
  }),
  observer
)

const LoginForm = ({
  store,
  invalidEmail,
  invalidPassword,
  newEmail,
  password,
  loginError,
  onKeyDownEmail,
  onKeyDownPassword,
  onBlurEmail,
  onBlurPassword,
  onAlertDismiss,
  onClickLogin,
}: {
  store: Object,
  invalidEmail: boolean,
  invalidPassword: boolean,
  newEmail: string,
  password: string,
  loginError: string | Object,
  onKeyDownEmail: () => void,
  onKeyDownPassword: () => void,
  onBlurEmail: () => void,
  onBlurPassword: () => void,
  onAlertDismiss: () => void,
  onClickLogin: () => void,
}) => {
  const emailInputBsStyle = invalidEmail ? 'error' : null
  const passwordInputBsStyle = invalidPassword ? 'error' : null
  let error = loginError
  if (isObject(loginError)) {
    // $FlowIssue
    error = loginError.message
  }
  const isError = error && error.length > 0

  return (
    <form className="form" autoComplete="off">
      <div className="formGroup">
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            id="email"
            bsSize="small"
            className="controls"
            bsStyle={emailInputBsStyle}
            onBlur={onBlurEmail}
            onKeyDown={onKeyDownEmail}
            required
            autoFocus
          />
        </FormGroup>
        {invalidEmail &&
          <ValidateDivAfterRBC>Please check email</ValidateDivAfterRBC>}
      </div>
      <div className="formGroup">
        <FormGroup controlId="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            id="password"
            bsSize="small"
            className="controls"
            bsStyle={passwordInputBsStyle}
            onBlur={onBlurPassword}
            onKeyDown={onKeyDownPassword}
            required
          />
        </FormGroup>
        {invalidPassword &&
          <ValidateDivAfterRBC>Please check password</ValidateDivAfterRBC>}
      </div>
      {isError &&
        <StyledAlert bsStyle="danger" onDismiss={onAlertDismiss}>
          Error: {error}
        </StyledAlert>}
      <Button className="btn-primary" onClick={onClickLogin}>
        log in
      </Button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

export default enhance(LoginForm)
