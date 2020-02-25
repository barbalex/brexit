//
import React, { useContext, useCallback, useEffect } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react-lite'

import Actor from './Actor'
import ToggleDraftGlyph from './ToggleDraftGlyph'
import storeContext from '../../../storeContext'

const RemoveGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  right: 10px !important;
  top: 6px !important;
  font-size: 1.5em;
  color: #edf4f8;
`
const PanelHeading = styled.div`
  position: relative;
  cursor: pointer;
  border-bottom-right-radius: ${props => (!props.isActiveActor ? '3px' : 0)};
  border-bottom-left-radius: ${props => (!props.isActiveActor ? '3px' : 0)};
`
const PanelBody = styled.div`
  padding: ${props => props['data-panelbodypadding']};
  margin-top: ${props => props['data-panelbodymargintop']};
  max-height: ${typeof window !== `undefined` ? window.innerHeight - 141 : 1}px;
  overflow-y: auto;
`

const ActorsComponent = ({ history, activeActorPanel }) => {
  const store = useContext(storeContext)
  let {
    actors,
    activeActor,
    getActors,
    getActor,
    setActorToRemove,
  } = store.actors

  useEffect(() => {
    getActors()
  }, [actors.length, getActors])

  const onClickActor = useCallback(
    (id, e) => {
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet = !activeActor || activeActor._id !== id ? id : null
      getActor(idToGet, history)
    },
    [activeActor, getActor, history],
  )
  // prevent higher level panels from reacting
  const onClickActorCollapse = useCallback(event => event.stopPropagation(), [])
  const onRemoveActor = useCallback(
    (docToRemove, event) => {
      event.preventDefault()
      event.stopPropagation()
      setActorToRemove(docToRemove)
    },
    [setActorToRemove],
  )

  if (actors.length === 0) return null

  actors = sortBy(actors, actor => {
    if (actor.order) return actor.order
    return 100
  })

  return actors.map((doc, index) => {
    const isActiveActor = activeActor ? doc._id === activeActor._id : false
    const showEditingGlyphons = !!store.login.email
    const panelbodypadding = store.editing ? '0 !important' : '15px'
    const panelbodymargintop = store.editing ? '-1px' : 0
    // use pure bootstrap.
    // advantage: can add edit icon to panel-heading
    return (
      <div
        key={doc._id}
        ref={activeActorPanel || null}
        className="panel panel-default"
      >
        <PanelHeading
          className="panel-heading"
          role="tab"
          id={`heading${index}`}
          onClick={onClickActor.bind(this, doc._id)}
          isActiveActor={isActiveActor}
        >
          <h4 className="panel-title">
            <a
              role="button"
              data-toggle="collapse"
              data-parent="#actorsAccordion"
              href={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`#collapse${index}`}
            >
              {doc.category}
            </a>
          </h4>
          {showEditingGlyphons && <ToggleDraftGlyph doc={doc} />}
          {showEditingGlyphons && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="removeThisActor">remove</Tooltip>}
            >
              <RemoveGlyphicon
                glyph="remove-circle"
                onClick={event => onRemoveActor(doc, event)}
              />
            </OverlayTrigger>
          )}
        </PanelHeading>
        {isActiveActor && (
          <div
            id={`#collapse${index}`}
            className="panel-collapse collapse in"
            role="tabpanel"
            aria-labelledby={`heading${index}`}
            onClick={onClickActorCollapse}
          >
            <PanelBody
              className="panel-body"
              data-panelbodypadding={panelbodypadding}
              data-panelbodymargintop={panelbodymargintop}
            >
              <Actor />
            </PanelBody>
          </div>
        )}
      </div>
    )
  })
}
export default withRouter(observer(ActorsComponent))
