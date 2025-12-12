"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Calendar, User } from "lucide-react";

const SingleTravelPlanClient = () => {
  const params = useParams();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${params.id}`);
        const data = await res.json();
        setPlan(data.data);
      } catch (err) {
        console.error(err);
        setPlan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!plan) return <div className="text-center py-20">Travel Plan Not Found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-8 border-2">
          <CardContent>
            <h1 className="text-3xl font-bold mb-4">{plan.destination}</h1>
            <p className="text-muted-foreground mb-2">{plan.description}</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{plan.travelType}</span>
              </div>
              <div>
                <span>Budget: BDT {plan.budget}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Created by: {plan.user.name} ({plan.user.email})</p>
          </CardContent>
        </Card>
      </div>

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

export default SingleTravelPlanClient;
