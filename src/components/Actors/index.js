// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon, Tooltip, OverlayTrigger, PanelGroup } from 'react-bootstrap'
import sortBy from 'lodash/sortBy'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import Actor from './Actor'
import NewActor from './NewActor'
import ModalRemoveActor from './ModalRemoveActor'
import SwallowPanelGroupProps from '../shared/SwallowPanelGroupProps'
import oceanDarkImage from '../../images/oceanDark.jpg'

const Container = styled.div`
  font-size: x-large;
  font-weight: 700;
  h2 {
    font-size: large;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .panel-heading {
    background-image: url(${oceanDarkImage});
  }
  .panel-heading a {
    color: #edf4f8;
    font-weight: bold;
  }
`
const ToggleDraftGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  right: 40px !important;
  top: 6px !important;
  font-size: 1.5em;
  color: ${props => props['data-color']};
`
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
  padding: ${props => props['data-panelBodyPadding']};
  margin-top: ${props => props['data-panelBodyMarginTop']};
  max-height: ${window.innerHeight - 141}px;
  overflow-y: auto;
`

const enhance = compose(
  inject(`store`),
  withRouter,
  withHandlers({
    onClickActor: props => (id, e) => {
      const { activeActor } = props.store.actors
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet = !activeActor || activeActor._id !== id ? id : null
      props.store.actors.getActor(idToGet, props.history)
    },
    onClickActorCollapse: props => event => {
      // prevent higher level panels from reacting
      event.stopPropagation()
    },
    onRemoveActor: props => (docToRemove, event) => {
      event.preventDefault()
      event.stopPropagation()
      props.store.actors.setActorToRemove(docToRemove)
    },
    onToggleDraft: props => (doc, event) => {
      event.preventDefault()
      event.stopPropagation()
      props.store.actors.toggleDraftOfActor(doc)
    },
  }),
  observer
)

class Actors extends Component {
  displayName: 'Actors'

  props: {
    store: Object,
    onClickActor: () => void,
    onClickActorCollapse: () => void,
    onRemoveActor: () => void,
    onToggleDraft: () => void,
  }

  componentDidMount() {
    this.props.store.actors.getActors()
  }

  componentDidUpdate() {
    if (this.props.store.actors.activeActor) {
      window.setTimeout(() => {
        this.scrollToActivePanel()
      }, 200)
    }
  }

  scrollToActivePanel = () => {
    // $FlowIssue
    const node = ReactDOM.findDOMNode(this._activeActorPanel)
    if (node) {
      const navWrapperOffsetTop = document.getElementById('nav-wrapper')
        .offsetTop
      const reduce = navWrapperOffsetTop > 0 ? navWrapperOffsetTop - 33 : 55
      if (node.offsetTop) {
        window.$('html, body').animate(
          {
            scrollTop: node.offsetTop - reduce,
          },
          500
        )
      }
    }
  }

  toggleDraftGlyph = doc => {
    const { onToggleDraft } = this.props
    const glyph = doc.draft ? 'ban-circle' : 'ok-circle'
    const color = doc.draft ? 'red' : '#00D000'

    return (
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="toggleDraft">
            {doc.draft ? 'publish' : 'unpublish'}
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

  actorsComponent = () => {
    const { store, onClickActor, onClickActorCollapse } = this.props
    let { actors, activeActor } = store.actors
    if (actors.length > 0) {
      actors = sortBy(actors, actor => {
        if (actor.order) return actor.order
        return 100
      })
      return actors.map((doc, index) => {
        const isActiveActor = activeActor ? doc._id === activeActor._id : false
        const showEditingGlyphons = !!store.login.email
        const panelBodyPadding = store.editing ? '0 !important' : '15px'
        const panelBodyMarginTop = store.editing ? '-1px' : 0
        const ref = isActiveActor
          ? '_activeActorPanel'
          : `_actorPanel${doc._id}`
        // use pure bootstrap.
        // advantage: can add edit icon to panel-heading
        return (
          <div
            key={doc._id}
            ref={c => {
              // $FlowIssue
              this[ref] = c
            }}
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
              {showEditingGlyphons && this.toggleDraftGlyph(doc)}
              {showEditingGlyphons &&
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="removeThisActor">remove</Tooltip>}
                >
                  <RemoveGlyphicon
                    glyph="remove-circle"
                    onClick={event => this.props.onRemoveActor(doc, event)}
                  />
                </OverlayTrigger>}
            </PanelHeading>
            {isActiveActor &&
              <div
                id={`#collapse${index}`}
                className="panel-collapse collapse in"
                role="tabpanel"
                aria-labelledby={`heading${index}`}
                onClick={onClickActorCollapse}
              >
                <PanelBody
                  className="panel-body"
                  data-panelBodyPadding={panelBodyPadding}
                  data-panelBodyMarginTop={panelBodyMarginTop}
                >
                  <Actor />
                </PanelBody>
              </div>}
          </div>
        )
      })
    }
    return null
  }

  render() {
    const { store } = this.props
    const { activeActor, showNewActor } = store.actors
    const activeId = activeActor ? activeActor._id : null

    return (
      <DocumentTitle title="blue-borders | Actors">
        <Container>
          <h1>Actors</h1>
          <PanelGroup activeKey={activeId} id="actorsAccordion" accordion>
            <SwallowPanelGroupProps>
              {this.actorsComponent()}
            </SwallowPanelGroupProps>
          </PanelGroup>
          {showNewActor && <NewActor />}
          {store.actors.actorToRemove && <ModalRemoveActor />}
        </Container>
      </DocumentTitle>
    )
  }
}

export default enhance(Actors)
