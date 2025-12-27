'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Play, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
      gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

    return (
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="hero-text gradient-primary text-primary-foreground px-4 py-2">
              🌍 Join 50,000+ Travelers Worldwide
            </Badge>
            <h1 className="hero-text font-display text-5xl lg:text-7xl font-bold leading-tight">
              Find Your Perfect
              <span className="gradient-text block">Travel Buddy</span>
            </h1>
            <p className="hero-text text-xl text-muted-foreground max-w-lg">
              Connect with like-minded travelers, plan adventures together, 
              and explore the world with your new best friend.
            </p>
            <div className="hero-text flex flex-wrap gap-4">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow text-lg px-8" asChild>
                <Link href="/register">Start Your Journey <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Play className="mr-2 w-5 h-5" /> Watch Demo
              </Button>
            </div>
            <div className="hero-text flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="w-10 h-10 border-2 border-background">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {String.fromCharCode(64 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold">1,200+</span> travelers joined this week
              </div>
            </div>
          </div>
          <div className="hero-image relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600"
                alt="Travelers exploring"
                className="rounded-3xl shadow-elegant object-cover w-full h-full"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Next Trip: Bali</p>
                    <p className="text-sm text-muted-foreground">3 buddies joined</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-card"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="font-bold">4.9</span>
                  <span className="text-muted-foreground text-sm">rating</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Hero;