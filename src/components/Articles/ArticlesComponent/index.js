//
import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

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

const ArticlesComponent = ({ history, activeArticlePanel }) => {
  const store = useContext(storeContext)
  const { articles, activeArticle, getArticle } = store.articles

  // prevent higher level panels from reacting
  const onClickArticleCollapse = useCallback(
    event => event.stopPropagation(),
    [],
  )
  const onClickArticle = useCallback(
    (id, e) => {
      // prevent higher level panels from reacting
      e.stopPropagation()
      const idToGet = !activeArticle || activeArticle._id !== id ? id : null
      getArticle(idToGet, history)
    },
    [activeArticle, getArticle, history],
  )

  if (articles.length > 0) {
    return articles.map((doc, index) => {
      const isArticle = !!activeArticle
      const isActiveArticle = isArticle ? doc._id === activeArticle._id : false
      const showEditingGlyphons = !!store.login.email
      const panelbodypadding = store.editing ? '0 !important' : '15px'
      const panelbodymargintop = store.editing ? '-1px' : 0

      // use pure bootstrap.
      // advantage: can add edit icon to panel-heading
      return (
        <div
          key={doc._id}
          ref={activeArticlePanel || null}
          className="panel panel-default"
        >
          <PanelHeading
            className="panel-heading"
            role="tab"
            id={`heading${index}`}
            onClick={e => onClickArticle(doc._id, e)}
          >
            <h4 className="panel-title">
              <a
                role="button"
                data-toggle="collapse"
                data-parent="#articlesAccordion"
                href={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`#collapse${index}`}
              >
                {doc.title}
              </a>
            </h4>
            {showEditingGlyphons && <ToggleDraftGlyph doc={doc} />}
            {showEditingGlyphons && <RemoveArticleGlyph doc={doc} />}
          </PanelHeading>
          {isActiveArticle && (
            <div
              id={`#collapse${index}`}
              className="panel-collapse collapse in"
              role="tabpanel"
              aria-labelledby={`heading${index}`}
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
    })
  }
  return null
}

export default withRouter(ArticlesComponent)
