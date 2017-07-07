// @flow
import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

const StyledFormControl = styled(FormControl)`
  border-radius: 4px !important;
`
const StyledInputGroup = styled(InputGroup)`
  width: 100%;
`

const enhance = compose(inject(`store`), observer)

const EventDate = ({
  store,
  date,
  onChangeDatePicker,
}: {
  date: Date,
  onChangeDatePicker: () => void,
}) =>
  <FormGroup controlId="date">
    <ControlLabel>Date</ControlLabel>
    <StyledInputGroup>
      <DateRangePicker
        singleDatePicker
        drops="down"
        opens="left"
        onApply={onChangeDatePicker}
      >
        <StyledFormControl
          type="text"
          value={moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY')}
          onChange={() => {
            /* react wants an onChange handler */
          }}
          bsSize="small"
          tabIndex={2}
        />
      </DateRangePicker>
    </StyledInputGroup>
  </FormGroup>

EventDate.displayName = 'EventDate'

export default enhance(EventDate)
