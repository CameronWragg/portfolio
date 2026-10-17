/** The deployed origin, used for absolute URLs in metadata and the sitemap. Set SITE_URL in the build env. */
export const siteUrl = new URL(process.env.SITE_URL ?? 'http://localhost:3000')
