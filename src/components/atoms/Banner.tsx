import type { CSSProperties } from 'react'

/** A Project's ASCII-art name. Decorative: the Project heading carries the name for screen readers. */
export function Banner({ text }: { text: string }) {
  const columns = Math.max(...text.split('\n').map((line) => line.length))
  return (
    <pre
      className="banner"
      aria-hidden="true"
      style={{ '--banner-columns': columns } as CSSProperties}
    >
      {text}
    </pre>
  )
}
