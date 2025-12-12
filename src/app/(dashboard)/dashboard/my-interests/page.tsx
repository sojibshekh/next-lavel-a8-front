"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyMatchRequestsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/my`, {
      
      });

      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.error("Failed to load", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );

  if (!data)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load match requests.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Match Requests</h1>

      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
          <TabsTrigger value="received">Received Requests</TabsTrigger>
        </TabsList>

        {/* SENT REQUESTS */}
        <TabsContent value="sent">
          <RequestTable
            title="Sent Requests"
            emptyText="You haven't sent any match requests yet."
            items={data.sentRequests}
          />
        </TabsContent>

        {/* RECEIVED REQUESTS */}
        <TabsContent value="received">
          <RequestTable
            title="Received Requests"
            emptyText="No one has sent you match requests yet."
            items={data.receivedRequests}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RequestTable({
  title,
  emptyText,
  items,
}: {
  title: string;
  emptyText: string;
  items: any[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">{emptyText}</p>
        ) : (
          <div className="space-y-4">
            {items.map((req) => (
              <div
                key={req.id}
                className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{req.travelPlan.destination}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(req.travelPlan.startDate)} →{" "}
                    {formatDate(req.travelPlan.endDate)}
                  </p>

                  {/* USER INFO */}
                  <p className="text-sm mt-1">
                    {title.includes("Sent") ? (
                      <>
                        To:{" "}
                        <span className="font-medium">{req.toUser?.name}</span> (
                        {req.toUser?.email})
                      </>
                    ) : (
                      <>
                        From:{" "}
                        <span className="font-medium">{req.fromUser?.name}</span> (
                        {req.fromUser?.email})
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      req.status === "PENDING"
                        ? "bg-yellow-500"
                        : req.status === "ACCEPTED"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  >
                    {req.status}
                  </Badge>

                  <Button
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `/all-travel/${req.travelPlanId}`)
                    }
                  >
                    View Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
