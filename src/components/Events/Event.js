// @flow
import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import RemoveEventGlyph from './RemoveEventGlyph'
import EditEventGlyph from './EditEventGlyph'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.7em;
  padding-right: 3px;
  vertical-align: 10%;
`
const OuterSpan = styled.span`padding-left: 5px;`

const enhance = compose(inject(`store`), observer)

const Event = ({ store, event }: { store: Object, event: Object }) => {
  const showEditingGlyphons = !!store.login.email
  const classNames =
    event.tags && event.tags.length > 0
      ? event.tags.map(tag => `event-${tag}`).join(' ')
      : []

  const links = event.links.map((link, key) =>
    <OuterSpan key={key}>
      {key > 0 && ' '}
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <StyledGlyphicon glyph="new-window" />
        {link.label}
      </a>
    </OuterSpan>
  )

  return (
    <li className={classNames}>
      <p className={classNames}>
        {event.title} <span>{links}</span>
        {showEditingGlyphons && <EditEventGlyph event={event} />}
        {showEditingGlyphons && <RemoveEventGlyph event={event} />}
      </p>
    </li>
  )
}

Event.displayName = 'Event'

export default enhance(Event)
