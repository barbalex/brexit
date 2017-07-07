// @flow
import React, { Component } from 'react'
import { PanelGroup, Panel } from 'react-bootstrap'
import uniq from 'lodash/uniq'
import has from 'lodash/has'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import getYearFromEventId from '../../modules/getYearFromEventId'
import MonthlyEventsOfYear from './MonthlyEventsOfYear'
import oceanDarkImage from '../../images/oceanDark.jpg'

const Container = styled.div`
  margin-bottom: 20px !important;
  .panel-body {
    padding: 0 0 !important;
  }
  .panel-group {
    margin-bottom: 0 !important;
  }
  .panel.month {
    margin-top: 0 !important;
    border-radius: 0 !important;
    border-top-width: 0 !important;
    border-right-width: 0 !important;
    border-left-width: 0 !important;
  }
  .panel.month > .panel-heading {
    background-color: transparent !important;
  }
  .panel.month .panel-heading:hover {
    background-color: #f5f5f5 !important;
  }
  .panel-heading {
    cursor: pointer !important;
  }
  .panel.month > .panel-heading h4 {
    font-weight: bold !important;
    z-index: 0 !important;
  }
  .panel.month:last-of-type {
    border-bottom-width: 0 !important;
  }
  .panel.month .panel-body table {
    margin-left: 0 !important;
    width: 100% !important;
  }
`
const StyledPanel = styled(({ activeYear, children, ...rest }) =>
  <Panel {...rest}>
    {children}
  </Panel>
)`
  &> .panel-heading {
    background-image: url(${oceanDarkImage});
    border-radius: ${props => (props.activeYear ? 'inherit' : '3px')};
  }
  &> .panel-heading a {
    color: #edf4f8;
    font-weight: bold;
  }
`

const enhance = compose(
  inject(`store`),
  withRouter,
  withState('activeYear', 'changeActiveYear', null),
  withHandlers({
    onClickYear: props => (activeYear: number): void => {
      const { changeActiveYear, store } = props
      changeActiveYear(activeYear)
      // make sure no monthlyEvent is loaded
      // i.e. if an monthlyEvent was loaded it is unloaded
      store.monthlyEvents.getMonthlyEvent(null, props.history)
    },
  }),
  observer
)

class MonthlyEvents extends Component {
  displayName: 'MonthlyEvents'

  props: {
    store: Object,
    activeYear: number,
    changeActiveYear: () => void,
    onClickYear: () => void,
  }

  componentDidMount() {
    this.props.store.monthlyEvents.getMonthlyEvents()
  }

  yearsOfEvents = () => {
    const { monthlyEvents } = this.props.store.monthlyEvents
    const allYears = monthlyEvents.map(doc => getYearFromEventId(doc._id))
    if (allYears.length > 0) {
      const years = uniq(allYears)
      return years.sort().reverse()
    }
    return []
  }

  mostRecentYear = () => {
    const years = this.yearsOfEvents()
    return years[0]
  }

  eventYearsComponent = activeYear => {
    const { store, onClickYear } = this.props
    let { monthlyEvents } = store.monthlyEvents
    const years = this.yearsOfEvents()

    if (monthlyEvents.length > 0 && years.length > 0) {
      // wanted to only build MonthlyEventsOfYear if isActiveYear
      // but opening a year was way to hideous
      return years.map(year =>
        <StyledPanel
          key={year}
          header={year}
          eventKey={year}
          onClick={onClickYear.bind(this, year)}
          activeYear={activeYear}
        >
          <MonthlyEventsOfYear year={year} />
        </StyledPanel>
      )
    }
    return null
  }

  render() {
    const { store } = this.props
    const { activeMonthlyEvent } = store.monthlyEvents
    let activeYear
    if (has(activeMonthlyEvent, '_id')) {
      activeYear = getYearFromEventId(activeMonthlyEvent._id)
    } else {
      activeYear = this.props.activeYear
        ? this.props.activeYear
        : this.mostRecentYear()
    }

    return (
      <DocumentTitle title="blue-borders | Events">
        <Container id="monthlyEvents">
          <h1>Events Archive</h1>
          <PanelGroup activeKey={activeYear} accordion>
            {this.eventYearsComponent(activeYear)}
          </PanelGroup>
        </Container>
      </DocumentTitle>
    )
  }
}

export default enhance(MonthlyEvents)
