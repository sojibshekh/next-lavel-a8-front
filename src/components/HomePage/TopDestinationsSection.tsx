'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const destinations = [
  { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', travelers: 2340 },
  { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', travelers: 1890 },
  { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', travelers: 2150 },
  { name: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', travelers: 1750 },
  { name: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', travelers: 1420 },
  { name: 'Sydney, Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400', travelers: 1280 },
];

const TopDestinationsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">Popular Destinations</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Trending <span className="gradient-text">Destinations</span>
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <motion.div key={dest.name} variants={fadeInUp}>
              <Card className="overflow-hidden hover-lift border-0 shadow-card group cursor-pointer">
                <div className="relative h-64">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-background">
                    <h3 className="font-display text-xl font-bold">{dest.name}</h3>
                    <p className="text-background/80 flex items-center gap-2">
                      <Users className="w-4 h-4" /> {dest.travelers.toLocaleString()} travelers
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/destinations">View All Destinations <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopDestinationsSection;

