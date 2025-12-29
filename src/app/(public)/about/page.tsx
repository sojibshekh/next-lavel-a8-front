'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users } from 'lucide-react';

const values = [
  { icon: Users, title: 'Community First', description: 'Building meaningful connections between travelers worldwide.' },
  { icon: Globe, title: 'Global Access', description: 'Connecting adventurers across every continent and culture.' },
  { icon: Heart, title: 'Passion for Travel', description: 'We believe travel transforms lives and broadens perspectives.' },
  { icon: Shield, title: 'Safety & Trust', description: 'Verified profiles and secure messaging for peace of mind.' },
];

const About = () => {
  return (
  
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About <span className="gradient-text">TravelBuddy</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Connecting travelers, creating memories, one journey at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg dark:prose-invert mx-auto mb-16"
          >
            <Card className="border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  TravelBuddy was founded with a simple belief: travel is better together. We connect
                  like-minded adventurers from around the world, helping them find the perfect travel
                  companion for their next journey.
                </p>
                <p className="text-muted-foreground">
                  Whether youre planning a solo backpacking trip and want company, or looking for
                  experienced travelers to join your expedition, TravelBuddy makes it easy to find,
                  connect, and travel with people who share your passion for exploration.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-border/50 h-full hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default About;
