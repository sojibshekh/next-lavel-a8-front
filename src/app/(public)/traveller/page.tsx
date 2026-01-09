"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { User as UserIcon } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePhoto?: string | null;
}

export default function AllUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);


  console.log("AllUsersPage rendered. isLoggedIn:", users);

  useEffect(() => {
    fetchUsers();
    checkUserLogin();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/all-users`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const checkUserLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        { credentials: "include" }
      );
      const data = await res.json();
      setIsLoggedIn(!!data?.data);
    } catch {
      setIsLoggedIn(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card
          key={user.id}
          className="rounded-2xl hover:shadow-lg transition flex flex-col"
        >
          {/* Header */}
          <CardHeader className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-20 w-20">
              {user.profilePhoto ? (
                <AvatarImage src={user.profilePhoto} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-muted">
                  <UserIcon className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Badge variant="secondary">{user.role}</Badge>
          </CardHeader>

          {/* Content */}
          <CardContent className="mt-auto space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/traveller/${user.id}`)}
            >
              View Profile
            </Button>

            {isLoggedIn === false ? (
              <Button
                className="w-full"
                onClick={() => router.push("/login")}
              >
                Login to Review
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => toast.info("Open review modal here")}
              >
                Give Review
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
