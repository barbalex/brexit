// @flow
import React, { useCallback, useContext } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import styled from 'styled-components'

import storeContext from '../../../storeContext'

const ToggleDraftGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  right: 40px !important;
  top: 6px !important;
  font-size: 1.5em;
  color: ${props => props['data-color']};
`

export default (doc: Object) => {
  const store = useContext(storeContext)
  let { toggleDraftOfActor } = store.actors
  const onToggleDraft = useCallback(
    (doc, event) => {
      event.preventDefault()
      event.stopPropagation()
      toggleDraftOfActor(doc)
    },
    [toggleDraftOfActor],
  )
  const glyph = doc.draft ? 'ban-circle' : 'ok-circle'
  const color = doc.draft ? 'red' : '#00D000'

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="toggleDraft">
          {doc.draft ? 'unpublish' : 'publish'}
        </Tooltip>
      }
    >
      <ToggleDraftGlyphicon
        glyph={glyph}
        onClick={onToggleDraft.bind(this, doc)}
        data-color={color}
      />
    </OverlayTrigger>
  )
}
