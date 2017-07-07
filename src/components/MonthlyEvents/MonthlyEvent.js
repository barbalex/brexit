// @flow
import React from 'react'
import { Button } from 'react-bootstrap'
import { Base64 } from 'js-base64'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import Editor from '../shared/Editor'
import MonthlyEventMeta from './MonthlyEventMeta'

const Container = styled.div`
  table > thead > tr > th {
    border-bottom: 0 solid #dddddd !important;
    line-height: .3;
  }
  table > thead > tr.totals > td {
    border-top: 0;
    border-bottom: 2px solid #dddddd !important;
    line-height: .6;
    color: #9c9c9c;
  }
`
const MetaButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`

const enhance = compose(
  inject(`store`),
  withState('showMeta', 'changeShowMeta', false),
  withHandlers({
    onClickMeta: props => () => props.changeShowMeta(!props.showMeta),
    onCloseMeta: props => () => props.changeShowMeta(false),
  }),
  observer
)

const MonthlyEvent = ({
  store,
  year,
  month,
  showMeta,
  onClickMeta,
  onCloseMeta,
}: {
  store: Object,
  year: string,
  month: string,
  showMeta: boolean,
  onClickMeta: () => void,
  onCloseMeta: () => void,
}) => {
  const articleEncoded = store.monthlyEvents.activeMonthlyEvent.article
  const articleDecoded = Base64.decode(articleEncoded)

  if (store.editing) {
    return (
      <Container>
        {showMeta &&
          <MonthlyEventMeta
            year={year}
            month={month}
            onCloseMeta={onCloseMeta}
          />}
        <Editor
          docType="monthlyEvent"
          doc={store.monthlyEvents.activeMonthlyEvent}
          articleDecoded={articleDecoded}
        />
        <MetaButton onClick={onClickMeta}>arrivals & victims</MetaButton>
      </Container>
    )
  }
  const createMarkup = () => ({ __html: articleDecoded })
  return (
    <Container>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </Container>
  )
}

MonthlyEvent.displayName = 'MonthlyEvent'

export default enhance(MonthlyEvent)
