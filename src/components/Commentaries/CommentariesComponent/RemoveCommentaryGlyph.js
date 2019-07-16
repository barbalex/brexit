// @flow
import React, { useContext, useCallback } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import styled from 'styled-components'

import storeContext from '../../../storeContext'

const RemoveGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  right: 10px !important;
  top: 6px !important;
  font-size: 1.5em;
  color: #edf4f8;
`

export default ({ doc }: { doc: Object }) => {
  const store = useContext(storeContext)
  const { setCommentaryToRemove } = store.commentaries

  const onRemoveCommentary = useCallback(
    event => {
      event.preventDefault()
      event.stopPropagation()
      setCommentaryToRemove(doc)
    },
    [doc, setCommentaryToRemove],
  )

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="removeThisCommentary">remove</Tooltip>}
    >
      <RemoveGlyphicon glyph="remove-circle" onClick={onRemoveCommentary} />
    </OverlayTrigger>
  )
}
