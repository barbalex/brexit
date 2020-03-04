//
import React, { useEffect, useContext } from 'react'
import { PanelGroup } from 'react-bootstrap'
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

const Articles = ({ year, month, day, title }) => {
  const store = useContext(storeContext)
  const {
    getArticles,
    articles,
    activeArticleId,
    showNewArticle,
    articleToRemove,
  } = store.articles

  useEffect(() => {
    store.page.getPage('pages_commentaries')
    getArticles()
  }, [getArticles, store.page])
  useEffect(() => {
    if (!!year && !!month && !!day && !!title) {
      store.articles.activeArticleId = `commentaries_${year}_${month}_${day}_${decodeURIComponent(
        title,
      )}`
    } else {
      store.articles.activeArticleId = null
    }
  }, [year, month, day, title, store.articles.activeArticleId])

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
