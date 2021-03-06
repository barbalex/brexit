//      
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

export default ({ doc }                 ) => {
  const store = useContext(storeContext)
  const { setArticleToRemove } = store.articles

  const onRemoveArticle = useCallback(
    event => {
      event.preventDefault()
      event.stopPropagation()
      setArticleToRemove(doc)
    },
    [doc, setArticleToRemove],
  )

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="removeThisArticle">remove</Tooltip>}
    >
      <RemoveGlyphicon glyph="remove-circle" onClick={onRemoveArticle} />
    </OverlayTrigger>
  )
}
