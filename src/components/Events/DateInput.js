// @flow
import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const StyledFormControl = styled(FormControl)`
  border-radius: 4px !important;
`
const StyledInputGroup = styled(InputGroup)`
  width: 100%;
`

const EventDate = ({
  date,
  onChangeDatePicker,
}: {
  date: Date,
  onChangeDatePicker: () => void,
}) => (
  <FormGroup controlId="date">
    <ControlLabel>Date</ControlLabel>
    <StyledInputGroup>
      <DatePicker
        selected={moment(date, 'DD.MM.YYYY')}
        onChange={onChangeDatePicker}
        // isClearable={true}
        dateFormat="DD.MM.YYYY"
        // locale="en-gb"
        customInput={
          <StyledFormControl
            type="text"
            value={moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY')}
            onChange={() => {
              /* react wants an onChange handler */
            }}
            tabIndex={2}
          />
        }
      />
    </StyledInputGroup>
  </FormGroup>
)

EventDate.displayName = 'EventDate'

export default observer(EventDate)
