import Link from 'next/link'

import { NavLink } from '@/components/atoms/NavLink'

export function SiteHeader({ name }: { name: string }) {
  return (
    <header className="container site-header">
      <nav>
        <ul>
          <li>
            <Link href="/" className="site-name">
              {name}
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink href="/experience">Experience</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
