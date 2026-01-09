"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Plane, Search, Users } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------------- MODAL ---------------- */
function Modal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        <p className="mb-4">{message}</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

/* ---------------- TYPES ---------------- */
interface TravelPlan {
  id: string;
  destination: string;
  userId: string;
  description: string;
  budget: number;
  travelType: string;
  photoUrl?: string;
  user: {
    id: string;
    name: string;
  };
}

interface Props {
  currentUserId?: string; // public page support
}

const fallbackImage =
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff";

/* ---------------- COMPONENT ---------------- */
export default function TravelPlansPageClient({
  currentUserId,
}: Props) {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [requestedPlans, setRequestedPlans] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  /* -------- FETCH TRAVEL PLANS -------- */
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/travel-plans?limit=100`,
          { credentials: "include" }
        );

        const data = await res.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (e) {
        console.error("Failed to load plans", e);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  /* -------- FETCH SENT REQUESTS (IMPORTANT FIX) -------- */
  useEffect(() => {
    if (!currentUserId) return;

    const loadRequests = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matches/my`,
          { credentials: "include",
             headers: { "Content-Type": "application/json" },
           }
        );

        if (!res.ok) return;

        const data = await res.json();

        // ✅ REAL FIX — backend structure handle
        const sentRequests = data.data?.sentRequests || [];
        const ids = sentRequests.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (req: any) => req.travelPlanId
        );

        setRequestedPlans(ids);
      } catch (e) {
        console.error("Failed to load requests", e);
      }
    };

    loadRequests();
  }, [currentUserId]);

  /* -------- SEND REQUEST -------- */
  const handleSendRequest = async (travelPlanId: string) => {
    if (!currentUserId) {
      setModalMessage("Please login to send request");
      return;
    }

    if (requestedPlans.includes(travelPlanId)) return;

    try {
      setSendingId(travelPlanId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matches/request`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ travelPlanId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setModalMessage(data.message || "Request failed");
        return;
      }

      // ✅ persist state after reload
      setRequestedPlans((prev) => [...prev, travelPlanId]);
      setModalMessage("Request sent successfully!");
    } catch (e) {
      setModalMessage("Something went wrong!");
    } finally {
      setSendingId(null);
    }
  };

  /* -------- SEARCH FILTER -------- */
  const filteredPlans = plans.filter(
    (p) =>
      p.destination.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen">
      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setModalMessage(null)}
        />
      )}

      {/* HEADER */}
      <section className="py-16 text-center">
        <Plane className="mx-auto text-primary mb-2" />
        <h1 className="text-4xl font-bold mb-4">
          Find Your <span className="text-primary">Travel Buddy</span>
        </h1>

        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* CARDS */}
      <section className="container mx-auto pb-20 px-4">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-40 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => {
              const isOwner = currentUserId === plan.userId;
              const isRequested = requestedPlans.includes(plan.id);

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <div className="relative h-48">
                      <Image
                        src={plan.photoUrl || fallbackImage}
                        alt={plan.destination}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 left-2">
                        {plan.travelType}
                      </Badge>
                    </div>

                    <CardContent className="p-4">
                      <p className="flex items-center gap-1 text-sm">
                        <MapPin size={14} /> {plan.destination}
                      </p>

                      <p className="text-sm text-muted-foreground line-clamp-2 my-2">
                        {plan.description}
                      </p>

                      <div className="flex justify-between text-sm mb-3">
                        <span>৳ {plan.budget}</span>
                        <span className="flex items-center gap-1">
                          <Users size={14} /> {plan.user.name}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/explore/${plan.id}`}
                          className="w-1/2"
                        >
                          <Button className="w-full">
                            View Details
                          </Button>
                        </Link>

                        <Button
                          className="w-1/2"
                          disabled={
                            isOwner ||
                            isRequested ||
                            sendingId === plan.id
                          }
                          onClick={() =>
                            handleSendRequest(plan.id)
                          }
                        >
                          {isOwner
                            ? "This is your travel"
                            : isRequested
                            ? "Request Sent"
                            : sendingId === plan.id
                            ? "Sending..."
                            : "Send Request"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
