/** "Raspberry Pi" / "raspberry-pi" / "raspberry_pi" -> "raspberry-pi"; "C++" -> "c-plus-plus" */
export function tagSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/#/g, '-sharp')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "home-lab" -> "Home Lab", unless the label map says otherwise. */
export function tagLabel(slug: string, labels: Record<string, string>): string {
  return (
    labels[slug] ??
    slug
      .split('-')
      .filter(Boolean)
      .map((word) => word[0]!.toUpperCase() + word.slice(1))
      .join(' ')
  )
}
