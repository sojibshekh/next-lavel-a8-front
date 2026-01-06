import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles, } from "lucide-react";
import SingleTravelPlanClient from "@/components/travel/SingleTravelPlanClient";
import { getCurrentUserServer } from "@/components/Dashborad/AppSidebar";

async function fetchTravelPlanById(id: string) {
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${id}`);
        const data = await res.json();
        return data?.data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Generate metadata dynamically based on travel plan


export default async function page() {


      const userInfo = await getCurrentUserServer();
        const user = userInfo?.data;
    return (
        <div className="min-h-screen bg-background">
            {/* Travel Plan Details */}
          <SingleTravelPlanClient currentUserId={user?.id} />

            {/* CTA Section */}
            <section className="pt-16 pb-10 max-w-6xl mx-auto px-6">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    <CardContent className="p-12 text-center relative z-10">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Plan Your Next Trip!
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Browse more travel plans or add your own adventure today.
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
