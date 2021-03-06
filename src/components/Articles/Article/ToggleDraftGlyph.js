//      
import React, { useContext, useCallback } from 'react'
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

const ToggleDraftGlyph = ({ doc }                 ) => {
  const store = useContext(storeContext)
  const { toggleDraftOfArticle } = store.articles

  const onToggleDraft = useCallback(
    event => {
      event.preventDefault()
      event.stopPropagation()
      toggleDraftOfArticle(doc)
    },
    [doc, toggleDraftOfArticle],
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
        data-color={color}
        onClick={onToggleDraft}
      />
    </OverlayTrigger>
  )
}

export default ToggleDraftGlyph
