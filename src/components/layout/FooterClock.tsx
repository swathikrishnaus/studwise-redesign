"use client";

import { useEffect, useState } from "react";

/* Live office time in Kerala (IST), so students abroad know when we're in */
const format = () =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date());

export default function FooterClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(format());
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time ?? "--:--"} IST</span>;
}
