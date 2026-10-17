export interface HeroProps {
  name: string
  role: string
  tagline: string
  about: string[]
  location: string
}

export function Hero({ name, role, tagline, about, location }: HeroProps) {
  return (
    <section className="hero">
      <hgroup>
        <h1>{name}</h1>
        <p className="hero__role">
          {role} <span className="muted">· {location}</span>
        </p>
      </hgroup>
      <p className="hero__tagline">{tagline}</p>
      {about.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}
