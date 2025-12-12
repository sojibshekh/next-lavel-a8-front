"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const handleDelete = async (id: string) => {
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

  const handleUpdate = (id: string) => {
    window.location.href = `/dashboard/my-tour/${id}`;
  };

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
      <div className="max-w-6xl mx-auto mt-10 space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Travel Plans</h1>

      {myTravels.length === 0 ? (
        <p className="text-muted-foreground">You have no travel plans yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Destination</th>
              <th className="border px-4 py-2 text-left">Dates</th>
              <th className="border px-4 py-2 text-left">Actions</th>
              <th className="border px-4 py-2 text-left">Requests</th>
            </tr>
          </thead>
          <tbody>
            {myTravels.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{plan.destination}</td>
                <td className="border px-4 py-2">
                  {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleUpdate(plan.id)}>
                    Update
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the travel plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(plan.id)}>
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
                <td className="border px-4 py-2">
                  {(!plan.requests || plan.requests.length === 0) ? (
                    <p className="text-muted-foreground">No requests</p>
                  ) : (
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border px-2 py-1 text-left">User</th>
                          <th className="border px-2 py-1 text-left">Email</th>
                          <th className="border px-2 py-1 text-left">Status</th>
                          <th className="border px-2 py-1 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plan.requests.map((req) => (
                          <tr key={req.id}>
                            <td className="border px-2 py-1">{req.fromUser.name}</td>
                            <td className="border px-2 py-1">{req.fromUser.email}</td>
                            <td className="border px-2 py-1">
                              <Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge>
                            </td>
                            <td className="border px-2 py-1">
                              {req.status === "PENDING" && (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleApproveRequest(plan.id, req.fromUser.id)}
                                >
                                  Approve
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
