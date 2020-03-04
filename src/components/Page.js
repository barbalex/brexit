//
import React, { useContext, useEffect } from 'react'
import { Base64 } from 'js-base64'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import Editor from './shared/Editor'
import storeContext from '../storeContext'

const Container = styled.div`
  p,
  div {
    font-size: medium;
  }
  h1 {
    font-size: 36px;
    font-weight: 500;
  }
  h2 {
    font-size: x-large;
    font-weight: 700;
  }
  h3 {
    font-size: large;
    font-weight: 700;
  }
`

const Page = ({ page }) => {
  const store = useContext(storeContext)
  const { activePage, getPage } = store.page
  const articleEncoded = activePage.article
  const articleDecoded = articleEncoded ? Base64.decode(articleEncoded) : null
  let title = activePage.title ? activePage.title : activePage.category

  useEffect(() => {
    getPage(page)
  }, [getPage, page, store.page])

  if (store.editing && activePage._id !== 'pages_actors') {
    return (
      <div className="page">
        <Editor
          docType="page"
          doc={activePage}
          articleDecoded={articleDecoded}
        />
      </div>
    )
  }
  const createMarkup = () => ({ __html: articleDecoded })

  return (
    <DocumentTitle title={`brexit | ${title}`}>
      <Container className="page">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </Container>
    </DocumentTitle>
  )
}

Page.displayName = 'Page'

export default observer(Page)
