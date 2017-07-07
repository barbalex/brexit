// @flow
import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import allTags from './tags'

const Container = styled.div`margin-bottom: 20px;`
const Label = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`
const StyledGlyphicon = styled(Glyphicon)`
  top: ${props => props['data-top']} !important;
  font-size: 1.5em;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onChangeTag: props => (tag, event) => {
      const checked = event.target.checked
      const { activeEvent } = props.store.events
      if (checked) {
        activeEvent.tags.push(tag)
        props.store.events.saveEvent(activeEvent)
      } else {
        activeEvent.tags = activeEvent.tags.filter(_tag => _tag !== tag)
        props.store.events.saveEvent(activeEvent)
      }
    },
  }),
  observer
)

const tagIcon = option =>
  <StyledGlyphicon
    glyph={option.iconText}
    data-top={option.top ? `${option.top}px` : 0}
  />

const EventTags = ({
  store,
  onChangeTag,
}: {
  store: Object,
  onChangeTag: () => void,
}) =>
  <Container>
    <Label>Tags</Label>
    <div className="event-tags">
      {allTags.map((option, index) =>
        <div key={index} className="form-group event-tag">
          <label>
            <input
              type="checkbox"
              checked={store.events.activeEvent.tags.includes(option.tag)}
              onChange={event => onChangeTag(option.tag, event)}
            />
            {option.iconText && tagIcon(option)}
            &nbsp;{option.tag}
          </label>
        </div>
      )}
    </div>
  </Container>

EventTags.displayName = 'EventTags'

export default enhance(EventTags)
