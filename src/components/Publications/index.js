// @flow
import React, { Component } from 'react'
import sortBy from 'lodash/sortBy'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'

import PublicationsOfCategory from './PublicationsOfCategory'
import NewPublication from './NewPublication'
import oceanDarkImage from '../../images/oceanDark.jpg'

const Container = styled.div`
  margin-bottom: 20px;
  .category > .panel-collapse > .panel-body {
    padding: 0 0 !important;
  }
  .panel.month {
    margin-top: 0 !important;
    border-radius: 0 !important;
    border-top-width: 0 !important;
    border-right-width: 0 !important;
    border-left-width: 0 !important;
  }
  .panel.month .panel-heading {
    background-color: transparent;
  }
  .panel.month .panel-heading:hover {
    background-color: #f5f5f5;
  }
  .panel-heading {
    cursor: pointer;
  }
  .panel.month > .panel-heading h4 {
    font-weight: bold;
    z-index: 0;
  }
  .panel.month:last-of-type {
    border-bottom-width: 0 !important;
  }
`
const PanelGroup = styled.div`
  margin-bottom: 0 !important;
  > div > .panel-heading {
    background-image: url(${oceanDarkImage});
  }
  &.not-active > .panel-heading {
    border-radius: 3px;
  }
  > div > .panel-heading a {
    color: #edf4f8;
    font-weight: bold;
  }
`
const orderByCategory = {
  Academic: 3,
  'European Union': 1,
  'IOs & NGOs': 2,
}

const enhance = compose(
  inject(`store`),
  withRouter,
  withHandlers({
    onClickCategory: props => (activePublicationCategory: string): void =>
      props.store.publications.setPublicationCategory(
        activePublicationCategory,
        props.history
      ),
  }),
  observer
)

class Publications extends Component {
  displayName: 'Publications'

  props: {
    store: Object,
    onClickCategory: () => void,
  }

  componentDidMount() {
    this.props.store.publications.getPublications()
  }

  publicationCategoriesComponent = activePublicationCategory => {
    const { store, onClickCategory } = this.props
    let publicationCategories = store.publications.getPublicationCategories()
    const { publications } = store.publications

    if (publications.length > 0 && publicationCategories.length > 0) {
      publicationCategories = sortBy(publicationCategories, cat => {
        let order = orderByCategory[cat]
        if (!order) order = 4
        return order
      })
      return publicationCategories.map(category => {
        return (
          <div
            key={category}
            className="panel panel-default category active"
            onClick={onClickCategory.bind(this, category)}
          >
            <div className="panel-heading" role="tab" id={`heading${category}`}>
              <h4 className="panel-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#publicationsAccordion"
                  href={`#${category}`}
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  {category}
                </a>
              </h4>
            </div>
            <PublicationsOfCategory category={category} />
          </div>
        )
      })
    }
    return null
  }

  render() {
    const {
      activePublicationCategory,
      showNewPublication,
    } = this.props.store.publications

    return (
      <DocumentTitle title="blue-borders | Publications">
        <Container>
          <h1>Publications</h1>
          <PanelGroup
            className="panel-group"
            id="publicationsAccordion"
            role="tablist"
          >
            {this.publicationCategoriesComponent(activePublicationCategory)}
          </PanelGroup>
          {showNewPublication && <NewPublication />}
        </Container>
      </DocumentTitle>
    )
  }
}

export default enhance(Publications)
