'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['Create up to 3 travel plans', 'Basic search filters', 'Send 10 messages/month', 'Community access'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    description: 'Best for active travelers',
    features: ['Unlimited travel plans', 'Advanced filters & search', 'Unlimited messaging', 'Verified badge eligibility', 'Priority support', 'Analytics dashboard'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Yearly',
    price: '$79.99',
    period: '/year',
    description: 'Save 33% annually',
    features: ['Everything in Monthly', 'Exclusive destinations access', 'Featured profile placement', 'Early access to features', 'Personal travel concierge'],
    cta: 'Start Free Trial',
    popular: false,
  },
];

const Pricing = () => {
  return (

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that fits your travel style. Upgrade anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-border/50 h-full relative ${plan.popular ? 'ring-2 ring-primary shadow-glow' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'gradient-primary text-primary-foreground' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
 
  );
};

export default Pricing;
