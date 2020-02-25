//      
import React, { useCallback, useContext } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import allTags from './tags'
import storeContext from '../../storeContext'

const Container = styled.div`
  margin-bottom: 20px;
`
const Label = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`
const StyledGlyphicon = styled(Glyphicon)`
  top: ${props => props['data-top']} !important;
  font-size: 1.5em;
`

const tagIcon = option => (
  <StyledGlyphicon
    glyph={option.iconText}
    data-top={option.top ? `${option.top}px` : 0}
  />
)

const EventTags = () => {
  const store = useContext(storeContext)
  const { events } = store
  // DANGER: computed only recomputes when _id changes!
  // so do not use events.activeEvent
  const activeEvent = events.events.find(
    event => event._id === events.activeEventId,
  )

  const onChangeTag = useCallback(
    (tag, event) => {
      const checked = event.target.checked
      if (checked) {
        activeEvent.tags.push(tag)
        events.saveEvent(activeEvent)
      } else {
        activeEvent.tags = activeEvent.tags.filter(_tag => _tag !== tag)
        events.saveEvent(activeEvent)
      }
    },
    [activeEvent, events],
  )

  return (
    <Container>
      <Label>Tags</Label>
      <div className="event-tags">
        {allTags.map((option, index) => (
          <div key={index} className="form-group event-tag">
            <label>
              <input
                type="checkbox"
                checked={activeEvent.tags.includes(option.tag)}
                onChange={event => onChangeTag(option.tag, event)}
              />
              {option.iconText && tagIcon(option)}
              &nbsp;
              {option.tag}
            </label>
          </div>
        ))}
      </div>
    </Container>
  )
}

EventTags.displayName = 'EventTags'

export default observer(EventTags)
