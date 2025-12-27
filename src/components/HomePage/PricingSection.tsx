'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const pricingPlans = [
  { name: 'Free', price: '$0', period: 'forever', features: ['Basic profile', 'Browse travelers', 'Send 5 messages/month', 'View trip details'], popular: false },
  { name: 'Premium', price: '$9.99', period: '/month', features: ['Unlimited messages', 'Advanced matching', 'Verified badge', 'Priority support', 'See who viewed you'], popular: true },
  { name: 'Yearly', price: '$79.99', period: '/year', features: ['All Premium features', '2 months free', 'Exclusive events', 'Travel discounts', 'Featured profile'], popular: false },
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">Pricing</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <motion.div key={plan.name} variants={fadeInUp}>
              <Card className={`hover-lift border-0 shadow-card h-full relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground">Most Popular</Badge>}
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'gradient-primary text-primary-foreground' : ''}`} variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

