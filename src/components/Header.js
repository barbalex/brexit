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
  margin-top: 23px;
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
  /* needs to be behind title container */
  z-index: -2;
`
const FlagContainerLeft = styled(FlagContainer)`
  padding-right: 5px;
`
const FlagContainerRight = styled(FlagContainer)`
  padding-left: 5px;
`
const TitleContainer = styled.div`
  position: relative;
  /* needs to be behind form elements */
  z-index: -1;
`
const Title = styled.div`
  position: absolute;
  margin-top: ${props => props['data-titlemargintop']}px;
  width: 100%;
  text-align: center;
  font-size: ${props => props['data-titlesize']}px;
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
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

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
    const containerDomNode = this.container.current
      ? // $FlowIssue
        ReactDOM.findDOMNode(this.container.current)
      : null
    const containerWidth = containerDomNode
      ? containerDomNode.clientWidth
      : null
    if (containerWidth && containerWidth !== containerWidthOld) {
      changeFlagHeight(containerWidth / 4)
    }
  }

  render() {
    const { flagHeight } = this.props
    const titleSize = flagHeight / 5
    const titleMarginTop = -(flagHeight / 2 + 25)

    return (
      <Container data-height={flagHeight} ref={this.container}>
        <FlagRow>
          <FlagContainerLeft className="flag">
            <img src={gbImage} alt="gb" />
          </FlagContainerLeft>
          <FlagContainerRight>
            <img src={euImage} alt="eu" />
          </FlagContainerRight>
        </FlagRow>
        <TitleContainer>
          <Title
            data-titlesize={titleSize}
            data-titlemargintop={titleMarginTop}
          >
            brexit chronology
          </Title>
        </TitleContainer>
      </Container>
    )
  }
}

export default enhance(Header)
