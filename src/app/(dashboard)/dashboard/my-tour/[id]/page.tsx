"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // ShadCN Dialog

type Match = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  fromUser: {
    id: string;
    name: string;
    email: string;
  };
};

export default function TravelDetailsPage() {
  const params = useParams();
  const travelId = params.id as string;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedAction, setSelectedAction] = useState<"ACCEPTED" | "REJECTED" | null>(null);

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

  const respondRequest = async (matchId: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matches/${matchId}/respond`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      toast.success(`Request ${status} done`);
      fetchPlan(); // Refresh data
    } catch {
      toast.error("Action failed");
    } finally {
      setShowModal(false);
      setSelectedMatch(null);
      setSelectedAction(null);
    }
  };

  const handleActionClick = (match: Match, action: "ACCEPTED" | "REJECTED") => {
    setSelectedMatch(match);
    setSelectedAction(action);
    setShowModal(true);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!plan) return <p className="text-center py-10">No data found</p>;

  return (
    <div className="max-w-6xl py-10 ">
      <Card>
        <CardHeader>
          <CardTitle>{plan.destination}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Travel Info */}
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>📅 {new Date(plan.startDate).toDateString()} – {new Date(plan.endDate).toDateString()}</p>
            <p>✈️ Type: {plan.travelType}</p>
            <p>💰 Budget: {plan.budget}</p>
            <p>{plan.description}</p>
          </div>

          {/* Join Requests */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Join Requests</h3>
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
                        <p className="font-medium">{m.fromUser.name}</p>
                        <p className="text-xs text-muted-foreground">{m.fromUser.email}</p>
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
                          onClick={() => handleActionClick(m, "ACCEPTED")}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={m.status !== "PENDING"}
                          onClick={() => handleActionClick(m, "REJECTED")}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal (ShadCN Dialog) */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground my-4">
            Are you sure you want to <strong>{selectedAction}</strong>  to
            <strong> {selectedMatch?.fromUser.name}</strong>'s request?
          </p>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button
              variant={selectedAction === "REJECTED" ? "destructive" : "default"}
              onClick={() => selectedMatch && selectedAction && respondRequest(selectedMatch.id, selectedAction)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
