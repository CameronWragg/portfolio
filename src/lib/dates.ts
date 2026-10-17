import type { YearMonth } from '../content/site.content'

const monthYear = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const dayMonthYear = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** "2024-01" -> "Jan 2024" */
export function formatYearMonth(value: YearMonth): string {
  return monthYear.format(new Date(`${value}-01T00:00:00Z`))
}

/** "Jan 2024 – Present" */
export function formatRange(start: YearMonth, end?: YearMonth): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`
}

/** ISO timestamp -> "9 Oct 2026" */
export function formatDate(iso: string): string {
  return dayMonthYear.format(new Date(iso))
}
