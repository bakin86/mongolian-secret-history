"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plane, Flag, Globe, Shield, Building2 } from "lucide-react";

const embassyLinks = [
  { icon: Building2, title: "US Embassy", url: "https://mn.usembassy.gov" },
  { icon: Flag, title: "Australian Embassy", url: "https://www.dfat.gov.au" },
  { icon: Flag, title: "UK Embassy", url: "https://www.gov.uk/world/organisations/british-embassy-ulaanbaatar" },
];

const infoLinks = [
  { icon: Globe, title: "Tourism Association", url: "https://www.travelmongolia.org", label: "Official Website" },
  { icon: Shield, title: "UK Travel Advice", url: "https://www.gov.uk/foreign-travel-advice/mongolia", label: "GOV.UK" },
];

const airlines = [
  { name: "MIAT", url: "https://www.miat.com" },
  { name: "Aero Mongolia", url: "https://www.aeromongolia.mn" },
  { name: "Hunnu Air", url: "https://www.hunnuair.com" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function LinkCard({
  icon: Icon,
  title,
  url,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  url: string;
  label?: React.ReactNode;
}) {
  return (
    <motion.a
      variants={item}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between h-full min-h-[120px] rounded-2xl bg-slate-900 dark:bg-slate-900 border border-slate-800 p-5 lg:p-6 transition-all hover:shadow-[0_10px_15px_-3px_rgba(18,63,174,0.08)]"
    >
      <div className="flex items-center gap-2.5">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <span className="font-sans font-bold text-[17px] lg:text-[18px] text-white">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1 text-[14px] lg:text-[15px] text-blue-300 hover:text-white mt-4">
        <span className="group-hover:underline">{label ?? "Official Website"}</span>
        <motion.span
          whileHover={{ x: 2, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function UsefulLinks() {
  return (
    <section className="bg-white dark:bg-slate-950 py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <hr className="border-slate-200 dark:border-slate-800 mb-14" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-center text-3xl md:text-4xl lg:text-[36px] leading-[1.15] text-slate-900 dark:text-white mb-12"
        >
          Useful Links
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7"
        >
          {embassyLinks.map((link) => (
            <LinkCard key={link.url} icon={link.icon} title={link.title} url={link.url} />
          ))}

          {infoLinks.map((link) => (
            <LinkCard
              key={link.url}
              icon={link.icon}
              title={link.title}
              url={link.url}
              label={link.label}
            />
          ))}

          <motion.div
            variants={item}
            className="flex flex-col justify-between h-full min-h-[120px] rounded-2xl bg-slate-900 dark:bg-slate-900 border border-slate-800 p-5 lg:p-6 transition-all hover:shadow-[0_10px_15px_-3px_rgba(18,63,174,0.08)]"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Plane className="w-5 h-5" />
              </motion.div>
              <span className="font-sans font-bold text-[17px] lg:text-[18px] text-white">
                Airlines
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-4">
              {airlines.map((airline) => (
                <a
                  key={airline.url}
                  href={airline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] lg:text-[15px] text-blue-300 hover:text-white hover:underline"
                >
                  {airline.name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
          Official resources that may be helpful before and during your visit to Mongolia.
        </p>
      </div>
    </section>
  );
}
