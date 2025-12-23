import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProfileSettings from "@/components/sections/ProfileSetting";
import { getProfile } from "@/lib/actions/profile";

export default async function ProfilePage() {
  const { data: profile } = await getProfile();

  let signedImageUrl: string | null = null;

  if (profile?.profileImage) {
    const supabase = await createSupabaseServerClient();

    const { data } = await supabase.storage
      .from("profile-images")
      .createSignedUrl(
        profile.profileImage,
        60 * 60 * 24 * 7 // 7 days
      );

    signedImageUrl = data?.signedUrl ?? null;
  }

  return (
    <ProfileSettings
      initialProfile={{
        username: profile?.username ?? "",
        phone: profile?.phone ?? "",
        address: profile?.address ?? "",
        profileImage: signedImageUrl,
      }}
    />
  );
}
