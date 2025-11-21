"use client"

export function TrustedByFooter() {
  // Using text-based logos for a clean, professional look
  const companies = [
    "TechCrunch",
    "Forbes",
    "The New York Times",
    "Wall Street Journal",
    "Bloomberg",
    "Reuters",
    "The Guardian",
    "Financial Times",
    "CNN Business",
    "BBC News",
  ]

  // Duplicate for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm py-8 mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm text-muted-foreground mb-6 tracking-wide uppercase font-medium">
          Trusted By
        </p>
        
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <span className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors whitespace-nowrap grayscale opacity-70 hover:opacity-100">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

