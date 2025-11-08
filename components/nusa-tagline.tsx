export function NUSATaglineSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-6">
          {/* Complete Poem */}
          <div className="space-y-3 font-sans">
            <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tighter" style={{color: '#134146'}}>
              Rise as a <span className="font-romulo-italic tracking-wide" style={{ color: '#e3b251' }}>Muslim Tangguh, Jago IT</span>.
            </p>
            <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans" style={{color: '#134146'}}>
              Lead with faith, knowledge, and courage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}