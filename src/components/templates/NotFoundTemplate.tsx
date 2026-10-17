import Link from 'next/link'

export function NotFoundTemplate() {
  return (
    <section className="not-found">
      <pre className="not-found__error" aria-hidden="true">
        bash: cd: no such file or directory
      </pre>
      <h1>404 — Page not found</h1>
      <p>
        That page doesn’t exist. <Link href="/">Back to Home</Link>
      </p>
    </section>
  )
}
