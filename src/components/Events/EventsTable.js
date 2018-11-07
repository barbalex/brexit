// @flow
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react'
import GeminiScrollbar from 'react-gemini-scrollbar'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import DateRows from './DateRows'
import storeContext from '../../storeContext'

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
  font-size: ${window.innerWidth < 500 ? 20 : 24}px !important;
  padding: 5px;
  flex: 1;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-content: center;
  align-self: flex-end;
`
const HeaderCellDay = styled(HeaderCell)`
  width: 60px;
  max-width: 60px;
  padding-right: 20px;
  justify-content: flex-start;
`
const HeaderCellGb = styled(HeaderCell)`
  flex: 1;
  justify-content: center;
  word-wrap: break-word;
  padding-right: ${props => props['data-padding']}px;
`
const HeaderCellEu = styled(HeaderCell)`
  flex: 1;
  word-wrap: break-word;
  padding-left: ${props => props['data-padding']}px;
`
const HeaderCellBoth = styled(HeaderCell)`
  flex-basis: 75px;
  flex-grow: 0;
  flex-shrink: 0;
  word-wrap: break-word;
`
const Body = styled.div`
  overflow-x: visible;
  overflow-y: auto;
  height: calc(100vh - 94px);
  margin-top: ${props => props['data-margintop']};
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  width: 100%;
`
const HeaderRow = styled.div`
  display: flex;
`

const EventsTable = () => {
  const store = useContext(storeContext)
  const [width, setWidth] = useState(0)
  const container = useRef(null)
  const changeWidth = useCallback(
    () => {
      const newWidth = container.current ? container.current.clientWidth : null
      if (newWidth && newWidth !== width) {
        setWidth(newWidth)
      }
    },
    [width],
  )
  useEffect(() => {
    changeWidth()
    window.addEventListener('resize', debounce(changeWidth, 50))
    return () => {
      window.removeEventListener('resize', debounce(changeWidth, 50))
    }
  })

  const bodyMarginTop =
    store.yearsOfEvents.yearsOfEvents.length > 1 ? '77px' : '58px'
  const bothPadding = width / 5
  // -55 corrects for the fact that "GB & EU" uses 110px in the middle
  // which is not the case in the rows
  const gbEuPadding = width / 12 - 55

  return (
    <Container ref={container}>
      <Header className="eventsTable-header">
        <HeaderRow>
          <HeaderCellDay />
          <HeaderCellGb data-padding={gbEuPadding}>Great Britain</HeaderCellGb>
          <HeaderCellBoth data-padding={bothPadding}>GB & EU</HeaderCellBoth>
          <HeaderCellEu data-padding={gbEuPadding}>European Union</HeaderCellEu>
        </HeaderRow>
      </Header>
      <Body data-margintop={bodyMarginTop}>
        <GeminiScrollbar id="eventsTableBody" autoshow>
          <DateRows width={width} />
        </GeminiScrollbar>
      </Body>
    </Container>
  )
}

export default observer(EventsTable)
