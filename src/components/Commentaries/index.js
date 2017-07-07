// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon, Tooltip, OverlayTrigger, PanelGroup } from 'react-bootstrap'
import has from 'lodash/has'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import Commentary from './Commentary'
import NewCommentary from './NewCommentary'
import ModalRemoveCommentary from './ModalRemoveCommentary'
import SwallowPanelGroupProps from '../shared/SwallowPanelGroupProps'
import oceanDarkImage from '../../images/oceanDark.jpg'

const Container = styled.div`
  a.list-group-item {
    padding-right: 50px !important;
  }
  .h2-subtitle {
    text-align: center !important;
    font-size: large !important;
    font-weight: 800 !important;
    margin-top: -10px !important;
    margin-bottom: 0 !important;
  }

  .h2-subtitle-top {
    text-align: center !important;
    font-size: large !important;
    font-weight: 800 !important;
    margin-bottom: -40px !important;
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
  border-bottom-right-radius: ${props =>
    !props.isActiveCommentary ? '3px' : 0};
  border-bottom-left-radius: ${props =>
    !props.isActiveCommentary ? '3px' : 0};
`
const PanelBody = styled.div`
  margin-top: ${props => props['data-panelBodyMarginTop']};
  padding: ${props => props['data-panelBodyPadding']};
  max-height: ${window.innerHeight - 141}px;
  overflow-y: auto;
`
const Copyright = styled.p`margin-top: 70px;`

const enhance = compose(
  inject(`store`),
  withRouter,
  withHandlers({
    onClickCommentary: props => (id, e) => {
      const { activeCommentary, getCommentary } = props.store.commentaries
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet =
        !activeCommentary || activeCommentary._id !== id ? id : null
      getCommentary(idToGet, props.history)
    },
    // prevent higher level panels from reacting
    onClickCommentaryCollapse: props => event => event.stopPropagation(),
    onRemoveCommentary: props => (docToRemove, event) => {
      event.preventDefault()
      event.stopPropagation()
      props.store.commentaries.setCommentaryToRemove(docToRemove)
    },
    onToggleDraft: props => (doc, event) => {
      event.preventDefault()
      event.stopPropagation()
      props.store.commentaries.toggleDraftOfCommentary(doc)
    },
  }),
  observer
)

class Commentaries extends Component {
  displayName: 'Commentaries'

  props: {
    store: Object,
    match: Object,
    location: Object,
    history: Object,
    onClickCommentary: () => void,
    onClickCommentaryCollapse: () => void,
    onRemoveCommentary: () => void,
    onToggleDraft: () => void,
  }

  componentDidMount() {
    this.props.store.commentaries.getCommentaries()
  }

  componentDidUpdate() {
    const { activeCommentary } = this.props.store.commentaries
    if (activeCommentary) {
      window.setTimeout(() => {
        this.scrollToActivePanel()
      }, 200)
    }
  }

  scrollToActivePanel = () => {
    // $FlowIssue
    const node = ReactDOM.findDOMNode(this._activeCommentaryPanel)
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

  removeCommentaryGlyph = doc =>
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="removeThisCommentary">remove</Tooltip>}
    >
      <RemoveGlyphicon
        glyph="remove-circle"
        onClick={this.props.onRemoveCommentary.bind(this, doc)}
      />
    </OverlayTrigger>

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
          data-color={color}
          onClick={onToggleDraft.bind(this, doc)}
        />
      </OverlayTrigger>
    )
  }

  commentariesComponent = () => {
    const { store, onClickCommentary, onClickCommentaryCollapse } = this.props
    const { commentaries, activeCommentary } = store.commentaries

    if (commentaries.length > 0) {
      return commentaries.map((doc, index) => {
        const isCommentary = !!activeCommentary
        const isActiveCommentary = isCommentary
          ? doc._id === activeCommentary._id
          : false
        const showEditingGlyphons = !!store.login.email
        const panelBodyPadding = store.editing ? '0 !important' : '15px'
        const panelBodyMarginTop = store.editing ? '-1px' : 0

        // use pure bootstrap.
        // advantage: can add edit icon to panel-heading
        return (
          <div
            key={doc._id}
            ref={c => {
              if (isActiveCommentary) {
                // $FlowIssue
                this._activeCommentaryPanel = c
              } else {
                // $FlowIssue
                this[`_commentaryPanel${doc._id}`] = c
              }
            }}
            className="panel panel-default"
          >
            <PanelHeading
              className="panel-heading"
              role="tab"
              id={`heading${index}`}
              onClick={onClickCommentary.bind(this, doc._id)}
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
              {showEditingGlyphons && this.toggleDraftGlyph(doc)}
              {showEditingGlyphons && this.removeCommentaryGlyph(doc)}
            </PanelHeading>
            {isActiveCommentary &&
              <div
                id={`#collapse${index}`}
                className="panel-collapse collapse in"
                role="tabpanel"
                aria-labelledby={`heading${index}`}
                onClick={onClickCommentaryCollapse}
              >
                <PanelBody
                  className="panel-body"
                  data-panelBodyPadding={panelBodyPadding}
                  data-panelBodyMarginTop={panelBodyMarginTop}
                >
                  <Commentary />
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
    const {
      activeCommentary,
      showNewCommentary,
      commentaryToRemove,
    } = store.commentaries
    const activeCommentaryId = has(activeCommentary, '_id')
      ? activeCommentary._id
      : null

    return (
      <DocumentTitle title="blue-borders | Commentaries">
        <Container>
          <h1>Commentaries</h1>
          <PanelGroup
            activeKey={activeCommentaryId}
            id="commentariesAccordion"
            accordion
          >
            <SwallowPanelGroupProps>
              {this.commentariesComponent()}
            </SwallowPanelGroupProps>
          </PanelGroup>
          {showNewCommentary && <NewCommentary />}
          {commentaryToRemove && <ModalRemoveCommentary />}
          <Copyright>© Jürg Martin Gabriel. All Rights Reserved.</Copyright>
        </Container>
      </DocumentTitle>
    )
  }
}

export default enhance(Commentaries)
