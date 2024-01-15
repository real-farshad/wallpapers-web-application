import styled from "styled-components"
import CoverImage from "./CoverImage"

interface AvatarProps {
  src: string
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src } = props

  return (
    <StyledAvatar>
      <CoverImage src={src} />
    </StyledAvatar>
  )
}

const StyledAvatar = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 999px;
  box-shadow: 2px 2px 0 #000;
  overflow: hidden;
`

export default Avatar
