"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Calendar, User, Heart, Loader2 } from "lucide-react";
import { TravelPlan } from "@/types/travel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React from "react";

interface TravelPlanCardProps {
  travelPlan: TravelPlan;
}

const TravelPlanCard = ({ travelPlan }: TravelPlanCardProps) => {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean | null>(null);
  const [sendingInterest, setSendingInterest] = React.useState(false);

  const checkUserLogin = async () => {
    try {
      const authRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        credentials: "include",
      });
      const authData = await authRes.json();
      setUserLoggedIn(!!authData?.data);
    } catch {
      setUserLoggedIn(false);
    }
  };

  React.useEffect(() => {
    checkUserLogin();
  }, []);

  const handleSendInterest = async () => {
    if (userLoggedIn === false) {
      router.push("/login");
      return;
    }

    try {
      setSendingInterest(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ travelPlanId: travelPlan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Request failed");
        return;
      }
      toast.success("Interest sent successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setSendingInterest(false);
    }
  };

  return (
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

          {/* Send Interest with AlertDialog */}
          {userLoggedIn && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="w-1/2" disabled={sendingInterest}>
                  {sendingInterest ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Heart className="h-3 w-3 mr-1" /> Send Interest
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Send Interest</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to send interest for this travel plan?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={sendingInterest}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendInterest} disabled={sendingInterest}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {userLoggedIn === false && (
            <Button size="sm" className="w-1/2" onClick={() => router.push("/login")}>
              <Heart className="h-3 w-3 mr-1" /> Send Interest
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPlanCard;
