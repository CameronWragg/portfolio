import { ImageResponse } from 'next/og'

import { siteContent } from '@/content/site.content'

// Rendered once at build time; static export has no server to render it on request.
export const dynamic = 'force-static'
export const alt = `${siteContent.name}, ${siteContent.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        background: '#2c2525',
        color: '#fff1f3',
      }}
    >
      <div style={{ fontSize: 36, color: '#9a9091' }}>$ whoami</div>
      <div style={{ fontSize: 96, fontWeight: 700, color: '#f9cc6c' }}>{siteContent.name}</div>
      <div style={{ fontSize: 48 }}>{siteContent.role}</div>
      <div style={{ display: 'flex', gap: 24, marginTop: 48 }}>
        {['#fd6883', '#f38d70', '#f9cc6c', '#adda78', '#85dacc', '#a8a9eb'].map((color) => (
          <div key={color} style={{ width: 48, height: 12, background: color }} />
        ))}
      </div>
    </div>,
    size,
  )
}
