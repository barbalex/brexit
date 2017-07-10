// @flow
import React from 'react'
import GeminiScrollbar from 'react-gemini-scrollbar'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

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
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`
const HeaderCellDay = HeaderCell.extend`
  width: 60px;
  max-width: 60px;
  padding-right: 20px;
  text-align: right;
`
const HeaderCellMigration = HeaderCell.extend`
  width: 50%;
  max-width: 50%;
  word-wrap: break-word;
  padding-right: 10px;
`
const HeaderCellPolitics = HeaderCell.extend`
  width: 50%;
  max-width: 50%;
  word-wrap: break-word;
  padding-left: 10px;
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

const enhance = compose(inject(`store`), observer)

const Events = ({ store }: { store: Object }) => {
  const bodyMarginTop =
    store.yearsOfEvents.yearsOfEvents.length > 1 ? '77px' : '58px'

  return (
    <Container>
      <Header className="eventsTable-header">
        <HeaderRow>
          <HeaderCellDay>Date</HeaderCellDay>
          <HeaderCellMigration>Great Britain</HeaderCellMigration>
          <HeaderCellPolitics>European Union</HeaderCellPolitics>
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

Events.displayName = 'Events'

export default enhance(Events)
