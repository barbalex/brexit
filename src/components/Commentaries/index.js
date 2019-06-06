// @flow
import React, { useEffect, useContext, useRef, useCallback } from 'react'
import { PanelGroup } from 'react-bootstrap'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import NewCommentary from './NewCommentary'
import ModalRemoveCommentary from './ModalRemoveCommentary'
import SwallowPanelGroupProps from '../shared/SwallowPanelGroupProps'
import constants from '../../modules/constants'
import storeContext from '../../storeContext'
import CommentariesComponent from './CommentariesComponent'

const Container = styled.div`
  p,
  div {
    font-size: medium;
  }
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
    background-color: ${constants.panelColor} !important;
  }
  .panel-heading a {
    color: #edf4f8;
    font-weight: bold;
  }
`
const Copyright = styled.p`
  margin-top: 70px;
`

const Commentaries = ({
  match,
  location,
  history,
  onClickCommentary,
  onClickCommentaryCollapse,
}: {
  match: Object,
  location: Object,
  history: Object,
  onClickCommentary: () => void,
  onClickCommentaryCollapse: () => void,
}) => {
  const store = useContext(storeContext)
  const {
    getCommentaries,
    commentaries,
    activeCommentary,
    showNewCommentary,
    commentaryToRemove,
  } = store.commentaries

  const activeCommentaryPanel = useRef(null)

  const scrollToActivePanel = useCallback(() => {
    const node = activeCommentaryPanel.current || null
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
  }, [])

  useEffect(() => {
    getCommentaries()
  }, [commentaries.length, getCommentaries])
  useEffect(() => {
    if (activeCommentary) {
      window.setTimeout(() => scrollToActivePanel(), 200)
    }
  })

  const activeCommentaryId = has(activeCommentary, '_id')
    ? activeCommentary._id
    : null

  return (
    <DocumentTitle title="brexit | Commentary">
      <Container>
        <h1>Commentary</h1>
        <PanelGroup
          defaultActiveKey={activeCommentaryId}
          id="commentariesAccordion"
          accordion
        >
          <SwallowPanelGroupProps>
            <CommentariesComponent
              activeCommentaryPanel={activeCommentaryPanel}
            />
          </SwallowPanelGroupProps>
        </PanelGroup>
        {showNewCommentary && <NewCommentary />}
        {commentaryToRemove && <ModalRemoveCommentary />}
        <Copyright>© Jürg Martin Gabriel. All Rights Reserved.</Copyright>
      </Container>
    </DocumentTitle>
  )
}

export default withRouter(observer(Commentaries))
