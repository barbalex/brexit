// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import debounce from 'lodash/debounce'

import euImage from '../images/eu.svg'
import ukImage from '../images/uk.svg'

const enhance = compose(withState('flagHeight', 'changeFlagHeight', 150))

const Container = styled.div`
  margin-top: 36px;
  height: 150px;
  display: flex;
  flex-direction: column;
  min-height: ${props => props['data-height']}px;
  height: ${props => props['data-height']}px;
  .flag {
    min-height: ${props => props['data-height']}px;
    height: ${props => props['data-height']}px;
  }
`
const FlagRow = styled.div`
  display: flex;
  padding-bottom: 25px;
`
const FlagContainer = styled.div`
  position: relative;
  height: 100%;
`
const TitleContainer = styled.div`position: relative;`
const Title = styled.div`
  position: absolute;
  margin-top: 125px;
  width: 100%;
  text-align: center;
  font-size: 58px;
  font-weight: 800;
  line-height: 46px;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 3px black, -2px -2px 3px black, 2px -2px 3px black,
    -2px 2px 3px black;
  hyphens: manual;
`

class Header extends Component {
  displayName: 'Header'

  props: {
    flagHeight: number,
    changeFlagHeight: () => void,
    containerWidth: number,
  }

  componentDidMount() {
    this.setFlagHeight()
    window.addEventListener('resize', debounce(this.setFlagHeight, 50))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.setFlagHeight, 50))
  }

  setFlagHeight = () => {
    const { containerWidth: containerWidthOld, changeFlagHeight } = this.props
    const containerDomNode = this.container
      ? // $FlowIssue
        ReactDOM.findDOMNode(this.container)
      : null
    const containerWidth = containerDomNode
      ? containerDomNode.clientWidth
      : null
    if (containerWidth && containerWidth !== containerWidthOld) {
      changeFlagHeight(containerWidth / 4)
    }
  }

  render = () => {
    const { flagHeight } = this.props
    return (
      <Container
        className="flag"
        data-height={flagHeight}
        ref={j => {
          // $FlowIssue
          this.container = j
        }}
      >
        <FlagRow className="flag">
          <FlagContainer className="flag">
            <img src={ukImage} className="flag" alt="uk" />
          </FlagContainer>
          <FlagContainer className="flag">
            <img src={euImage} className="flag" alt="eu" />
          </FlagContainer>
        </FlagRow>
        <TitleContainer>
          <Title>brexit chronology</Title>
        </TitleContainer>
      </Container>
    )
  }
}

export default enhance(Header)
