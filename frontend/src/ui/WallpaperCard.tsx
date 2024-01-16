import styled, { css, keyframes } from "styled-components"
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

  const showLoading = loading && !watermark
  const showWatermark = !!watermark
  const showTitle = !loading && !watermark

  return (
    <StyledWallpaperCard>
      <PublisherPublishDateContainer>
        <StandardText>
          By <Link href="/#">@{publisher}</Link>
        </StandardText>

        <MutedSubtitle>Published At {dateString}</MutedSubtitle>
      </PublisherPublishDateContainer>

      <Link href={`/collections/${id}`}>
        <ImageOverlayContainer>
          <CoverImage src={wallpaperImage} />

          <LoadingContainer>
            <Loading show={showLoading} />
          </LoadingContainer>

          <WatermarkContainer show={showWatermark}>
            <WatermarkBackground />

            <WatermarkTextContainer>
              <Watermark>{watermark}</Watermark>
            </WatermarkTextContainer>
          </WatermarkContainer>

          <div>
            <TitleBackground show={showTitle} />

            <TitleTextContainer show={showTitle}>
              <StandardTitle>{title}</StandardTitle>
            </TitleTextContainer>
          </div>
        </ImageOverlayContainer>
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

const ImageOverlayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  cursor: pointer;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const Loading = styled.div<{ show?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0;

  ${({ show }) =>
    show &&
    css`
      animation: ${blinkAnimation} 1s infinite;
    `}
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

const WatermarkContainer = styled.div<{ show?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  ${({ show }) =>
    show &&
    css`
      animation: ${fadeInOutAnimation} 1s both;
    `}
`

const WatermarkBackground = styled.div`
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

const TitleBackground = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0;
  transition: 0.3s;

  ${({ show }) =>
    show &&
    css`
      ${ImageOverlayContainer}:hover & {
        opacity: 0.5;
      }
    `}
`

const TitleTextContainer = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: -15px;
  left: 25px;
  width: 250px;
  opacity: 0;
  transform: translateX(30px);
  transition: 0.3s;

  ${({ show }) =>
    show &&
    css`
      ${ImageOverlayContainer}:hover & {
        transform: translateX(0);
        opacity: 1;
      }
    `}
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
