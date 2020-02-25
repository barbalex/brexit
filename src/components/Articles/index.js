//
import React, { useEffect, useContext, useRef, useCallback } from 'react'
import { PanelGroup } from 'react-bootstrap'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import NewArticle from './NewArticle'
import ModalRemoveArticle from './ModalRemoveArticle'
import SwallowPanelGroupProps from '../shared/SwallowPanelGroupProps'
import constants from '../../modules/constants'
import storeContext from '../../storeContext'
import ArticlesComponent from './ArticlesComponent'

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

const Articles = ({
  match,
  location,
  history,
  onClickArticle,
  onClickArticleCollapse,
}) => {
  const store = useContext(storeContext)
  const {
    getArticles,
    articles,
    activeArticle,
    showNewArticle,
    articleToRemove,
  } = store.articles

  const activeArticlePanel = useRef(null)

  const scrollToActivePanel = useCallback(() => {
    const node = activeArticlePanel.current || null
    if (node) {
      const navWrapperOffsetTop = document.getElementById('nav-wrapper')
        .offsetTop
      const reduce = navWrapperOffsetTop > 0 ? navWrapperOffsetTop - 33 : 55
      if (node.offsetTop && typeof window !== `undefined`) {
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
    getArticles()
  }, [articles.length, getArticles])
  useEffect(() => {
    if (activeArticle && typeof window !== `undefined`) {
      window.setTimeout(() => scrollToActivePanel(), 200)
    }
  }, [activeArticle, scrollToActivePanel])

  const activeArticleId = has(activeArticle, '_id') ? activeArticle._id : null

  return (
    <DocumentTitle title="brexit | Article">
      <Container>
        <h1>Articles</h1>
        <PanelGroup
          defaultActiveKey={activeArticleId}
          id="articlesAccordion"
          accordion
        >
          <SwallowPanelGroupProps>
            <ArticlesComponent activeArticlePanel={activeArticlePanel} />
          </SwallowPanelGroupProps>
        </PanelGroup>
        {showNewArticle && <NewArticle />}
        {articleToRemove && <ModalRemoveArticle />}
        <Copyright>© Jürg Martin Gabriel. All Rights Reserved.</Copyright>
      </Container>
    </DocumentTitle>
  )
}

export default withRouter(observer(Articles))
