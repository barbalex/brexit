// @flow
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
import { observer } from 'mobx-react'
import styled from 'styled-components'

import EventTypeButtonGroup from './EventTypeButtonGroup'
import DateInput from './DateInput'
import TagsInput from './TagsInput'
import EventLinks from './EventLinks'
import getDateFromEventId from '../../modules/getDateFromEventId'
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
const EventOrder = styled(FormControl)`
  margin-bottom: 20px;
`
const StyledAlert = styled(Alert)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const BoldLabel = styled.label`
  margin-bottom: 20px;
`
const BoldInput = styled.input`
  margin-right: 5px !important;
`

const EditEvent = () => {
  const store = useContext(storeContext)
  const { events } = store
  const { newEvent, removeEvent, saveEvent, getEvent } = events
  // DANGER: computed only recomputes when _id changes!
  // so do not use store.events.activeEvent
  const activeEvent = store.events.events.find(
    event => event._id === store.events.activeEventId,
  )
  const [error, changeError] = useState(null)
  const onChangeTitle = useCallback(
    (e: Object): void => {
      const title = e.target.value
      if (title) {
        activeEvent.title = title
        changeError(null)
      } else {
        changeError('Please add a title')
      }
    },
    [activeEvent.title],
  )
  const onBlurTitle = useCallback(
    (e: Object): void => {
      activeEvent.title = e.target.value
      if (activeEvent.title) {
        removeEvent(activeEvent)
        activeEvent.date = getDateFromEventId(activeEvent._id)
        newEvent(activeEvent)
      }
    },
    [activeEvent],
  )
  const onChangeDatePicker = useCallback(
    (date: Date): void => {
      const datePassed = moment(date, 'DD.MM.YYYY')
      if (datePassed) {
        removeEvent(activeEvent)
        activeEvent.date = datePassed
        newEvent(activeEvent)
      } else {
        changeError('Please choose a date')
      }
    },
    [activeEvent],
  )
  const onChangeOrder = useCallback(
    (e: Object): void => {
      activeEvent.order = e.target.value
      changeError(null)
    },
    [activeEvent.order],
  )
  const onBlurOrder = useCallback(
    (e: Object): void => {
      activeEvent.order = e.target.value
      saveEvent(activeEvent)
    },
    [activeEvent.order],
  )
  const onChangeBold = useCallback(
    (e: Object): void => {
      activeEvent.bold = !activeEvent.bold
      saveEvent(activeEvent)
    },
    [activeEvent.bold],
  )
  const close = useCallback(
    (): void => {
      getEvent(null)
    },
  )

  return (
    <StyledModal show onHide={close} bsSize="large">
      <Modal.Header closeButton>
        <Modal.Title>Edit event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormGroup controlId="eventTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={activeEvent.title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            tabIndex={1}
          />
        </FormGroup>
        <DateInput
          date={getDateFromEventId(activeEvent._id)}
          onChangeDatePicker={onChangeDatePicker}
        />
        <EventTypeButtonGroup />
        <FormGroup controlId="eventOrder">
          <ControlLabel>Order</ControlLabel>
          <EventOrder
            type="number"
            value={activeEvent.order}
            onChange={onChangeOrder}
            onBlur={onBlurOrder}
            tabIndex={4}
          />
        </FormGroup>
        <TagsInput />
        <BoldLabel>
          <BoldInput
            type="checkbox"
            checked={activeEvent.bold || false}
            onChange={onChangeBold}
          />
          Use bold text
        </BoldLabel>
        <EventLinks />
        {error && <StyledAlert bsStyle="danger">{error}</StyledAlert>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>close</Button>
      </Modal.Footer>
    </StyledModal>
  )
}

EditEvent.displayName = 'EditEvent'

export default observer(EditEvent)
