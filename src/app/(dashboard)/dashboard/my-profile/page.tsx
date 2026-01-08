// pages/dashboard/my-profile/page.tsx

import { getCurrentUserServer } from "@/components/Dashborad/AppSidebar";
import MyProfileClient from "@/components/Dashborad/myProfile/MyProfileClient";

export default async function MyProfilePage() {
  // Server side: ইউজারের data আগে থেকেই আছে
  const userInfoResponse = await getCurrentUserServer();
  const user = userInfoResponse?.data;

  if (!user) {
    return <p className="text-center py-10">Please login first</p>;
  }

  return <MyProfileClient userInfo={user} />;
}
