// @flow
import React, {
  Component,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon, PanelGroup } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import NewActor from './NewActor'
import ModalRemoveActor from './ModalRemoveActor'
import ActorsComponent from './ActorsComponent'
import SwallowPanelGroupProps from '../shared/SwallowPanelGroupProps'
import constants from '../../modules/constants'
import storeContext from '../../storeContext'

const Container = styled.div`
  font-size: x-large;
  font-weight: 700;
  p,
  div {
    font-size: medium;
  }
  h2 {
    font-size: large;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .panel-heading {
    background-color: ${constants.panelColor} !important;
  }
  .panel-heading a {
    color: #edf4f8;
    font-weight: bold;
  }
`

const enhance = compose(
  inject(`store`),
  withRouter,
  withHandlers({
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
  observer,
)

const Actors = () => {
  const store = useContext(storeContext)
  const { actors } = store

  useEffect(() => {
    // TODO: only on did mount?
    store.actors.getActors()

    if (actors.activeActor) {
      window.setTimeout(() => {
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
              500,
            )
          }
        }
      }, 200)
    }
  })
}
class Actors extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  displayName: 'Actors'

  props: {
    store: Object,
    onClickActor: () => void,
    onClickActorCollapse: () => void,
    onRemoveActor: () => void,
    onToggleDraft: () => void,
  }

  actorsComponent = () => {}

  render() {
    const { store } = this.props
    const { activeActor, showNewActor } = store.actors
    const activeId = activeActor ? activeActor._id : null

    return (
      <DocumentTitle title="brexit | Actors">
        <Container>
          <h1>Actors</h1>
          <PanelGroup
            defaultActiveKey={activeId}
            id="actorsAccordion"
            accordion
          >
            <SwallowPanelGroupProps>
              <ActorsComponent />
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
