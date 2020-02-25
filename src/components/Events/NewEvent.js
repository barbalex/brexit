//      
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

import DateInput from './DateInput'
import storeContext from '../../storeContext'

const StyledModal = styled(Modal)`
  .col-xs-1,
  .col-sm-1,
  .col-md-1,
  .col-lg-1,
  .col-xs-2,
  .col-sm-2,
  .col-md-2,
  .col-lg-2,
  .col-xs-3,
  .col-sm-3,
  .col-md-3,
  .col-lg-3,
  .col-xs-4,
  .col-sm-4,
  .col-md-4,
  .col-lg-4,
  .col-xs-5,
  .col-sm-5,
  .col-md-5,
  .col-lg-5,
  .col-xs-6,
  .col-sm-6,
  .col-md-6,
  .col-lg-6,
  .col-xs-7,
  .col-sm-7,
  .col-md-7,
  .col-lg-7,
  .col-xs-8,
  .col-sm-8,
  .col-md-8,
  .col-lg-8,
  .col-xs-9,
  .col-sm-9,
  .col-md-9,
  .col-lg-9,
  .col-xs-10,
  .col-sm-10,
  .col-md-10,
  .col-lg-10,
  .col-xs-11,
  .col-sm-11,
  .col-md-11,
  .col-lg-11,
  .col-xs-12,
  .col-sm-12,
  .col-md-12,
  .col-lg-12 {
    padding-right: 0 !important;
  }
  .form-group {
    margin-bottom: 5px !important;
  }
  .event-tags {
    column-width: 250px;
    break-inside: avoid;
  }
  .event-tag input {
    position: relative;
    top: 2px;
  }
  .event-tag span {
    font-weight: normal;
    margin-left: 7px;
    cursor: pointer;
  }
`
const StyledAlert = styled(Alert)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const NewEvent = () => {
  const store = useContext(storeContext)
  const { setShowNewEvent, newEvent } = store.events

  const [title, changeTitle] = useState('')
  const [date, changeDate] = useState(moment())
  const [error, changeError] = useState(null)

  const onChangeTitle = useCallback(
    event => changeTitle(event.target.value),
    [],
  )
  const onChangeDatePicker = useCallback(
    date => changeDate(moment(date, 'DD.MM.YYYY')),
    [],
  )
  const close = useCallback(() => setShowNewEvent(false), [setShowNewEvent])
  const createNewEvent = useCallback(() => {
    if (title && date) {
      newEvent({ date, title })
      setShowNewEvent(false)
    } else {
      const error = !!title ? 'Please choose a date' : 'Please add a title'
      changeError(error)
    }
  }, [title, date, newEvent, setShowNewEvent])

  return (
    <StyledModal show onHide={close} bsSize="large">
      <Modal.Header>
        <Modal.Title>New event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormGroup controlId="newEventTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={title}
            onChange={onChangeTitle}
            autoFocus
            tabIndex={1}
          />
        </FormGroup>
        <DateInput date={date} onChangeDatePicker={onChangeDatePicker} />
        {error && <StyledAlert bsStyle="danger">{error}</StyledAlert>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>discard input and close</Button>
        <Button bsStyle="primary" onClick={createNewEvent}>
          create new event
        </Button>
      </Modal.Footer>
    </StyledModal>
  )
}

NewEvent.displayName = 'NewEvent'

export default observer(NewEvent)
