import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Code2 } from 'lucide-react';

const AboutSection = () => {
    return (
        <div>
            <section className="py-24 container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Text */}
                <div className="space-y-6">
                    <div className="inline-block">
                        <Badge variant="outline" className="mb-4">
                            <Code2 className="w-4 h-4 mr-2" />
                            About us 
                        </Badge>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                       Match Your tour Mates with Travel Buddy
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                       Travel Buddy & Meetup Platform aims to create meaningful connections among travelers by helping them find compatible companions for upcoming trips.
                    </p>
                 
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="cursor-pointer rounded-full mt-4">
                            Join With Us
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Right Side - Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="border-2 hover:border-primary transition-colors">
                        <CardContent className="p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">2+</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 hover:border-primary transition-colors">
                        <CardContent className="p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">150+</div>
                            <div className="text-sm text-muted-foreground">Tours</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 hover:border-primary transition-colors">
                        <CardContent className="p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                            <div className="text-sm text-muted-foreground">Happy mate</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 hover:border-primary transition-colors">
                        <CardContent className="p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        </div>
    );
};

export default AboutSection;