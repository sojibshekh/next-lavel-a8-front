"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AllUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Review popup
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetchUsers();
    checkUserLogin();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all-users`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const checkUserLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(!!data?.data);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelPlanId: "exampleTravelPlanId", // যদি travelPlan ID থাকে তাহলে এখানে বসাও
          revieweeId: selectedUser.id,
          rating,
          comment: reviewText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      toast.success("Review submitted successfully");
      setReviewText("");
      setRating(0);
      setSelectedUser(null);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (loading) return <div className="text-center py-20">Loading users...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="flex flex-col justify-between">
        

          <CardHeader className="px-4 pt-4">
            <CardTitle>{user.name}</CardTitle>
            <Badge>{user.role}</Badge>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">{user.email}</p>

            {/* Bottom Buttons */}
            <div className=" gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => router.push(`/traveller/${user.id}`)}
              >
                See Details
              </Button>

              {isLoggedIn === false ? (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push("/login")}
                >
                  Get Review
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedUser(user)}
                >
                  Get Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
