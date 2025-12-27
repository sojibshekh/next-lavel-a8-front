'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Compass, Plane } from 'lucide-react';
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

const steps = [
  { icon: Users, title: 'Create Profile', description: 'Sign up and build your travel profile with interests and preferences' },
  { icon: Calendar, title: 'Post Your Trip', description: 'Share your upcoming travel plans and destinations' },
  { icon: Compass, title: 'Find Buddies', description: 'Connect with travelers heading to similar destinations' },
  { icon: Plane, title: 'Travel Together', description: 'Meet up, explore, and create unforgettable memories' },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">How It Works</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Start Your Adventure in <span className="gradient-text">4 Easy Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect travel companion has never been easier
          </p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={fadeInUp} className="relative">
              <Card className="hover-lift border-0 shadow-card h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center relative">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

