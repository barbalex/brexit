// @flow
import React, { useContext } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import styled from 'styled-components'

import RemoveEventGlyph from './RemoveEventGlyph'
import EditEventGlyph from './EditEventGlyph'
import storeContext from '../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.7em;
  padding-right: 3px;
  vertical-align: 10%;
`
const P = styled.p`
  font-weight: ${props => (props['data-bold'] ? 'bold' : 'normal')};
`
const OuterSpan = styled.span`
  padding-left: 5px;
`

const Event = ({ event: evPassed }: { event: Object }) => {
  const store = useContext(storeContext)
  const event = toJS(evPassed)
  const showEditingGlyphons = !!store.login.email
  const classNames =
    event.tags && event.tags.length > 0
      ? event.tags.map(tag => `event-${tag}`).join(' ')
      : []

  const links = event.links.map((link, key) => (
    <OuterSpan key={key}>
      {key > 0 && ' '}
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <StyledGlyphicon glyph="new-window" />
        {link.label}
      </a>
    </OuterSpan>
  ))

  return (
    <li className={classNames}>
      <P className={classNames} data-bold={event.bold}>
        {event.title} <span>{links}</span>
        {showEditingGlyphons && <EditEventGlyph event={event} />}
        {showEditingGlyphons && <RemoveEventGlyph event={event} />}
      </P>
    </li>
  )
}

Event.displayName = 'Event'

export default observer(Event)
