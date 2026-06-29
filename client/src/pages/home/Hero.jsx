import { motion } from "framer-motion";

import SearchBar from "./SearchBar";

import HeroStats from "./HeroStats";

import PopularDestinations from "./PopularDestinations";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold max-w-3xl leading-tight"
        >
          Explore
          <span className="text-[var(--primary)]">Dream Destinations</span>
          With TravEase
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl"
        >
          Find villas, hotels and unique stays with AI powered recommendations.
        </motion.p>

        <div className="mt-12">
          <SearchBar />
        </div>

        <div className="mt-12">
          <PopularDestinations />
        </div>

        <div className="mt-16">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}

export default Hero;
