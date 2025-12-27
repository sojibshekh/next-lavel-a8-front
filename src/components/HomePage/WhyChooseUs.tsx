
'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, MessageCircle, Calendar, Star, Award } from 'lucide-react';
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

const features = [
  { icon: Shield, title: 'Verified Users', description: 'All profiles are verified for your safety' },
  { icon: Zap, title: 'Smart Matching', description: 'AI-powered matching based on interests' },
  { icon: MessageCircle, title: 'Secure Messaging', description: 'Chat safely with potential buddies' },
  { icon: Calendar, title: 'Trip Planning', description: 'Built-in tools to plan your adventures' },
  { icon: Star, title: 'Reviews System', description: 'Read reviews from fellow travelers' },
  { icon: Award, title: 'Premium Support', description: '24/7 support for premium members' },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Travel Together</span>
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card className="hover-lift border-0 shadow-card h-full">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

