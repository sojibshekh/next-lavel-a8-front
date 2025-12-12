"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface UserRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    email: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  requests?: UserRequest[];
}

export default function TravelDashboard() {
  const [myTravels, setMyTravels] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Load travels from API
  const loadMyTravels = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/my`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setMyTravels(data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load travel plans");
    } finally {
      setLoading(false);
    }
  };

  // Delete Travel Plan
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this travel plan?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Travel deleted successfully");
        loadMyTravels();
      } else {
        toast.error(data.message || "Failed to delete travel");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting travel");
    }
  };

  // Update Travel (redirect or modal)
  const handleUpdate = (id: string) => {
    window.location.href = `/update-travel/${id}`;
  };

  // Approve User Request
  const handleApproveRequest = async (travelId: string, userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/approve/${travelId}/${userId}`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Request approved");
        loadMyTravels();
      } else {
        toast.error(data.message || "Failed to approve request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving request");
    }
  };

  useEffect(() => {
    loadMyTravels();
  }, []);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">My Travel Plans</h1>

      {myTravels.length === 0 && (
        <p className="text-muted-foreground">You have no travel plans yet.</p>
      )}

      {myTravels.map((plan) => (
        <Card key={plan.id}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{plan.destination}</CardTitle>
            <div className="space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleUpdate(plan.id)}>
                Update
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(plan.id)}>
                Delete
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
            </p>

            {(!plan.requests || plan.requests.length === 0) && (
              <p className="text-muted-foreground">No users have shown interest yet.</p>
            )}

            {plan.requests && plan.requests.length > 0 && (
              <div className="space-y-2">
                {plan.requests.map((req) => (
                  <div
                    key={req.id}
                    className="border p-3 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{req.fromUser.name}</p>
                      <p className="text-sm text-muted-foreground">{req.fromUser.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{req.status}</Badge>
                      {req.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApproveRequest(plan.id, req.fromUser.id)}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
