//
import React, { useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import euImage from '../images/eu.svg'
import gbImage from '../images/gb.svg'

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

const Header = ({ containerWidth }) => {
  const container = useRef(null)

  const [flagHeight, setFlagHeight] = useState(150)

  const changeFlagHeight = useCallback(() => {
    const measuredContainerWidth = container.current
      ? container.current.clientWidth
      : null
    if (measuredContainerWidth && measuredContainerWidth !== containerWidth) {
      // -2.5 corrects for padding between flags
      setFlagHeight(measuredContainerWidth / 4 - 2.5)
    }
  }, [containerWidth])

  useEffect(() => {
    changeFlagHeight()
    if (typeof window === `undefined`) return
    window.addEventListener('resize', debounce(changeFlagHeight, 50))
    return () =>
      window.removeEventListener('resize', debounce(changeFlagHeight, 50))
  }, [changeFlagHeight])

  const titleSize = flagHeight / 5
  const titleMarginTop = -(flagHeight / 2 + 25)

  return (
    <Container data-height={flagHeight} ref={container}>
      <FlagRow>
        <FlagContainerLeft className="flag">
          <img src={gbImage} alt="gb" />
        </FlagContainerLeft>
        <FlagContainerRight>
          <img src={euImage} alt="eu" />
        </FlagContainerRight>
      </FlagRow>
      <TitleContainer>
        <Title data-titlesize={titleSize} data-titlemargintop={titleMarginTop}>
          brexit chronology
        </Title>
      </TitleContainer>
    </Container>
  )
}

export default Header
