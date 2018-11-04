// @flow
import React from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import Event from './Event'

const BodyCell = styled.div`
  padding: 5px;
  flex: 1;
`
const Day = styled.div`
  padding: 5px;
  flex: 1;
  width: 60px;
  max-width: 60px;
  padding-right: 20px;
  text-align: right;
  p {
    margin-top: 5px !important;
  }
`
const Data = styled.div`
  flex: 1;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
`
const GbEuData = styled.div`
  display: flex;
`
const Gb = styled(BodyCell)`
  width: 50%;
  max-width: 50%;
  word-wrap: break-word;
  padding: 5px ${props => props['data-padding']}px 5px 0;
`
const Eu = styled(BodyCell)`
  width: 50%;
  max-width: 50%;
  word-wrap: break-word;
  padding: 5px 0 5px ${props => props['data-padding']}px;
`
const Both = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 130px;
  padding-right: 130px;
  padding-left: ${props => props['data-padding']}px;
  padding-right: ${props => props['data-padding']}px;
  ul {
    padding: 5px;
    align-self: center;
  }
`
const BodyRow = styled.div`
  display: flex;
  border-top: 1px solid #ececec !important;
  border-radius: 4px;
  &:hover {
    background-color: #f5f5f5;
  }
  ul {
    padding-left: 10px;
    margin-bottom: 0;
  }
  ul li {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  ul li + li {
    margin-top: 10px;
  }
  p {
    margin-bottom: 0;
  }
  a {
    white-space: nowrap;
  }
`

const enhance = compose(
  inject(`store`),
  observer,
)

const mapEventComponents = events =>
  events.map((event, key) => <Event key={key} event={event} />)
const mapBothEventComponents = events =>
  events.map((event, key) => (
    <ul key={key}>
      <Event event={event} />
    </ul>
  ))

const DateRow = ({
  store,
  width,
  dateRowObject: dRO,
}: {
  store: Object,
  width: number,
  dateRowObject: Object,
}) => {
  const day = moment(dRO.date).format('D')
  const gbEvents = mapEventComponents(dRO.gbEvents)
  const euEvents = mapEventComponents(dRO.euEvents)
  const bothEvents = mapBothEventComponents(dRO.bothEvents)
  const bothPadding = width / 5
  const gbEuPadding = width / 12

  return (
    <BodyRow>
      <Day>
        <p>{day}</p>
      </Day>
      <Data>
        {bothEvents.length > 0 && (
          <Both data-padding={bothPadding}>{bothEvents}</Both>
        )}
        <GbEuData>
          <Gb data-padding={gbEuPadding}>
            <ul>{gbEvents}</ul>
          </Gb>
          <Eu data-padding={gbEuPadding}>
            <ul>{euEvents}</ul>
          </Eu>
        </GbEuData>
      </Data>
    </BodyRow>
  )
}

DateRow.displayName = 'DateRow'

export default enhance(DateRow)
