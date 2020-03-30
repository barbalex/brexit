//
import React, { useContext, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import storeContext from '../../../storeContext'
import RemoveArticleGlyph from './RemoveArticleGlyph'
import ToggleDraftGlyph from './ToggleDraftGlyph'
import Article from './Article'

const PanelHeading = styled.div`
  position: relative;
  cursor: pointer;
  border-bottom-right-radius: ${props => (!props.isActiveArticle ? '3px' : 0)};
  border-bottom-left-radius: ${props => (!props.isActiveArticle ? '3px' : 0)};
`
const PanelBody = styled.div`
  margin-top: ${props => props['data-panelbodymargintop']};
  padding: ${props => props['data-panelbodypadding']};
  max-height: ${typeof window !== `undefined` ? window.innerHeight - 141 : 1}px;
  overflow-y: auto;
`

const ArticlesComponent = ({ doc }) => {
  const store = useContext(storeContext)
  const { activeArticle, activeArticleId, getArticle } = store.articles
  const isArticle = !!activeArticle
  const isActiveArticle = isArticle ? doc._id === activeArticle._id : false
  const showEditingGlyphons = !!store.login.email
  const panelbodypadding = store.editing ? '0 !important' : '15px'
  const panelbodymargintop = store.editing ? '-1px' : 0

  const ref = useRef(null)
  const scrollToActivePanel = useCallback(() => {
    if (typeof window !== `undefined`) {
      window.scrollTo({
        left: 0,
        top: ref.current ? ref.current.offsetTop - 55 : 55,
        behavior: 'smooth',
      })
    }
  }, [])
  useEffect(() => {
    if (activeArticle && activeArticleId === doc._id) {
      window.setTimeout(() => {
        scrollToActivePanel()
      }, 50)
    }
  }, [activeArticle, activeArticleId, doc._id, scrollToActivePanel])

  // prevent higher level panels from reacting
  const onClickArticleCollapse = useCallback(
    event => event.stopPropagation(),
    [],
  )
  const onClickArticle = useCallback(
    e => {
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet =
        !activeArticle || activeArticle._id !== doc._id ? doc._id : null
      getArticle(idToGet)
    },
    [activeArticle, doc._id, getArticle],
  )

  // use pure bootstrap.
  // advantage: can add edit icon to panel-heading
  return (
    <div className="panel panel-default">
      <PanelHeading
        className="panel-heading"
        role="tab"
        id={`heading${doc._id}`}
        onClick={onClickArticle}
        ref={ref}
      >
        <h4 className="panel-title">
          <a
            role="button"
            data-toggle="collapse"
            data-parent="#articlesAccordion"
            href={`#collapse${doc._id}`}
            aria-expanded="false"
            aria-controls={`#collapse${doc._id}`}
          >
            {doc.title}
          </a>
        </h4>
        {showEditingGlyphons && <ToggleDraftGlyph doc={doc} />}
        {showEditingGlyphons && <RemoveArticleGlyph doc={doc} />}
      </PanelHeading>
      {isActiveArticle && (
        <div
          id={`#collapse${doc._id}`}
          className="panel-collapse collapse in"
          role="tabpanel"
          aria-labelledby={`heading${doc._id}`}
          onClick={onClickArticleCollapse}
        >
          <PanelBody
            className="panel-body"
            data-panelbodypadding={panelbodypadding}
            data-panelbodymargintop={panelbodymargintop}
          >
            <Article />
          </PanelBody>
        </div>
      )}
    </div>
  )
}

export default observer(ArticlesComponent)
