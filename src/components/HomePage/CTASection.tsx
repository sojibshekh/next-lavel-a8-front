import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";


function CTASection() {
    return (
        <section className="py-24 container mx-auto px-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <CardContent className="p-12 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Have a project in mind? Let&apos;s create something amazing together.
                        I&apos;m always open to discussing new opportunities.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="cursor-pointer rounded-full px-8 shadow-lg">
                                Start a Project
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                       
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default CTASection;