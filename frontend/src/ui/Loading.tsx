import styled, { keyframes } from "styled-components"

interface LoadingProps {
  finished?: boolean
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { finished } = props

  return (
    <StyledLoading>
      <LoadingText>Loading</LoadingText>

      <LoadingContainer>
        <LoadingBackground />

        <LoadingBar completed={finished} />
      </LoadingContainer>
    </StyledLoading>
  )
}

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const dotAnimation = keyframes`
  0%, 20% {
    content: ' ';
  }
  40% {
    content: ' . ';
  }
  60% {
    content: ' . .';
  }
  80%, 100% {
    content: ' . . .';
  }
`

const LoadingText = styled.div`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  opacity: 0.4;

  &:after {
    content: "";
    animation: ${dotAnimation} 1.5s infinite;
  }
`

const LoadingContainer = styled.div`
  position: relative;
`

const LoadingBackground = styled.div`
  width: 100%;
  height: 12px;
  background-color: #ffffff;
  border-radius: 2px;
  opacity: 0.15;
`

const loadingAnimation = keyframes`
  0% {
    width: 1%;
  }
  15% {
    width: 55%;
  }
  20% {
    width: 57%;
  }
  35% {
    width: 70%;
  }
  60% {
    width: 75%;
  }
  75% {
    width: 90%;
  }
  100% {
    width: calc(100% - 4px);
  }
`

const LoadingBar = styled.div<{ completed?: boolean }>`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 1%;
  height: 8px;
  background-color: #ffffff;
  border-radius: 2px;
  opacity: 0.4;
  animation: ${loadingAnimation} ${({ completed }) => (completed ? "0.5s" : "15s")} linear both;
`

export default Loading
