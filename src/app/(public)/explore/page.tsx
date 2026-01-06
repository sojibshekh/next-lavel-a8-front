
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import TravelPlansPageClient from "@/components/travel/TravelPlansPageClient";
import { getCurrentUserServer } from "@/components/Dashborad/AppSidebar";


export const metadata: Metadata = {
    title: "Travel Plans - Explore Trips",
    description: "View and explore travel plans. Plan your trips with details, budget, and travel type.",
    keywords: ["travel plans", "trips", "vacation", "tour", "travel", "itinerary"],
    openGraph: {
        title: "Travel Plans - Explore Trips",
        description: "View and explore travel plans with budget, dates, and travel type.",
        type: "website",
        images: [
            {
                url: "/og-travel-image.jpg",
                width: 1200,
                height: 630,
                alt: "Travel Plans Cover",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Travel Plans - Explore Trips",
        description: "View and explore travel plans with budget, dates, and travel type.",
        images: ["/og-travel-image.jpg"],
    },
}

 


export default async function page() {

     const userInfo = await getCurrentUserServer();
    const user = userInfo?.data;
    return (
        <div className="min-h-screen bg-background">
            {/* Travel Plans List */}
            <TravelPlansPageClient currentUserId={user?.id} />

            {/* CTA Section */}
            <section className="py-16 max-w-6xl mx-auto px-6">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    <CardContent className="p-12 text-center relative z-10">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Plan Your Next Trip!
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Browse existing travel plans or create your own adventure today.
                        </p>
                        <Link href="/travel-plans/add">
                            <Button size="lg" className="rounded-full px-8 cursor-pointer">
                                Add New Travel Plan
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};
