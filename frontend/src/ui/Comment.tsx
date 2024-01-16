import styled from "styled-components"
import PlainText from "./PlainText"
import StandardText from "./StandardText"
import Link from "./Link"
import Avatar from "./Avatar"
import StandardSubtitle from "./StandardSubtitle"
import calculateElapsedTime from "../utils/calculateElapsedTime"

interface CommentProps {
  avatar: string
  publisher: string
  dateInMS: number
  description: string
}

const Comment: React.FC<CommentProps> = (props) => {
  const { avatar, publisher, dateInMS, description } = props

  const timeSincePublish = calculateElapsedTime(dateInMS)

  return (
    <StyledComment>
      <AvatarInfoContainer>
        <AvatarContainer>
          <Avatar src={avatar} />
        </AvatarContainer>

        <InfoContainer>
          <StandardText>
            By <Link href="/#">@{publisher}</Link>
          </StandardText>

          <StyledStandardSubtitle>Published {timeSincePublish}</StyledStandardSubtitle>
        </InfoContainer>
      </AvatarInfoContainer>

      <DescriptionContainer>
        <PlainText>{description}</PlainText>
      </DescriptionContainer>
    </StyledComment>
  )
}

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const AvatarInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledStandardSubtitle = styled(StandardSubtitle)`
  text-transform: capitalize;
`

const DescriptionContainer = styled.div`
  padding-left: 60px;
`

export default Comment
