// @flow
import React, { Component } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import min from 'lodash/min'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import IntroJumbotron from './IntroJumbotron'
import NewEvent from './NewEvent'
import EditEvent from './EditEvent'
import ModalRemoveEvent from './ModalRemoveEvent'
import EventsTable from './EventsTable'

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
const YearButtonsContainer = styled.div`text-align: center;`

const enhance = compose(
  inject(`store`),
  withRouter,
  withState('docToRemove', 'changeDocToRemove', null),
  observer
)

class Events extends Component {
  displayName: 'Events'

  props: {
    store: Object,
    docToRemove: Object,
    changeDocToRemove: () => void,
  }

  componentDidMount() {
    const { store } = this.props
    store.events.getEvents([parseInt(moment().format('YYYY'), 0)])
    store.yearsOfEvents.getYearsOfEvents()
  }

  setActiveYear = year => {
    const { store } = this.props
    store.events.getEvents([year])
    store.yearsOfEvents.setActiveEventYears([year])
  }

  render() {
    const { store } = this.props
    const { yearsOfEvents, activeEventYears } = store.yearsOfEvents
    const showEventsTable = min(activeEventYears) > 2014
    const { activeEvent, showNewEvent } = store.events

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
                    onClick={() => this.setActiveYear(year)}
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
}
export default enhance(Events)
