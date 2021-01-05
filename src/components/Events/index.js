//
import React, { useContext, useEffect, useCallback } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import min from 'lodash/min'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import IntroJumbotron from './IntroJumbotron'
import NewEvent from './NewEvent'
import EditEvent from './EditEvent'
import ModalRemoveEvent from './ModalRemoveEvent'
import EventsTable from './EventsTable'
import storeContext from '../../storeContext'

const Container = styled.div`
  position: relative !important;
  p,
  div {
    font-size: medium;
  }
  p.event-weather {
    position: relative !important;
  }
  li.event-weather {
    list-style-type: none !important;
  }

  p.event-statistics,
  p.event-monthlyStatistics {
    position: relative;
  }
  li.event-statistics,
  li.event-monthlyStatistics {
    list-style-type: none;
  }
  p.event-victims {
    position: relative;
  }
  li.event-victims {
    list-style-type: none;
  }
  p.event-highlighted {
    position: relative;
  }
  li.event-highlighted {
    list-style-type: none;
  }
`
const YearButtonsContainer = styled.div`
  text-align: center;
`

const thisYear = parseInt(moment().format('YYYY'), 0)
// create array of years between this and oldest
const years = []
let year = thisYear
while (year >= 2020) {
  years.push(year)
  year--
}

const Events = () => {
  const store = useContext(storeContext)
  const { getEvents, activeEvent, showNewEvent } = store.events
  const {
    yearsOfEvents,
    activeEventYears,
    setActiveEventYears,
    getYearsOfEvents,
  } = store.yearsOfEvents

  useEffect(() => {
    store.page.getPage('pages_events')
    getEvents(years)
    getYearsOfEvents()
  }, [getEvents, getYearsOfEvents, store.page])

  const setActiveYear = useCallback(
    (year) => {
      getEvents([year])
      setActiveEventYears([year])
    },
    [getEvents, setActiveEventYears],
  )

  const showEventsTable = min(activeEventYears) > 2014

  return (
    <DocumentTitle title="brexit-chronology">
      <Container className="events">
        <IntroJumbotron />
        {yearsOfEvents.length > 1 && (
          <YearButtonsContainer>
            <ButtonGroup>
              {yearsOfEvents.map((year, index) => (
                <Button
                  key={index}
                  active={activeEventYears.includes(year)}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </Button>
              ))}
            </ButtonGroup>
          </YearButtonsContainer>
        )}
        {showEventsTable && <EventsTable />}
        {activeEvent && <EditEvent />}
        {showNewEvent && <NewEvent />}
        {store.events.eventToRemove && <ModalRemoveEvent />}
      </Container>
    </DocumentTitle>
  )
}
export default observer(Events)
