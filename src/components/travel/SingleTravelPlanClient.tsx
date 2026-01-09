"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Calendar, User, MapPin, Wallet } from "lucide-react";

// Modal
const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
      <p className="mb-4">{message}</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  </div>
);

interface Props {
  currentUserId?: string; // props থেকে userId
}

export default function SingleTravelPlanClient({ currentUserId }: Props) {
  const params = useParams();
  const router = useRouter();
  console.log("Current User ID:", currentUserId);
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requestedPlans, setRequestedPlans] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // =======================
  // 1️⃣ Fetch Single Plan
  // =======================
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${params.id}`);
        const data = await res.json();
        setPlan(data.data);
      } catch (err) {
        setPlan(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [params.id]);

  // =======================
  // 2️⃣ Fetch user's sent requests
  // =======================
  useEffect(() => {
    if (!currentUserId) return;

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/my`, {
          credentials: "include",
        });
        const data = await res.json();

        const ids =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.sentRequests?.map((r: any) => r.travelPlanId) || [];
        setRequestedPlans(ids);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyRequests();
  }, [currentUserId]);

  // =======================
  // 3️⃣ Send Request
  // =======================
  const handleSendRequest = async () => {
    if (!currentUserId) {
      router.push("/login"); // login না থাকলে redirect
      return;
    }

    try {
      setSending(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ travelPlanId: plan.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMessage(data.message || "Request failed");
        return;
      }

      setRequestedPlans((prev) => [...prev, plan.id]);
      setModalMessage("Request sent successfully!");
    } catch (err) {
      setModalMessage("Something went wrong!");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!plan) return <div className="text-center py-20">Travel Plan Not Found</div>;

  const isOwner = currentUserId === plan.userId;
  const isRequested = requestedPlans.includes(plan.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}

      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-4xl font-bold">{plan.destination}</h1>
            <p className="text-muted-foreground">{plan.description}</p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {new Date(plan.startDate).toLocaleDateString()} –{" "}
                  {new Date(plan.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{plan.travelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span>৳ {plan.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{plan.destination}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Created by: {plan.user.name} ({plan.user.email})
            </p>

            <Button
              className="w-full"
              disabled={isOwner || isRequested || sending}
              onClick={handleSendRequest}
            >
              {isOwner
                ? "This is your travel"
                : isRequested
                ? "Request Sent"
                : sending
                ? "Sending..."
                : "Send Request"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <section className="pt-16 pb-10 max-w-6xl mx-auto px-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Plan Your Next Trip!</h2>
            <p className="text-muted-foreground mb-6">
              Browse more travel plans or add your own adventure.
            </p>
            <Link href="/travel-plans/add">
              <Button size="lg">Add New Travel Plan</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
