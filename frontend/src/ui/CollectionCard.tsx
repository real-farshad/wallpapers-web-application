import styled from "styled-components"
import StandardText from "./StandardText"
import Link from "./Link"
import MutedSubtitle from "./MutedSubtitle"
import CoverImage from "./CoverImage"
import StandardTitle from "./StandardTitle"
import convertMSToDateString from "../utils/convertMSToDateString"

interface CollectionCardProps {
  id: string
  publisher: string
  publishDate: number
  wallpaperImage: string
  title: string
  wallpaperCount: number
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const { id, publisher, publishDate, wallpaperImage, title, wallpaperCount } = props

  const dateString = convertMSToDateString(publishDate)

  return (
    <StyledCollectionCard>
      <PublisherPublishDateContainer>
        <StandardText>
          By <Link href="/#">@{publisher}</Link>
        </StandardText>

        <MutedSubtitle>Published At {dateString}</MutedSubtitle>
      </PublisherPublishDateContainer>

      <Link href={`/collections/${id}`}>
        <ImageTitleContainer>
          <CoverImage src={wallpaperImage} />

          <ImageOverlay />

          <TitleContainer>
            <StandardTitle>{title}</StandardTitle>
          </TitleContainer>
        </ImageTitleContainer>
      </Link>

      <ActionButtonCountContainer>
        <Link href={`/collections/${id}`}>SEE COLLECTION</Link>

        <MutedSubtitle>{wallpaperCount} Wallpapers</MutedSubtitle>
      </ActionButtonCountContainer>
    </StyledCollectionCard>
  )
}

const StyledCollectionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const PublisherPublishDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ImageTitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  cursor: pointer;
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0;
  transition: 0.3s;

  ${ImageTitleContainer}:hover & {
    opacity: 0.5;
  }
`

const TitleContainer = styled.div`
  position: absolute;
  bottom: -15px;
  left: 25px;
  width: 250px;
  opacity: 0;
  transform: translateX(30px);
  transition: 0.3s;

  ${ImageTitleContainer}:hover & {
    transform: translateX(0);
    opacity: 1;
  }
`

const ActionButtonCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  width: 100%;
`

export default CollectionCard
