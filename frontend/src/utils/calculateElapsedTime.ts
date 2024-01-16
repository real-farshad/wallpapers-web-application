const calculateElapsedTime = (dateInMS: number): string => {
  const elapsedTime = Date.now() - dateInMS

  const timeUnits: { [unit: string]: number } = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  }

  for (let unit in timeUnits) {
    if (elapsedTime >= timeUnits[unit]) {
      const count = Math.floor(elapsedTime / timeUnits[unit])
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`
    }
  }

  return "a few seconds ago"
}

export default calculateElapsedTime
