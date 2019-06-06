// @flow
import React, { useContext, useEffect, useRef } from 'react'
import { PanelGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
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

const Actors = () => {
  const store = useContext(storeContext)
  const { activeActor, actorToRemove, showNewActor } = store.actors

  const activeActorPanel = useRef(null)

  useEffect(() => {
    if (activeActor) {
      window.setTimeout(() => {
        const node = activeActorPanel.current
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

  const activeId = activeActor ? activeActor._id : null

  return (
    <DocumentTitle title="brexit | Actors">
      <Container>
        <h1>Actors</h1>
        <PanelGroup defaultActiveKey={activeId} id="actorsAccordion" accordion>
          <SwallowPanelGroupProps>
            <ActorsComponent activeActorPanel={activeActorPanel} />
          </SwallowPanelGroupProps>
        </PanelGroup>
        {showNewActor && <NewActor />}
        {actorToRemove && <ModalRemoveActor />}
      </Container>
    </DocumentTitle>
  )
}

export default withRouter(observer(Actors))
