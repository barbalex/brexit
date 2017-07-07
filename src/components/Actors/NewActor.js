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

const enhance = compose(
  inject(`store`),
  withState('category', 'changeCategory', ''),
  withState('error', 'changeError', null),
  withHandlers({
    onChangeCategory: props => (event: Object): void =>
      props.changeCategory(event.target.value),
    createNewActor: props => () => {
      const { category } = props
      if (category) {
        props.store.actors.newActor(category)
        props.store.actors.setShowNewActor(false)
      } else {
        props.changeError('Please choose a category')
      }
    },
    closeNewActor: props => () => {
      props.store.actors.setShowNewActor(false)
    },
  }),
  observer
)

const NewActor = ({
  store,
  category,
  error,
  closeNewActor,
  onChangeCategory,
  createNewActor,
}: {
  store: Object,
  category: string,
  error: string,
  closeNewActor: () => void,
  onChangeCategory: () => void,
  createNewActor: () => void,
}) =>
  <Modal show bsSize="large">
    <Modal.Header>
      <Modal.Title>New actor category</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <FormGroup controlId="actorCategory">
        <ControlLabel>Category</ControlLabel>
        <FormControl
          type="text"
          value={category}
          onChange={onChangeCategory}
          autoFocus
        />
      </FormGroup>
      {error &&
        <ErrorAlert bsStyle="danger">
          {error}
        </ErrorAlert>}
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={closeNewActor}>discard input and close</Button>
      <Button bsStyle="primary" onClick={createNewActor}>
        create new actor
      </Button>
    </Modal.Footer>
  </Modal>

NewActor.displayName = 'NewActor'

export default enhance(NewActor)
