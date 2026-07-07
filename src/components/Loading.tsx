export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full opacity-30 animate-pulse"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, rgba(245,197,24,0.12) 0%, transparent 70%)", animationDelay: "0.7s" }} />
      </div>

      {/* Spinner ring */}
      <div className="relative w-20 h-20 mb-8">
        {/* Track */}
        <div className="absolute inset-0 rounded-full"
          style={{ border: "2px solid rgba(59,130,246,0.08)" }} />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full animate-spin"
          style={{ border: "2px solid transparent", borderTopColor: "#3b82f6", borderRightColor: "rgba(59,130,246,0.3)" }} />
        {/* Inner gold ring */}
        <div className="absolute inset-2 rounded-full"
          style={{ border: "1px solid rgba(245,197,24,0.15)" }} />
        {/* Icon center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" style={{ color: "#f5c518" }} viewBox="0 0 24 24">
            <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center gap-3">
        <div className="font-outfit font-black text-2xl tracking-tight">
          <span className="gold-text">HOTPOP</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>TIME</span>
        </div>
        {/* Bouncing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: i % 2 === 0 ? "rgba(59,130,246,0.7)" : "rgba(245,197,24,0.6)",
                animationDelay: `${i * 0.12}s`,
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}
