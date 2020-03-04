//
import React, { useContext, useCallback, useEffect, useRef } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import styled from 'styled-components'
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

const ActorsComponent = ({ doc }) => {
  const store = useContext(storeContext)
  let {
    actors,
    activeActor,
    activeActorId,
    getActors,
    getActor,
    setActorToRemove,
  } = store.actors
  const isActiveActor = activeActor ? doc._id === activeActor._id : false
  const showEditingGlyphons = !!store.login.email
  const panelbodypadding = store.editing ? '0 !important' : '15px'
  const panelbodymargintop = store.editing ? '-1px' : 0

  const ref = useRef(null)
  const scrollToActivePanel = useCallback(() => {
    if (typeof window !== `undefined`) {
      window.scrollTo({
        left: 0,
        top: ref.current ? ref.current.offsetTop - 55 : 55,
        behavior: 'smooth',
      })
    }
  }, [])
  useEffect(() => {
    if (activeActor && activeActorId === doc._id) {
      window.setTimeout(() => {
        scrollToActivePanel()
      }, 50)
    }
  }, [activeActor, activeActorId, doc._id, scrollToActivePanel])

  useEffect(() => {
    getActors()
  }, [actors.length, getActors])

  const onClickActor = useCallback(
    (id, e) => {
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet = !activeActor || activeActor._id !== id ? id : null
      getActor(idToGet)
    },
    [activeActor, getActor],
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

  // use pure bootstrap.
  // advantage: can add edit icon to panel-heading
  return (
    <div className="panel panel-default">
      <PanelHeading
        className="panel-heading"
        role="tab"
        id={`heading${doc._id}`}
        onClick={onClickActor.bind(this, doc._id)}
        isActiveActor={isActiveActor}
        ref={ref}
      >
        <h4 className="panel-title">
          <a
            role="button"
            data-toggle="collapse"
            data-parent="#actorsAccordion"
            href={`#collapse${doc._id}`}
            aria-expanded="false"
            aria-controls={`#collapse${doc._id}`}
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
          id={`#collapse${doc._id}`}
          className="panel-collapse collapse in"
          role="tabpanel"
          aria-labelledby={`heading${doc._id}`}
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
}
export default observer(ActorsComponent)
