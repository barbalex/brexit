// @flow
import React from 'react'
import {
  Modal,
  Button,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import EventTypeButtonGroup from './EventTypeButtonGroup'
import DateInput from './DateInput'
import TagsInput from './TagsInput'
import EventLinks from './EventLinks'
import getDateFromEventId from '../../modules/getDateFromEventId'

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

const enhance = compose(
  inject(`store`),
  withState('error', 'changeError', null),
  withHandlers({
    onChangeTitle: props => (e: Object): void => {
      const { store, changeError } = props
      const title = e.target.value
      if (title) {
        store.events.activeEvent.title = title
        changeError(null)
      } else {
        changeError('Please add a title')
      }
    },
    onBlurTitle: props => (e: Object): void => {
      const { activeEvent, replaceEvent } = props.store.events
      activeEvent.title = e.target.value
      if (activeEvent.title) {
        activeEvent.date = getDateFromEventId(activeEvent._id)
        replaceEvent(activeEvent)
      }
    },
    onChangeDatePicker: props => (event: Object, picker: Object): void => {
      const { changeError, store } = props
      const { activeEvent, replaceEvent } = store.events
      const datePassed = moment(picker.startDate, 'DD.MM.YYYY')
      if (datePassed) {
        activeEvent.date = datePassed
        replaceEvent(activeEvent)
      } else {
        changeError('Please choose a date')
      }
    },
    onChangeOrder: props => (e: Object): void => {
      const { store, changeError } = props
      store.events.activeEvent.order = e.target.value
      changeError(null)
    },
    onBlurOrder: props => (e: Object): void => {
      const { activeEvent, saveEvent } = props.store.events
      activeEvent.order = e.target.value
      saveEvent(activeEvent)
    },
    close: props => (): void => {
      props.store.events.getEvent(null)
    },
  }),
  observer
)

const EditEvent = ({
  store,
  error,
  changeError,
  onChangeTitle,
  onBlurTitle,
  onChangeDatePicker,
  onChangeOrder,
  onBlurOrder,
  close,
}: {
  store: Object,
  error: string,
  changeError: () => void,
  onChangeTitle: () => void,
  onBlurTitle: () => void,
  onChangeDatePicker: () => void,
  onChangeOrder: () => void,
  onBlurOrder: () => void,
  close: () => void,
}) =>
  <StyledModal show onHide={close} bsSize="large">
    <Modal.Header closeButton>
      <Modal.Title>Edit event</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <FormGroup controlId="eventTitle">
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          value={store.events.activeEvent.title}
          onChange={onChangeTitle}
          onBlur={onBlurTitle}
          tabIndex={1}
        />
      </FormGroup>
      <DateInput
        date={getDateFromEventId(store.events.activeEvent._id)}
        onChangeDatePicker={onChangeDatePicker}
      />
      <EventTypeButtonGroup />
      <FormGroup controlId="eventOrder">
        <ControlLabel>Order</ControlLabel>
        <EventOrder
          type="number"
          value={store.events.activeEvent.order}
          onChange={onChangeOrder}
          onBlur={onBlurOrder}
          tabIndex={4}
        />
      </FormGroup>
      <TagsInput />
      <EventLinks />
      {error &&
        <StyledAlert bsStyle="danger">
          {error}
        </StyledAlert>}
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={close}>close</Button>
    </Modal.Footer>
  </StyledModal>

EditEvent.displayName = 'EditEvent'

export default enhance(EditEvent)
