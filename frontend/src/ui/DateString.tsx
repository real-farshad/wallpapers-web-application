import convertMillisToDateString from "./convertMillisToDateString"

interface DateStringProps {
  dateInMS: number
}

const DateString: React.FC<DateStringProps> = (props) => {
  const { dateInMS } = props

  const dateString = convertMillisToDateString(dateInMS)

  return <>{dateString}</>
}

export default DateString
