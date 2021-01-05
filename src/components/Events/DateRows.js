//
import React, { useContext } from 'react'
import moment from 'moment'
import ReactList from 'react-list'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import DateRow from './DateRow'
import MonthRow from './MonthRow'
import MonthlyStatisticsRow from './MonthlyStatisticsRow'
import getDaterowObjectsSinceOldestEvent from '../../modules/getDaterowObjectsSinceOldestEvent'
import storeContext from '../../storeContext'

const BodyRow = styled.div`
  display: flex;
  border-top: 1px solid #ececec !important;
  border-radius: 4px;
  &:hover {
    background-color: #f5f5f5;
  }
`
const BodyCell = styled.div`
  padding: 5px;
  flex: 1;
  padding-left: 10px;
`

const DateRows = ({ width }) => {
  const store = useContext(storeContext)
  const dateRowObjects = getDaterowObjectsSinceOldestEvent(
    store.events.events,
    store.yearsOfEvents.activeEventYears,
  )
  console.log('DateRows, events:', store.events.events)
  const dateRows = []
  if (dateRowObjects.length > 0) {
    let lastEndOfMonth
    dateRowObjects.forEach((dRO, index) => {
      const day = moment(dRO.date).format('D')
      const endOfMonth = moment(dRO.date).endOf('month').format('MM.DD')
      const dROForDateRow = {
        date: dRO.date,
        gbEvents: dRO.gbEvents.filter(
          (event) => !event.tags || !event.tags.includes('monthlyStatistics'),
        ),
        euEvents: dRO.euEvents.filter(
          (event) => !event.tags || !event.tags.includes('monthlyStatistics'),
        ),
        bothEvents: dRO.bothEvents.filter(
          (event) => !event.tags || !event.tags.includes('monthlyStatistics'),
        ),
      }
      const dROForMonthlyStatsRow = {
        date: dRO.date,
        gbEvents: dRO.gbEvents.filter(
          (event) => event.tags && event.tags.includes('monthlyStatistics'),
        ),
        euEvents: dRO.euEvents.filter(
          (event) => event.tags && event.tags.includes('monthlyStatistics'),
        ),
        bothEvents: dRO.bothEvents.filter(
          (event) => event.tags && event.tags.includes('monthlyStatistics'),
        ),
      }
      const dROForMonthlyStatsHasEvents =
        dROForMonthlyStatsRow.gbEvents.length > 0 ||
        dROForMonthlyStatsRow.euEvents.length > 0 ||
        dROForMonthlyStatsRow.bothEvents.length > 0
      const needsMonthRow = !lastEndOfMonth || endOfMonth !== lastEndOfMonth
      if (needsMonthRow) {
        dateRows.push(<MonthRow key={`${index}monthRow`} dateRowObject={dRO} />)
      }
      const needsMonthlyStatisticsRow =
        day === endOfMonth && dROForMonthlyStatsHasEvents
      if (needsMonthlyStatisticsRow) {
        dateRows.push(
          <MonthlyStatisticsRow
            key={`${index}monthlyStatisticsRow`}
            dateRowObject={dROForMonthlyStatsRow}
          />,
        )
      }
      dateRows.push(
        <DateRow key={index} dateRowObject={dROForDateRow} width={width} />,
      )
      lastEndOfMonth = endOfMonth
    })
    const renderDateRow = (index, key) => dateRows[index]

    return (
      <div>
        <ReactList
          itemRenderer={renderDateRow}
          length={dateRows.length}
          type="variable"
        />
      </div>
    )
  }
  return (
    <BodyRow>
      <BodyCell>
        <p>Loading events...</p>
      </BodyCell>
    </BodyRow>
  )
}

DateRows.displayName = 'DateRows'

export default observer(DateRows)
