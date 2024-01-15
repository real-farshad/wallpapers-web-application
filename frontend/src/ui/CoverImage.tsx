import styled from "styled-components"

interface CoverImageProps {
  src: string
}

const CoverImage: React.FC<CoverImageProps> = (props) => {
  const { src } = props

  return <StyledCoverImage src={src} />
}

const StyledCoverImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default CoverImage
