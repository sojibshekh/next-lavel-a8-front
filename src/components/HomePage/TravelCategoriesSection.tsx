'use client';

import { motion } from 'framer-motion';
import { Mountain, Utensils, Camera, Palmtree, Globe, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const categories = [
  { icon: Mountain, name: 'Adventure', color: 'bg-adventure' },
  { icon: Utensils, name: 'Food Tours', color: 'bg-primary' },
  { icon: Camera, name: 'Photography', color: 'bg-secondary' },
  { icon: Palmtree, name: 'Beach', color: 'bg-warning' },
  { icon: Globe, name: 'Cultural', color: 'bg-accent' },
  { icon: Map, name: 'Road Trips', color: 'bg-success' },
];

const TravelCategoriesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">Categories</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Explore by <span className="gradient-text">Interest</span>
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="cursor-pointer">
              <Card className="hover-lift border-0 shadow-card">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <p className="font-semibold">{cat.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TravelCategoriesSection;

