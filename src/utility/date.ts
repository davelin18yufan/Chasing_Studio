import { format, parseISO, parse } from "date-fns"
import { months, daySuffix } from "@/constants"

const DATE_STRING_FORMAT_SHORT = "dd MMM yyyy"
const DATE_STRING_FORMAT = "d MMM yyyy h:mma"
const DATE_STRING_FORMAT_POSTGRES = "yyyy-MM-dd HH:mm:ss"

type AmbiguousTimestamp = number | string

export const formatDate = (date: Date, short?: boolean) =>
  format(date, short ? DATE_STRING_FORMAT_SHORT : DATE_STRING_FORMAT)

export const formatDateFromPostgresString = (date: string, short?: boolean) =>
  formatDate(parse(date, DATE_STRING_FORMAT_POSTGRES, new Date()), short)

// new Date(2024-02-27T09:38:30.435Z) -> 2024-02-26 22:38:30
export const formatDBDate = (date: Date): string =>{
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  // 构建格式化后的日期字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedDate
}
  

export const formatDateForPostgres = (date: Date) =>
  date
    .toISOString()
    .replace(/(\d{4}):(\d{2}):(\d{2}) (\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4")

const dateFromTimestamp = (timestamp?: AmbiguousTimestamp): Date =>
  typeof timestamp === "number"
    ? new Date(timestamp * 1000)
    : typeof timestamp === "string"
    ? /.+Z/i.test(timestamp)
      ? new Date(timestamp)
      : new Date(`${timestamp}Z`)
    : new Date()

const createNaiveDateWithOffset = (
  timestamp?: AmbiguousTimestamp,
  offset = "+00:00"
) => {
  const date = dateFromTimestamp(timestamp)
  const dateString = `${date.toISOString()}`.replace(/\.[\d]+Z/, offset)
  return parseISO(dateString)
}

// Run on the server, when there are date/timestamp/offset inputs

export const convertTimestampWithOffsetToPostgresString = (
  timestamp?: AmbiguousTimestamp,
  offset?: string
) => formatDateForPostgres(createNaiveDateWithOffset(timestamp, offset))

export const convertTimestampToNaivePostgresString = (
  timestamp?: AmbiguousTimestamp
) =>
  dateFromTimestamp(timestamp)
    .toISOString()
    .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(.[\d]+Z)*/, "$1 $2")

// Run in the browser, to get generate local date time strings

export const generateLocalPostgresString = () =>
  formatDateForPostgres(new Date())

export const generateLocalNaivePostgresString = () =>
  format(new Date(), DATE_STRING_FORMAT_POSTGRES)

// month. date year
export const formatBlogDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // add suffix for date
  const suffix = day < 4 ? daySuffix[day - 1] : daySuffix[3]

  return `${months[month]} ${day}${suffix} ${year}`
}