const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No experimental.viewTransition flag: as of Next 16.3 view transitions and the
  // <Link transitionTypes> prop work in the App Router with no configuration, and
  // the key is now rejected as unrecognised. Every <ViewTransition> in the tree
  // still needs default="none", because route navigations are Transitions and an
  // unqualified boundary would fire on every one of them.
  images: {
    // The client logos in Sanity are SVG wordmarks, and next/image rejects SVG
    // by default (400: "image type is not allowed") because an SVG can carry
    // script. Without this every client logo renders broken. Allowed here with
    // the mitigation Next documents for it: served as an attachment and under a
    // CSP that blocks script and sandboxes the document, so a hostile file
    // cannot execute even if one reached the CMS.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)
