//      
import React, { useState, useCallback, useContext } from 'react'
import {
  Modal,
  Button,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const ErrorAlert = styled(Alert)`
  magrin-bottom: 10px;
`

const NewActor = () => {
  const store = useContext(storeContext)
  const { newActor, setShowNewActor } = store.actors

  const [category, setCategory] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const onChangeCategory = useCallback(
    event => setCategory(event.target.value),
    [],
  )
  const createNewActor = useCallback(() => {
    if (category) {
      newActor(category)
      setShowNewActor(false)
    } else {
      setErrorMessage('Please choose a category')
    }
  }, [category, newActor, setShowNewActor])
  const closeNewActor = useCallback(() => setShowNewActor(false), [setShowNewActor])

  return (
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
        {errorMessage && (
          <ErrorAlert bsStyle="danger">{errorMessage}</ErrorAlert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeNewActor}>discard input and close</Button>
        <Button bsStyle="primary" onClick={createNewActor}>
          create new actor
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

NewActor.displayName = 'NewActor'

export default observer(NewActor)
