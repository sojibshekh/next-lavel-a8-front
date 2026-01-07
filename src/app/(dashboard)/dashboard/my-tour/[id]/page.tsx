"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Match = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  fromUser: {
    name: string;
    email: string;
  };
};

export default function TravelDetailsPage() {
  const params = useParams();
  const travelId = params.id as string;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${travelId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setPlan(data.data);
    } catch {
      toast.error("Travel details load করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const respondRequest = async (
    matchId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/match/${matchId}/respond`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success(`Request ${status} করা হয়েছে`);
      fetchPlan();
    } catch {
      toast.error("Action failed");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!plan) return <p>No data found</p>;

  return (
    <div className="max-w-6xl  py-10 space-y-6">
      {/* Travel Info */}
      <Card>
        <CardHeader>
          <CardTitle>{plan.destination}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>
            📅 {new Date(plan.startDate).toDateString()} –{" "}
            {new Date(plan.endDate).toDateString()}
          </p>
          <p>✈️ Type: {plan.travelType}</p>
          <p>💰 Budget: {plan.budget}</p>
          <p>{plan.description}</p>
        </CardContent>
      </Card>

      {/* Join Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Join Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {!plan.matches?.length ? (
            <p className="text-muted-foreground">No join requests</p>
          ) : (
            <table className="w-full border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {plan.matches.map((m: Match) => (
                  <tr key={m.id} className="border-t">
                    <td className="p-2">
                      <p className="font-medium">{m?.fromUser?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m?.fromUser?.email}
                      </p>
                    </td>
                    <td className="p-2 text-center">
                      <Badge
                        variant={
                          m.status === "ACCEPTED"
                            ? "default"
                            : m.status === "REJECTED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {m.status}
                      </Badge>
                    </td>
                    <td className="p-2 flex gap-2 justify-center">
                      <Button
                        size="sm"
                        disabled={m.status !== "PENDING"}
                        onClick={() =>
                          respondRequest(m.id, "ACCEPTED")
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={m.status !== "PENDING"}
                        onClick={() =>
                          respondRequest(m.id, "REJECTED")
                        }
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
