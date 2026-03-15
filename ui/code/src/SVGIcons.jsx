
const SVGIcons = {
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
  <defs>
    <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563EB;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4F46E5;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1E293B" />
      <stop offset="100%" style="stop-color:#334155" />
    </linearGradient>
    <linearGradient id="trendLine" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.9" />
    </linearGradient>
    <!-- Glow filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <!-- Subtle shadow -->
    <filter id="shadow" x="-5%" y="-5%" width="115%" height="125%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1E293B" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background rounded box (subtle) -->
  <rect x="8" y="8" width="384" height="144" rx="16" ry="16" fill="#F8FAFC" filter="url(#shadow)" />

  <!-- === ICON MARK === -->
  <!-- Base circle -->
  <circle cx="72" cy="80" r="42" fill="#EFF6FF" />

  <!-- Bar Chart inside circle -->
  <!-- Bar 1 (shortest - blue) -->
  <rect x="48" y="88" width="10" height="24" rx="3" ry="3" fill="url(#barGrad1)" />
  <!-- Bar 2 (medium - indigo) -->
  <rect x="62" y="72" width="10" height="40" rx="3" ry="3" fill="url(#barGrad3)" />
  <!-- Bar 3 (tallest - green) -->
  <rect x="76" y="58" width="10" height="54" rx="3" ry="3" fill="url(#barGrad2)" />

  <!-- Trend arrow (upward curve) -->
  <polyline points="46,90 56,82 68,78 80,60 92,52" 
            fill="none" stroke="url(#trendLine)" stroke-width="2.5" 
            stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
  <!-- Arrow head -->
  <polygon points="92,48 97,55 89,56" fill="#10B981" />

  <!-- === TEXT === -->
  <!-- Main Title -->
  <text x="130" y="75" font-family="'Segoe UI', 'Helvetica Neue', sans-serif" font-weight="700" font-size="32" fill="url(#textGrad)" letter-spacing="-0.5">
    <tspan>Sales</tspan>
    <tspan fill="#3B82F6"> Lytics</tspan>
  </text>

  <!-- Tagline -->
  <text x="132" y="103" font-family="'Segoe UI', 'Helvetica Neue', sans-serif" font-weight="400" font-size="13" fill="#64748B" letter-spacing="3.5">
    ANALYTICS &amp; INSIGHTS
  </text>

  <!-- Decorative accent line under tagline -->
  <rect x="132" y="112" width="52" height="2.5" rx="1.25" fill="url(#barGrad2)" opacity="0.7"/>
  <rect x="188" y="112" width="24" height="2.5" rx="1.25" fill="url(#barGrad1)" opacity="0.45"/>

</svg>`,
    volumeGrowth: `<svg fill="#0dd91a" width="64px" height="64px" viewBox="-225.28 -225.28 1474.56 1474.56" xmlns="http://www.w3.org/2000/svg" stroke="#0dd91a" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-225.28" y="-225.28" width="1474.56" height="1474.56" rx="737.28" fill="#7eecae" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><path d="M136.948 908.811c5.657 0 10.24-4.583 10.24-10.24V610.755c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v287.816c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V610.755c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v287.816c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.96c5.657 0 10.24-4.583 10.24-10.24V551.322c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v347.249c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V551.322c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v347.249c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.342c5.657 0 10.24-4.583 10.24-10.24V492.497c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v406.692c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V492.497c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v406.692c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.958c5.657 0 10.24-4.583 10.24-10.24V441.299c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v457.892c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V441.299c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v457.892c0 28.278-22.922 51.2-51.2 51.2zm-6.205-841.902C677.379 271.088 355.268 367.011 19.245 387.336c-11.29.683-19.889 10.389-19.206 21.679s10.389 19.889 21.679 19.206c342.256-20.702 670.39-118.419 964.372-284.046 9.854-5.552 13.342-18.041 7.79-27.896s-18.041-13.342-27.896-7.79z"></path><path d="M901.21 112.64l102.39.154c11.311.017 20.494-9.138 20.511-20.449s-9.138-20.494-20.449-20.511l-102.39-.154c-11.311-.017-20.494 9.138-20.511 20.449s9.138 20.494 20.449 20.511z"></path><path d="M983.151 92.251l-.307 101.827c-.034 11.311 9.107 20.508 20.418 20.542s20.508-9.107 20.542-20.418l.307-101.827c.034-11.311-9.107-20.508-20.418-20.542s-20.508 9.107-20.542 20.418z"></path></g></svg>`
}

export default SVGIcons;