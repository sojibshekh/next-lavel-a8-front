"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Calendar, MapPin, ChevronDown, Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: { name: string };
}

interface UserRequest {
  id: string;
  fromUser: { id: string; name: string; email: string };
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  matches?: UserRequest[];
}

export default function TravelDashboard() {
  const [travels, setTravels] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openRequests, setOpenRequests] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [openReview, setOpenReview] = useState<string | null>(null);

  useEffect(() => {
    loadTravels();
  }, []);

  const loadTravels = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/my`,
        { credentials: "include" }
      );
      const data = await res.json();
      setTravels(data.data || []);
    } catch {
      toast.error("Failed to load travel plans");
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (id: string) => {
    if (reviews[id]) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`);
      const data = await res.json();
      setReviews((p) => ({ ...p, [id]: data.data || [] }));
    } catch {
      toast.error("Failed to load reviews");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-56 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-full py-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">My Travel Plans</h1>
        <p className="text-muted-foreground mt-1">
          Manage your trips, join requests & reviews
        </p>
      </div>

      {travels.length === 0 && (
        <p className="text-muted-foreground">
          You haven’t created any travel plans yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {travels.map((plan) => (
          <Card
            key={plan.id}
            className="rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <CardHeader className="space-y-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {plan.destination}
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/dashboard/my-tour/${plan.id}/edit`)
                  }
                >
                  Edit
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(plan.startDate)} – {formatDate(plan.endDate)}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Join Requests */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-primary flex items-center gap-1"
                  onClick={() =>
                    setOpenRequests(openRequests === plan.id ? null : plan.id)
                  }
                >
                  Join Requests ({plan.matches?.length || 0})
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      openRequests === plan.id ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {openRequests === plan.id && (
                  <div className="mt-2 space-y-2">
                    {!plan.matches?.length ? (
                      <p className="text-sm text-muted-foreground">
                        No join requests
                      </p>
                    ) : (
                      plan.matches.map((r) => (
                        <div
                          key={r.id}
                          className="flex justify-between items-center bg-muted/50 rounded-lg px-3 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium">{r.fromUser.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {r.fromUser.email}
                            </p>
                          </div>
                          <Badge variant={badgeVariant(r.status)}>{r.status}</Badge>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-primary flex items-center gap-1"
                  onClick={() => {
                    setOpenReview(openReview === plan.id ? null : plan.id);
                    loadReviews(plan.id);
                  }}
                >
                  View Reviews
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      openReview === plan.id ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {openReview === plan.id && (
                  <div className="mt-3 space-y-2">
                    {!reviews[plan.id]?.length ? (
                      <p className="text-sm text-muted-foreground">No reviews yet</p>
                    ) : (
                      reviews[plan.id].map((rev) => (
                        <div key={rev.id} className="rounded-lg border p-3 text-sm">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{rev.user.name}</p>
                            <div className="flex items-center gap-1 text-primary">
                              <Star className="h-4 w-4 fill-primary" />
                              {rev.rating}
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-1">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                <Button
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/dashboard/my-tour/${plan.id}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* helpers */
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const badgeVariant = (status: string) => {
  if (status === "APPROVED") return "default";
  if (status === "REJECTED") return "destructive";
  return "secondary";
};
