// @flow
import React, { Component } from 'react'
import GeminiScrollbar from 'react-gemini-scrollbar'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import DateRows from './DateRows'

const Container = styled.div`
  width: 100%;
  margin-bottom: 0;
  position: relative;
`
const Header = styled.div`
  position: absolute;
  top: -40px;
  width: 100%;
  font-weight: bold;
`
const HeaderCell = styled.div`
  font-size: ${window.innerWidth < 500 ? 20 : 24}px;
  padding: 5px;
  flex: 1;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-content: center;
  align-self: flex-end;
`
const HeaderCellDay = HeaderCell.extend`
  width: 60px;
  max-width: 60px;
  padding-right: 20px;
  justify-content: flex-start;
`
const HeaderCellGb = HeaderCell.extend`
  flex: 1;
  justify-content: center;
  word-wrap: break-word;
  padding-right: 10px;
`
const HeaderCellEu = HeaderCell.extend`
  flex: 1;
  word-wrap: break-word;
  padding-left: 10px;
`
const HeaderCellBoth = HeaderCell.extend`
  flex-basis: 75px;
  flex-grow: 0;
  flex-shrink: 0;
  word-wrap: break-word;
  font-style: italic;
  font-size: ${window.innerWidth < 500 ? 16 : 20}px;
`
const Body = styled.div`
  overflow-x: visible;
  overflow-y: auto;
  height: calc(100vh - 94px);
  margin-top: ${props => props['data-marginTop']};
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  width: 100%;
`
const HeaderRow = styled.div`display: flex;`

const enhance = compose(
  inject(`store`),
  withState('headerFixed', 'changeHeaderFixed', false),
  observer
)

class EventsTable extends Component {
  displayName: 'EventsTable'

  props: {
    store: Object,
    headerFixed: boolean,
    changeHeaderFixed: () => void,
  }

  constructor() {
    super()
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount = () => {
    window.addEventListener('scroll', debounce(this.handleScroll, 150))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { changeHeaderFixed } = this.props
    console.log('window.scrollY:', window.scrollY)
    if (window.scrollY > 460) {
      console.log('should lock')
      changeHeaderFixed(true)
    } else if (window.scrollY < 460) {
      console.log('not locked')
      changeHeaderFixed(false)
    }
  }

  render = () => {
    const { store } = this.props
    const bodyMarginTop =
      store.yearsOfEvents.yearsOfEvents.length > 1 ? '77px' : '58px'

    return (
      <Container>
        <Header className="eventsTable-header">
          <HeaderRow>
            <HeaderCellDay>Date</HeaderCellDay>
            <HeaderCellGb>Great Britain</HeaderCellGb>
            <HeaderCellBoth>...both...</HeaderCellBoth>
            <HeaderCellEu>European Union</HeaderCellEu>
          </HeaderRow>
        </Header>
        <Body data-marginTop={bodyMarginTop}>
          <GeminiScrollbar id="eventsTableBody" autoshow>
            <DateRows />
          </GeminiScrollbar>
        </Body>
      </Container>
    )
  }
}

export default enhance(EventsTable)
