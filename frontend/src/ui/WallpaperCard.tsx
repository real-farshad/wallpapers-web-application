import styled, { keyframes } from "styled-components"
import StandardText from "./StandardText"
import Link from "./Link"
import MutedSubtitle from "./MutedSubtitle"
import CoverImage from "./CoverImage"
import StandardTitle from "./StandardTitle"
import convertMSToDateString from "../utils/convertMSToDateString"
import formatNumber from "../utils/formatNumber"
import Watermark from "./Watermark"

interface WallpaperCardProps {
  id: string
  publisher: string
  publishDate: number
  wallpaperImage: string
  title: string
  liked?: boolean
  likeCount: number
  saved?: boolean
  loading?: boolean
  watermark?: string
}

const WallpaperCard: React.FC<WallpaperCardProps> = (props) => {
  const {
    id,
    publisher,
    publishDate,
    wallpaperImage,
    title,
    liked,
    likeCount,
    saved,
    loading,
    watermark,
  } = props

  const dateString = convertMSToDateString(publishDate)
  const likesCountString = formatNumber(likeCount)

  return (
    <StyledWallpaperCard>
      <PublisherPublishDateContainer>
        <StandardText>
          By <Link href="/#">@{publisher}</Link>
        </StandardText>

        <MutedSubtitle>Published At {dateString}</MutedSubtitle>
      </PublisherPublishDateContainer>

      <Link href={`/collections/${id}`}>
        <ImageTitleContainer>
          <CoverImage src={wallpaperImage} />

          {loading && !watermark && <LoadingOverlay />}

          {watermark && (
            <WatermarkContainer>
              <WatermarkOverlay />

              <WatermarkTextContainer>
                <Watermark>SAVED</Watermark>
              </WatermarkTextContainer>
            </WatermarkContainer>
          )}

          {!loading && !watermark && (
            <>
              <ImageOverlay />

              <TitleContainer>
                <StandardTitle>{title}</StandardTitle>
              </TitleContainer>
            </>
          )}
        </ImageTitleContainer>
      </Link>

      <ActionButtonCountContainer>
        <LikeButton>
          <StandardText>{liked ? "LIKED" : "LIKE"}</StandardText>

          <MutedSubtitle>{likesCountString}</MutedSubtitle>
        </LikeButton>

        <SaveButton>{saved ? "SAVED" : "SAVE"}</SaveButton>
      </ActionButtonCountContainer>
    </StyledWallpaperCard>
  )
}

const StyledWallpaperCard = styled.div`
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

const blinkAnimation = keyframes`
  0% {
      opacity: 0;
      animation-timing-function: ease-in-out;
  }
  50% {
      opacity: 0.5;
      animation-timing-function: ease-in-out;
  }
  100% {
      opacity: 0;
  }
`

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0;
  animation: ${blinkAnimation} 1s infinite;
`
const fadeInOutAnimation = keyframes`
  0% {
      opacity: 0;
      animation-timing-function: ease-in;
  }
  25% {
      opacity: 1;
  }
  75% {
      opacity: 1;
      animation-timing-function: ease-out;
  }
  100% {
      opacity: 0;
  }
`

const WatermarkContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: ${fadeInOutAnimation} 1s both;
`

const WatermarkOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
`

const WatermarkTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ActionButtonCountContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 20px;
`

const SaveButton = styled.button`
  text-transform: uppercase;
`

const LikeButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`

export default WallpaperCard
