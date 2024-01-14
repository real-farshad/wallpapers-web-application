import styled from "styled-components"
import convertMillisToDateString from "./convertMillisToDateString"

interface PublishDateProps {
  dateInMS: number
}

const PublishDate: React.FC<PublishDateProps> = (props) => {
  const { dateInMS } = props
  const dateString = convertMillisToDateString(dateInMS)

  return <StyledPublishDate>Published At {dateString}</StyledPublishDate>
}

const StyledPublishDate = styled.p`
  font-size: 10px;
  font-weight: 500;
  opacity: 0.4;
`

export default PublishDate
