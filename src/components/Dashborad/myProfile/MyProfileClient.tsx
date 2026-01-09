"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  profilePhoto?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
}

interface MyProfileProps {
  userInfo: IUser; // server থেকে props আকারে path করা user
}

export default function MyProfilePage({ userInfo }: MyProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<IUser>(userInfo);
  const [previewImage, setPreviewImage] = useState(userInfo.profilePhoto || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData(e.currentTarget);
        const payload = {
          name: formData.get("name"),
          bio: formData.get("bio"),
          profilePhoto: formData.get("profilePhoto"),
          currentLocation: formData.get("address"), // ✅ correct
          interests: formData.get("travelInterests")
            ? (formData.get("travelInterests") as string)
                .split(",")
                .map((x) => x.trim())
            : [],
          visitedCountries: formData.get("visitedCountries")
            ? (formData.get("visitedCountries") as string)
                .split(",")
                .map((x) => x.trim())
            : [],
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-my-profile`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });


        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error(data.message || "Update failed");

        setUser(data.data);
        setPreviewImage(data.data.profilePhoto || "");
        toast.success("Profile updated successfully!");
        router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || "Update failed");
      }
    });
  };

  return (
    <div className="container mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-muted-foreground mt-1">Update your personal information</p>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                {previewImage ? (
                  <AvatarImage src={previewImage} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col w-full">
                <Label>Picture URL</Label>
                <Input
                  name="profilePhoto"
                  value={previewImage}
                  placeholder="Enter image URL"
                  onChange={(e) => setPreviewImage(e.target.value)}
                  disabled={isPending}
                />
              </div>

              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input name="name" defaultValue={user.name} disabled={isPending} required />
                </div>

                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input value={user.email} disabled className="bg-muted" />
                </div>

                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input name="phone" defaultValue={user.phone || ""} disabled={isPending} />
                </div>

                <div className="space-y-1">
                  <Label>Address</Label>
                  <Input name="address" defaultValue={user.address || ""} disabled={isPending} />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label>Bio</Label>
                  <Input name="bio" defaultValue={user.bio || ""} disabled={isPending} />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label>Travel Interests (comma separated)</Label>
                  <Input
                    name="travelInterests"
                    defaultValue={user.travelInterests?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label>Visited Countries (comma separated)</Label>
                  <Input
                    name="visitedCountries"
                    defaultValue={user.visitedCountries?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
