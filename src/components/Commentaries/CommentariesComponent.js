// @flow
import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import storeContext from '../../storeContext'
import RemoveCommentaryGlyph from './RemoveCommentaryGlyph'
import ToggleDraftGlyph from './ToggleDraftGlyph'
import Commentary from './Commentary'

const PanelHeading = styled.div`
  position: relative;
  cursor: pointer;
  border-bottom-right-radius: ${props =>
    !props.isActiveCommentary ? '3px' : 0};
  border-bottom-left-radius: ${props =>
    !props.isActiveCommentary ? '3px' : 0};
`
const PanelBody = styled.div`
  margin-top: ${props => props['data-panelbodymargintop']};
  padding: ${props => props['data-panelbodypadding']};
  max-height: ${window.innerHeight - 141}px;
  overflow-y: auto;
`

const CommentariesComponent = ({
  history,
  activeCommentaryPanel,
}: {
  history: Object,
  activeCommentaryPanel: Object,
}) => {
  const store = useContext(storeContext)
  const { commentaries, activeCommentary, getCommentary } = store.commentaries

  // prevent higher level panels from reacting
  const onClickCommentaryCollapse = useCallback(event =>
    event.stopPropagation(),
  )
  const onClickCommentary = useCallback(
    (id, e) => {
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet =
        !activeCommentary || activeCommentary._id !== id ? id : null
      getCommentary(idToGet, history)
    },
    [activeCommentary],
  )

  if (commentaries.length > 0) {
    return commentaries.map((doc, index) => {
      const isCommentary = !!activeCommentary
      const isActiveCommentary = isCommentary
        ? doc._id === activeCommentary._id
        : false
      const showEditingGlyphons = !!store.login.email
      const panelbodypadding = store.editing ? '0 !important' : '15px'
      const panelbodymargintop = store.editing ? '-1px' : 0

      // use pure bootstrap.
      // advantage: can add edit icon to panel-heading
      return (
        <div
          key={doc._id}
          ref={activeCommentaryPanel || null}
          className="panel panel-default"
        >
          <PanelHeading
            className="panel-heading"
            role="tab"
            id={`heading${index}`}
            onClick={e => onClickCommentary(doc._id, e)}
          >
            <h4 className="panel-title">
              <a
                role="button"
                data-toggle="collapse"
                data-parent="#commentariesAccordion"
                href={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`#collapse${index}`}
              >
                {doc.title}
              </a>
            </h4>
            {showEditingGlyphons && <ToggleDraftGlyph doc={doc} />}
            {showEditingGlyphons && <RemoveCommentaryGlyph doc={doc} />}
          </PanelHeading>
          {isActiveCommentary && (
            <div
              id={`#collapse${index}`}
              className="panel-collapse collapse in"
              role="tabpanel"
              aria-labelledby={`heading${index}`}
              onClick={onClickCommentaryCollapse}
            >
              <PanelBody
                className="panel-body"
                data-panelbodypadding={panelbodypadding}
                data-panelbodymargintop={panelbodymargintop}
              >
                <Commentary />
              </PanelBody>
            </div>
          )}
        </div>
      )
    })
  }
  return null
}

export default withRouter(CommentariesComponent)
