'use client'

export function ElysiumSymbol({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#0c0c0c" rx="5"/>
      <g transform="translate(16,16)">
        <rect x="-9" y="-9.5" width="18" height="2.8" rx="1" fill="#C9A84C"/>
        <rect x="-9" y="-1.4" width="12" height="2.8" rx="1" fill="#C9A84C"/>
        <rect x="-9" y="6.7"  width="18" height="2.8" rx="1" fill="#C9A84C"/>
      </g>
    </svg>
  )
}

export function ElysiumLogoFull({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ''}`}>
      <ElysiumSymbol size={44} />
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 200,
        letterSpacing: '0.35em',
        color: '#C9A84C',
        fontSize: '22px',
        lineHeight: 1,
      }}>
        ELYSIUM
      </span>
    </div>
  )
}

export function ElysiumLoginLogo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute inset-0 rounded-[20px] glow-gold" />
        <svg width="72" height="72" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
          <rect width="512" height="512" fill="#0c0c0c" rx="80"/>
          <g transform="translate(256,256)">
            <rect x="-144" y="-152" width="288" height="44" rx="12" fill="#C9A84C"/>
            <rect x="-144" y="-22"  width="192" height="44" rx="12" fill="#C9A84C"/>
            <rect x="-144" y="108"  width="288" height="44" rx="12" fill="#C9A84C"/>
          </g>
        </svg>
      </div>
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 200,
        letterSpacing: '0.4em',
        color: '#C9A84C',
        fontSize: '26px',
      }}>
        ELYSIUM
      </span>
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 300,
        letterSpacing: '0.18em',
        color: '#555555',
        fontSize: '11px',
        marginTop: '4px',
        textTransform: 'uppercase',
      }}>
        Feito pela Beyonder · 2026
      </span>
    </div>
  )
}
