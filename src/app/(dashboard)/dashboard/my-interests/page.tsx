"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface MatchRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  travelPlan: {
    destination: string;
    startDate: string;
    endDate: string;
  };
  fromUser?: {
    name: string;
    email: string;
  };
  toUser?: {
    name: string;
    email: string;
  };
}

interface MyMatchesData {
  sentRequests: MatchRequest[];
  receivedRequests: MatchRequest[];
}

export default function MyMatchesPage() {
  const [sentMatches, setSentMatches] = useState<MatchRequest[]>([]);
  const [receivedMatches, setReceivedMatches] = useState<MatchRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/my`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSentMatches(data.data.sentRequests || []);
        setReceivedMatches(data.data.receivedRequests || []);
      } else {
        setSentMatches([]);
        setReceivedMatches([]);
        toast.error("Failed to load matches");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "APPROVED":
        return "default";
      case "REJECTED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const renderMatchCard = (match: MatchRequest, isSent: boolean) => (
    <Card key={match.id}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{match.travelPlan.destination}</CardTitle>
        <Badge variant={getBadgeVariant(match.status)}>{match.status}</Badge>
      </CardHeader>

      <CardContent className="space-y-2">
        <p>
          {isSent ? "To: " : "From: "}
          <span className="font-medium">
            {isSent ? match.toUser?.name : match.fromUser?.name}
          </span>{" "}
          ({isSent ? match.toUser?.email : match.fromUser?.email})
        </p>
        <p>
          Travel Dates:{" "}
          {new Date(match.travelPlan.startDate).toLocaleDateString()} -{" "}
          {new Date(match.travelPlan.endDate).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );

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
      <h1 className="text-3xl font-bold mb-6">My Matches</h1>

      {/* Sent Requests */}
      <h2 className="text-xl font-semibold mb-2">Sent Requests</h2>
      {sentMatches.length === 0 && <p className="text-muted-foreground">No sent requests.</p>}
      {sentMatches.map((match) => renderMatchCard(match, true))}

      {/* Received Requests */}
      <h2 className="text-xl font-semibold mb-2 mt-6">Received Requests</h2>
      {receivedMatches.length === 0 && <p className="text-muted-foreground">No received requests.</p>}
      {receivedMatches.map((match) => renderMatchCard(match, false))}
    </div>
  );
}
