import React, { useState, useCallback, useContext } from 'react'
import {
  Modal,
  Button,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import DateInput from '../Events/DateInput'
import storeContext from '../../storeContext'

const ErrorAlert = styled(Alert)`
  magrin-bottom: 10px;
`

const NewArticle = () => {
  const store = useContext(storeContext)
  const { articles, error } = store
  const { newArticle, toggleShowNewArticle } = articles

  const [title, setTitle] = useState('')
  const [date, setDate] = useState(moment())
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)

  const onChangeTitle = useCallback(event => setTitle(event.target.value), [])
  const onChangeDate = useCallback(
    date => setDate(moment(date, 'DD.MM.YYYY')),
    [],
  )
  const createNewArticle = useCallback(() => {
    if (title && date) {
      newArticle(title, date)
      toggleShowNewArticle()
    } else {
      let errorMessage = 'Please choose a date'
      if (!title) errorMessage = 'Please add a title'
      error.showError({ error: errorMessage })
    }
  }, [title, date, newArticle, toggleShowNewArticle, error])
  const onCloseNewArticle = useCallback(() => toggleShowNewArticle(), [
    toggleShowNewArticle,
  ])

  return (
    <Modal show bsSize="large">
      <Modal.Header>
        <Modal.Title>New article</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormGroup controlId="articleTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={title}
            onChange={onChangeTitle}
            autoFocus
            tabIndex={1}
          />
        </FormGroup>
        <DateInput date={date} onChangeDatePicker={onChangeDate} />
        {errorMessage && (
          <ErrorAlert bsStyle="danger">{errorMessage}</ErrorAlert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onCloseNewArticle}>discard input and close</Button>
        <Button bsStyle="primary" onClick={createNewArticle}>
          create new article
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

NewArticle.displayName = 'NewArticle'

export default observer(NewArticle)
