//
import React, { useContext, useEffect, useRef } from 'react'
import { PanelGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import sortBy from 'lodash/sortBy'

import NewActor from './NewActor'
import ModalRemoveActor from './ModalRemoveActor'
import ActorsComponent from './Actor'
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

const Actors = ({ category }) => {
  const store = useContext(storeContext)
  const {
    actors,
    activeActor,
    actorToRemove,
    showNewActor,
    getActors,
  } = store.actors

  useEffect(() => {
    store.page.getPage('pages_actors')
    getActors()
  }, [getActors, store.page])
  useEffect(() => {
    if (!!category) {
      store.actors.activeActorId = `actors_${category}`
    } else {
      store.actors.activeActorId = null
    }
  }, [category, store.actors.activeActorId])

  const activeActorPanel = useRef(null)
  useEffect(() => {
    if (activeActor && typeof window !== `undefined`) {
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
  }, [activeActor])

  const activeId = activeActor ? activeActor._id : null

  return (
    <DocumentTitle title="brexit | Actors">
      <Container>
        <h1>Actors</h1>
        <PanelGroup defaultActiveKey={activeId} id="actorsAccordion" accordion>
          {sortBy(actors, actor => {
            if (actor.order) return actor.order
            return 100
          }).map(doc => (
            <ActorsComponent key={doc._id} doc={doc} />
          ))}
        </PanelGroup>
        {showNewActor && <NewActor />}
        {actorToRemove && <ModalRemoveActor />}
      </Container>
    </DocumentTitle>
  )
}

export default observer(Actors)
