import styled, { css, keyframes } from "styled-components"
import CoverImage from "./CoverImage"
import Loading from "./Loading"

interface LoadingScreenProps {
  image: string
  finishLoading?: boolean
  fadeIn?: boolean
  fadeOut?: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  const { image, finishLoading, fadeIn, fadeOut } = props

  return (
    <StyledLoadingScreen fadeIn={fadeIn} fadeOut={fadeOut}>
      <CoverImage src={image} />

      <LoadingContainer>
        <Loading finished={finishLoading} />
      </LoadingContainer>
    </StyledLoadingScreen>
  )
}

const fadeInZoomOutClear = keyframes`
  from {
    opacity: 0;
    transform: scale(1.2);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
`

const fadeOutZoomInBlur = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }

  to {
    opacity: 0;
    transform: scale(1.2);
    filter: blur(10px);
  }
`

const StyledLoadingScreen = styled.div<{ fadeIn?: boolean; fadeOut?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ fadeIn }) =>
    fadeIn &&
    css`
      opacity: 0;
      transform: scale(1.2);
      filter: blur(10px);
      animation: ${fadeInZoomOutClear} 1s ease-in-out forwards;
    `}

  ${({ fadeOut }) =>
    fadeOut &&
    css`
      animation: ${fadeOutZoomInBlur} 1s ease-in-out forwards;
    `}
`

const LoadingContainer = styled.div`
  position: absolute;
  bottom: 80px;
  left: 100px;
  width: 500px;
`

export default LoadingScreen
