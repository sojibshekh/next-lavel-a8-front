'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const plans = [
  { name: 'Free', price: '$0', period: 'forever', description: 'Perfect for getting started', features: ['Create up to 3 travel plans', 'Basic search filters', 'Send 10 messages/month', 'Community access'], cta: 'Get Started', popular: false, priceId: null },
  { name: 'Monthly', price: '$9.99', period: '/month', description: 'Best for active travelers', features: ['Unlimited travel plans', 'Advanced filters & search', 'Unlimited messaging', 'Verified badge eligibility', 'Priority support', 'Analytics dashboard'], cta: 'Start Free Trial', popular: true, priceId: 'price_1SnZpLAcAE4Zoz5h1k1l02ad' },
  { name: 'Half-Yearly', price: '$49.99', period: '/6 months', description: 'Save some money for 6 months', features: ['Everything in Monthly', 'Exclusive destinations access', 'Featured profile placement', 'Priority support'], cta: 'Start Free Trial', popular: false, priceId: 'price_1SnZq3AcAE4Zoz5hKLv0Q0B0' },
  { name: 'Yearly', price: '$79.99', period: '/year', description: 'Save 33% annually', features: ['Everything in Monthly', 'Exclusive destinations access', 'Featured profile placement', 'Early access to features', 'Personal travel concierge'], cta: 'Start Free Trial', popular: false, priceId: 'price_1SnZqjAcAE4Zoz5h1HN1bxiq' },
];

const Pricing = () => {
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data || null);
        } else {
          setUser(null); // not logged in
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoadingUser(false); // finished loading
      }
    };
    fetchUser();
  }, []);

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return alert('Free plan selected. No payment required!');

    if (loadingUser) return; // user data not loaded yet

    if (!user) return router.push('/login'); // not logged in

    if (user.isPremium) return setShowModal(true); // already subscribed

    try {
      const res = await fetch('http://localhost:5000/api/v1/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Error creating checkout session');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Choose the plan that fits your travel style. Upgrade anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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
                    onClick={() => handleCheckout(plan.priceId)}
                    disabled={loadingUser} // disable until user loaded
                  >
                    {loadingUser ? 'Checking...' : plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Already Subscribed</DialogTitle>
            </DialogHeader>
            <DialogDescription>You already have an active subscription.</DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pricing;
