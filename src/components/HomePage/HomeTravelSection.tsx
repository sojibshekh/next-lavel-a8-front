"use client";

import React, { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import TravelPlanCard from "../travel/TravelPlanCard";

interface TravelPlan {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    travelType: string;
    description: string;
    user: {
        name: string;
        email: string;
    };
}

const HomeTravelSection = () => {
    const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTravelPlans();
    }, []);

    const loadTravelPlans = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/travel-plans?limit=3&page=1`
            );
            const data = await res.json();

            if (data.success) {
                setTravelPlans(data.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch travel plans:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-16 max-w-7xl mx-auto px-6">
            <div className="flex items-center mb-8">
                <Code2 className="w-6 h-6 mr-2 text-primary" />
                <h2 className="text-2xl font-bold">Latest Travel Plans</h2>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : travelPlans.length === 0 ? (
                <div className="text-center py-16">
                    <Code2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No travel plans available</h3>
                    <p className="text-muted-foreground">Check back later for new travel plans!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travelPlans.map((plan) => (
                        <TravelPlanCard key={plan.id} travelPlan={plan} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HomeTravelSection;
