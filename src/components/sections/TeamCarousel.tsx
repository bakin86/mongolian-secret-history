"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TeamMemberCard {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

const FALLBACK_PORTRAIT = "/images/tour-6.jpg";

// Fallback roster for an empty or unreachable CMS.
const defaultTeam: TeamMemberCard[] = [
  {
    name: "Boldbaatar",
    role: "Founder & Lead Guide",
    bio: "20+ years leading tours across Mongolia",
  },
  {
    name: "Oyungerel",
    role: "Cultural Guide",
    bio: "Specialist in Mongolian history and traditions",
  },
  {
    name: "Ganbold",
    role: "Adventure Guide",
    bio: "Expert in trekking, horses, and desert travel",
  },
  {
    name: "Enkhtuya",
    role: "Operations Manager",
    bio: "Ensures every journey runs smoothly",
  },
];

export default function TeamCarousel({
  members,
}: {
  members?: TeamMemberCard[];
}) {
  const team = members?.length ? members : defaultTeam;
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % team.length);
  }, [team.length]);

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + team.length) % team.length);
  }, [team.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center justify-center gap-4 py-8 min-h-[500px] md:min-h-[560px] overflow-hidden">
        {team.map((member, index) => {
          let offset = index - active;
          if (offset > team.length / 2) offset -= team.length;
          if (offset < -team.length / 2) offset += team.length;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          return (
            <motion.div
              key={member.name}
              layout
              initial={false}
              animate={{
                opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                scale: isActive ? 1 : 0.82,
                x: offset * 360,
                zIndex: isActive ? 20 : 10,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-[280px] md:w-[340px] -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className={`flex flex-col items-center rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-center shadow-lg transition-shadow ${
                  isActive ? "shadow-2xl" : "shadow-md"
                }`}
              >
                <div className="relative h-[180px] w-[180px] md:h-[220px] md:w-[220px] shrink-0 overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-800">
                  <Image
                    src={member.image || FALLBACK_PORTRAIT}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display mt-6 text-[22px] md:text-[26px] text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <span className="mt-1 text-sm font-semibold text-primary">{member.role}</span>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted"
          aria-label="Previous team member"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted"
          aria-label="Next team member"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
