// app/payment-cancel/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentCancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/pricing'); // Redirect back to pricing page
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-xl text-center py-8">
          <CardHeader>
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <CardTitle className="text-2xl font-bold">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Your payment was not completed. You can try again or choose a different plan.
            </p>
            <Button
              className="w-full"
              onClick={() => router.push('/pricing')} // redirect to pricing
            >
              Back to Pricing
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;
