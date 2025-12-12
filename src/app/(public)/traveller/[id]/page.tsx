"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const UserProfilePage = () => {
  const { id } = useParams(); // next/navigation hook
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all-users/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");
      setUser(data.data);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="max-w-3xl mx-auto py-20">
        <Skeleton className="h-10 w-40 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">User not found</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge>{user.role}</Badge>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-medium">Created At: </span>
            {new Date(user.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Updated At: </span>
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </CardContent>

        <CardContent className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/reviews/user/${user.id}`)}
          >
            See Reviews
          </Button>
          <Button
            onClick={() => router.push(`/reviews/write/${user.id}`)}
          >
            Write Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
