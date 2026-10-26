export default function MarqueeTicker() {
  const tickerItems = [
    { text: "Fall 2026 Priority Intakes Open" },
    { text: "Imperial College London — £12,000 Scholarship Secured" },
    { text: "99.2% Visa Approval Track Record" },
    { text: "University of Toronto — Data Science & CS Admits" },
    { text: "Complimentary 1-on-1 Profile Assessment & Shortlist" },
    { text: "University of Melbourne — Direct Offers Issued" },
    { text: "500+ Direct University Partnerships Across 18 Countries" },
    { text: "National University of Singapore — Merit Grant Awarded" },
    { text: "End-to-End SOP, Visa, & Financial Documentation Support" },
  ];

  return (
    // Inset by the same gutter as the panels above it, with rounded ends
    <div className="w-full max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 pb-3 sm:pb-4 lg:pb-6 relative z-20">
      <aside
        className="w-full rounded-2xl lg:rounded-3xl bg-[#081736] text-slate-200 overflow-hidden select-none py-3.5 sm:py-4"
        aria-label="Latest university admits and announcements"
      >
        {/* Text fades out at both ends, inside the rounded bar */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-8 text-xs sm:text-[13px] font-normal tracking-wide uppercase">
            {/* Render twice for continuous smooth loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-slate-300 font-normal">{item.text}</span>
                <span className="text-[#38BDF8] font-normal text-sm select-none">✦</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
