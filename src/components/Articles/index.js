//
import React, { useEffect, useContext } from 'react'
import { PanelGroup } from 'react-bootstrap'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import NewArticle from './NewArticle'
import ModalRemoveArticle from './ModalRemoveArticle'
import constants from '../../modules/constants'
import storeContext from '../../storeContext'
import Article from './Article'

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

  useEffect(() => {
    getArticles()
  }, [articles.length, getArticles])

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
          {articles.map(doc => (
            <Article key={doc._id} doc={doc} />
          ))}
        </PanelGroup>
        {showNewArticle && <NewArticle />}
        {articleToRemove && <ModalRemoveArticle />}
        <Copyright>© Jürg Martin Gabriel. All Rights Reserved.</Copyright>
      </Container>
    </DocumentTitle>
  )
}

export default observer(Articles)
