'use client';

import { motion } from 'framer-motion';
import { Aperture, ArrowUpRight } from 'lucide-react';
import { settings } from '@/config/settings';

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-white">
          <Aperture className="h-6 w-6 text-blue-400" />
          <span className="text-lg font-semibold tracking-[0.3em]">
            {settings.app.name}
          </span>
        </div>
        <div className="hidden gap-8 text-sm text-white/60 md:flex">
          {settings.ui.navLinks.map((item) => (
            <button key={item} className="transition hover:text-white">
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 transition hover:text-white md:inline-flex">
            Login
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-blue-500/30">
            Beta Access <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
