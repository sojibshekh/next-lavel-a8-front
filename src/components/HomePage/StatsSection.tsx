'use client';

import { motion } from 'framer-motion';
import { Users, Globe, Map, Star } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const stats = [
  { value: '50K+', label: 'Active Travelers', icon: Users },
  { value: '120+', label: 'Countries', icon: Globe },
  { value: '10K+', label: 'Trips Completed', icon: Map },
  { value: '4.9', label: 'Average Rating', icon: Star },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="font-display text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

