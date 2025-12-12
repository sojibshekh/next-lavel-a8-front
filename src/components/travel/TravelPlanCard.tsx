"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Calendar, User, Heart } from "lucide-react";
import { TravelPlan } from "@/types/travel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TravelPlanCardProps {
  travelPlan: TravelPlan;
}

const TravelPlanCard = ({ travelPlan }: TravelPlanCardProps) => {
  const router = useRouter();

  const handleSendInterest = async (e: React.MouseEvent) => {
    e.preventDefault();

    // 1️⃣ CHECK LOGIN WITH COOKIE (server validates)
    const authRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        credentials: "include",  // IMPORTANT
      }
    );

    const authData = await authRes.json();
    const user = authData?.data;

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      // 2️⃣ SEND INTEREST REQUEST
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matches/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
       
          body: JSON.stringify({
            travelPlanId: travelPlan.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Request failed");
        return;
      }

      toast.success("Interest sent successfully!");

    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Link href={`/all-travel/${travelPlan.id}`} key={travelPlan.id}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden py-0 h-full flex flex-col">
        
        <CardHeader className="flex-1">
          <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
            {travelPlan.destination}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {travelPlan.description}
          </p>
        </CardHeader>

        <CardContent className="pb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{travelPlan.travelType}</Badge>
            <Badge variant="secondary">BDT {travelPlan.budget}</Badge>
          </div>

          <div className="flex flex-wrap gap-2 text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(travelPlan.startDate).toLocaleDateString()}</span>
              <span>-</span>
              <span>{new Date(travelPlan.endDate).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{travelPlan.user?.name}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-1/2"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/all-travel/${travelPlan.id}`);
              }}
            >
              View Details
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>

            <Button size="sm" className="w-1/2" onClick={handleSendInterest}>
              <Heart className="h-3 w-3 mr-1" /> Send Interest
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TravelPlanCard;
