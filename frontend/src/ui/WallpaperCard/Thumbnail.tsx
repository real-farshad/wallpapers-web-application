import styled from "styled-components"

interface ThumbnailProps {
  src: string
}

const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  const { src } = props

  return <StyledThumbnail src={src} />
}

const StyledThumbnail = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default Thumbnail
