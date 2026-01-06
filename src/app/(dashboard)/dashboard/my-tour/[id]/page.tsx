"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UpdateTravelPlanPage() {
  const router = useRouter();
  const params = useParams();
  const travelId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelType: "",
    description: "",
    image: "",
    budget: "",
  });

  // Load travel plan data
  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${travelId}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data?.data) {
          const plan = data.data;
          setFormData({
            destination: plan.destination || "",
            startDate: plan.startDate ? plan.startDate.split("T")[0] : "",
            endDate: plan.endDate ? plan.endDate.split("T")[0] : "",
            travelType: plan.travelType || "",
            description: plan.description || "",
            image: plan.photoUrl || "",
            budget: plan.budget || "",
          });
        } else {
          setError("Travel plan not found.");
        }
      } catch (err) {
        setError("Failed to load travel plan.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravelPlan();
  }, [travelId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.destination.trim()) {
      setError("Destination is required");
      setIsLoading(false);
      return;
    }
    if (!formData.startDate) {
      setError("Start date is required");
      setIsLoading(false);
      return;
    }
    if (!formData.travelType) {
      setError("Travel type is required");
      setIsLoading(false);
      return;
    }

    try {
      // Prisma-compatible date conversion
      const payload = {
        destination: formData.destination,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null,
        travelType: formData.travelType,
        description: formData.description,
        photoUrl: formData.image,
        budget: Number(formData.budget),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/update/${travelId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update travel plan");
      }

      router.push("/dashboard/my-tour");
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="border-b">
        <div className="py-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Update Travel Plan</h1>
          <p className="text-muted-foreground mt-2">Edit your travel plan details</p>
        </div>
      </div>

      {/* Form */}
      <div className="py-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Travel Plan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Destination */}
              <div className="space-y-2">
                <Label>Destination *</Label>
                <Input
                  name="destination"
                  placeholder="Enter destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Travel Type */}
              <div className="space-y-2">
                <Label>Travel Type *</Label>
                <select
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Type</option>
                  <option value="SOLO">SOLO</option>
                  <option value="FAMILY">FAMILY</option>
                  <option value="FRIENDS">FRIENDS</option>
                  <option value="COUPLE">COUPLE</option>
                  <option value="GROUP">GROUP</option>
                </select>
              </div>


                {/* Budget */}
                <div className="space-y-2">
                    <Label>Budget (BDT) *</Label>
                    <Input
                        type="number"
                        name="budget"
                        placeholder="Enter budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Image Url *</Label>
                    <Input
                        type="url"
                        name="image"
                        placeholder="Enter Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  name="description"
                  placeholder="Write travel description..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={isLoading}
                />
              </div>

            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : "Update Travel Plan"}
            </Button>

            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="outline" size="lg" className="w-full" disabled={isLoading}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
}
