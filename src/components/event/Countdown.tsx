"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 120,
    hours: 14,
    minutes: 36,
    seconds: 42,
  });

  useEffect(() => {
    // Target event date: Sanskaran & Sahotsava 2026 Showcase
    const targetDate = new Date("2026-10-24T00:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 my-8">
      {timeBlocks.map((block) => (
        <div
          key={block.label}
          className="flex flex-col items-center justify-center w-20 h-22 sm:w-26 sm:h-28 rounded-xl bg-[#ffffff] border border-[#e3e3e2] shadow-[0_8px_30px_rgba(41,40,39,0.06)] backdrop-blur-md"
        >
          <span className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#292827] to-[#421d24] bg-clip-text text-transparent font-mono">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#714cb6] mt-1 uppercase">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

