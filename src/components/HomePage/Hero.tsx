"use client"
import { ArrowRight, Sparkles, Github, Linkedin, Facebook } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Button } from "../ui/button"


const Hero = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className={`relative z-10 m-auto flex container flex-col items-center justify-center gap-8 px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Badge */}
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium animate-bounce">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Find  Your Perfect Travel Companion
                </Badge>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Travel Buddy & Meetup
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                  Travel Buddy & Meetup Platform aims to create   <span className="text-primary font-semibold">meaningful connections</span> among travelers by helping them find compatible companions for upcoming trips.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                    {["Travel", "Injoy", "Place", "Meet"].map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <Link href="/contact">
                        <Button size="lg" className="cursor-pointer rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow">
                            Join Now
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/projects">
                        <Button size="lg" variant="outline" className="cursor-pointer rounded-full px-8">
                           Meet Tour Buddy
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default Hero;