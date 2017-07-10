// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import debounce from 'lodash/debounce'

import euImage from '../images/eu.svg'
import gbImage from '../images/gb.svg'

const enhance = compose(withState('flagHeight', 'changeFlagHeight', 150))

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  min-height: ${props => props['data-height']}px;
  height: ${props => props['data-height']}px;
  div,
  img {
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
  margin-top: ${props => props['data-titleMargintop']}px;
  width: 100%;
  text-align: center;
  font-size: ${props => props['data-titleSize']}px;
  font-weight: 800;
  line-height: 46px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  opacity: 0.9;
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
    const titleSize = flagHeight / 5
    const titleMarginTop = -(flagHeight / 2 + 25)

    return (
      <Container
        data-height={flagHeight}
        ref={j => {
          // $FlowIssue
          this.container = j
        }}
      >
        <FlagRow>
          <FlagContainer className="flag">
            <img src={gbImage} alt="gb" />
          </FlagContainer>
          <FlagContainer>
            <img src={euImage} alt="eu" />
          </FlagContainer>
        </FlagRow>
        <TitleContainer>
          <Title
            data-titleSize={titleSize}
            data-titleMargintop={titleMarginTop}
          >
            brexit chronology
          </Title>
        </TitleContainer>
      </Container>
    )
  }
}

export default enhance(Header)
