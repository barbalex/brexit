// @flow
import React from 'react'
import {
  Modal,
  Button,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

const ErrorAlert = styled(Alert)`
  magrin-bottom: 10px;
`

const categoryOptions = publicationCategories => {
  const options = publicationCategories.map((category, index) =>
    <option key={index + 1} value={category}>
      {category}
    </option>
  )
  options.unshift(<option key={0} value={null} />)
  return options
}

const enhance = compose(
  inject(`store`),
  withState('title', 'changeTitle', ''),
  withState('category', 'changeCategory', ''),
  withState('error', 'changeError', ''),
  withHandlers({
    onChangeTitle: props => (event: Object): void =>
      props.changeTitle(event.target.value),
    onChangeCategory: props => (event: Object): void =>
      props.changeCategory(event.target.value),
    createNewPublication: props => () => {
      const { title, category, changeError, store } = props
      if (title && category) {
        store.publications.newPublication(category, title)
        store.publications.setShowNewPublication(false)
      } else {
        const error = title ? 'Please choose a category' : 'Please set a title'
        changeError(error)
      }
    },
    close: props => () => {
      props.store.publications.setShowNewPublication(false)
    },
  }),
  observer
)

const NewPublication = ({
  store,
  title,
  category,
  error,
  changeTitle,
  changeCategory,
  changeError,
  onChangeTitle,
  onChangeCategory,
  createNewPublication,
  close,
}: {
  store: Object,
  title: string,
  category: string,
  error: string,
  changeTitle: () => void,
  changeCategory: () => void,
  changeError: () => void,
  onChangeTitle: () => void,
  onChangeCategory: () => void,
  createNewPublication: () => void,
  close: () => void,
}) => {
  const publicationCategories = store.publications.getPublicationCategories()

  return (
    <Modal show onHide={close} bsSize="large">
      <Modal.Header>
        <Modal.Title>New publication</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormGroup controlId="event">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={title}
            onChange={onChangeTitle}
            tabIndex={1}
            autoFocus
          />
        </FormGroup>
        <FormGroup controlId="category">
          <ControlLabel>Category</ControlLabel>
          <FormControl
            componentClass="select"
            value={category}
            onChange={onChangeCategory}
            tabIndex={2}
          >
            {categoryOptions(publicationCategories)}
          </FormControl>
        </FormGroup>
        {error &&
          <ErrorAlert bsStyle="danger">
            {error}
          </ErrorAlert>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>discard input and close</Button>
        <Button bsStyle="primary" onClick={createNewPublication}>
          create new publication
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

NewPublication.displayName = 'NewPublication'

export default enhance(NewPublication)
