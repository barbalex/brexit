// @flow

import app from 'ampersand-app'
import React, { useState, useCallback, useContext } from 'react'
import {
  Alert,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import isObject from 'lodash/isObject'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import validateEmail from './validateEmail'
import storeContext from '../../storeContext'

const StyledAlert = styled(Alert)`
  margin-bottom: 8px;
`
const ValidateDivAfterRBC = styled.div`
  color: #a94442;
  margin-top: -15px;
  margin-bottom: 5px;
`

const LoginForm = ({ history }: { history: Object }) => {
  const store = useContext(storeContext)
  const { login } = store

  const [invalidEmail, changeInvalidEmail] = useState(false)
  const [invalidPassword, changeInvalidPassword] = useState(false)
  const [newEmail, changeNewEmail] = useState('')
  const [password, changePassword] = useState('')
  const [loginError, changeLoginError] = useState('')

  const validEmail = useCallback((newEmail: string): boolean => {
    const validEmail = newEmail && validateEmail(newEmail)
    const invalidEmail = !validEmail
    changeInvalidEmail(invalidEmail)
    return !!validEmail
  }, [])
  const validPassword = useCallback((password: boolean): boolean => {
    const validPassword = !!password
    const invalidPassword = !validPassword
    changeInvalidPassword(invalidPassword)
    return validPassword
  }, [])
  const validSignin = useCallback(
    (newEmail: string, password: string): boolean =>
      validEmail(newEmail) && validPassword(password),
    [validEmail, validPassword],
  )
  const checkSignin = useCallback(
    async (newEmail, password): Promise<void> => {
      if (validSignin(newEmail, password)) {
        try {
          await app.db.login(newEmail, password)
          login.login(newEmail, history)
        } catch (error) {
          changeNewEmail(null)
          changeLoginError(error)
        }
      }
    },
    [history, login, validSignin],
  )
  const onKeyDownEmail = useCallback(
    event => {
      const enter = 13
      if (event.keyCode === enter) {
        // if enter was pressed, update the value first
        const newEmail = event.target.value
        changeNewEmail(newEmail)
        checkSignin(newEmail, password)
      }
    },
    [checkSignin, password],
  )
  const onKeyDownPassword = useCallback(
    event => {
      const enter = 13
      if (event.keyCode === enter) {
        // if enter was pressed, update the value first
        const password = event.target.value
        changePassword(password)
        checkSignin(newEmail, password)
      }
    },
    [checkSignin, newEmail],
  )
  const onBlurEmail = useCallback(
    event => {
      const newEmail = event.target.value
      changeNewEmail(newEmail)
      validEmail(newEmail)
    },
    [validEmail],
  )
  const onBlurPassword = useCallback(
    event => changePassword(event.target.value),
    [],
  )
  const onAlertDismiss = useCallback(() => changeLoginError(null), [])
  const onClickLogin = useCallback(() => checkSignin(newEmail, password), [
    checkSignin,
    newEmail,
    password,
  ])

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
        {invalidEmail && (
          <ValidateDivAfterRBC>Please check email</ValidateDivAfterRBC>
        )}
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
        {invalidPassword && (
          <ValidateDivAfterRBC>Please check password</ValidateDivAfterRBC>
        )}
      </div>
      {isError && (
        <StyledAlert bsStyle="danger" onDismiss={onAlertDismiss}>
          Error: {error}
        </StyledAlert>
      )}
      <Button className="btn-primary" onClick={onClickLogin}>
        log in
      </Button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

export default withRouter(observer(LoginForm))
