"use server";

import { createSupabaseServerClient } from "../supabase/server";
import { getUser } from "./auth";
import { Profile, ActionResult } from "@/types";

const USER_ERROR = "User not authenticated";

export const getProfile = async (): Promise<ActionResult<Profile>> => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles") // corrected table name
    .select("*")
    .eq("id", user.id)
    .single(); // only one profile per user

  if (error) return { error: error.message };
  return { data };
};

export type UpdateProfileInput = {
  username: string;
  phone: string;
  address: string;
  photo?: File | null;
};

export const updateProfile = async ({
  username,
  phone,
  address,
  photo,
}: UpdateProfileInput) => {
  const user = await getUser();
  if (!user) return { error: "User not authenticated" };

  const supabase = await createSupabaseServerClient();

  let profileImageUrl: string | undefined;

  // 🔹 Upload image if exists
  if (photo) {
    try {
      const filePath = `${user.id}/avatar`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, photo, {
          upsert: true,
          contentType: photo.type,
        });

      if (uploadError) throw new Error(uploadError.message);

      const { data: signed, error: signedError } = await supabase.storage
        .from("profile-images")
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 1 week expiration

      if (signedError) throw new Error(signedError.message);

      profileImageUrl = signed.signedUrl;

      console.log("Bucket upload success:", profileImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Bucket upload failed:", err.message);
        return { error: "Bucket upload failed: " + err.message };
      }
    }
  }

  // 🔹 Update profile
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        phone,
        address,
        ...(profileImageUrl && { profile_image: profileImageUrl }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw new Error(error.message);

    console.log("Profile table update success");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Bucket upload failed:", err.message);
      return { error: "Bucket upload failed: " + err.message };
    }

    return { error: "Bucket upload failed" };
  }

  return { success: true };
};
