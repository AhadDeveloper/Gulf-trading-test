"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileFormValues,
} from "@/lib/validations/profileSchema";
import { updateProfile } from "@/lib/actions/profile";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FiX, FiImage } from "react-icons/fi";
import { useRouter } from "next/navigation";

type Props = {
  initialProfile: {
    username: string;
    phone: string;
    address: string;
    profileImage: string | null;
  };
};

export default function ProfileSettings({ initialProfile }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  /* ------------------ Preview State ------------------ */
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialProfile.profileImage
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialProfile.username,
      phone: initialProfile.phone,
      address: initialProfile.address,
      photo: undefined, // <-- Only the File object should go here
    },
  });

  const photo = watch("photo"); // this is the File object

  /* ------------------ Handle Preview ------------------ */
  useEffect(() => {
    if (!photo) return;

    const objectUrl = URL.createObjectURL(photo);
    setPhotoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  /* ------------------ Handlers ------------------ */
  const onSubmit = (data: ProfileFormValues) => {
    startTransition(async () => {
      const res = await updateProfile({
        username: data.username,
        phone: data.phone,
        address: data.address ?? "",
        photo: data.photo,
      });

      if (res?.error) toast.error(res.error);
      else {
        toast.success("Profile updated successfully");
        router.push("/dashboard");
      }
    });
  };

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("photo", file, { shouldValidate: true });
  };

  const handleRemovePhoto = () => {
    setValue("photo", undefined);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="max-w-lg mx-auto w-[90%] py-6">
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Profile Settings</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* ---------- Photo ---------- */}
            <div className="flex flex-col gap-3">
              <div
                className="relative w-full pt-[50%] rounded-md overflow-hidden border cursor-pointer bg-gray-100"
                onClick={handlePhotoClick}
              >
                {photoPreview ? (
                  <>
                    <Image
                      src={photoPreview}
                      alt="Profile"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto();
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <FiX />
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <FiImage className="text-6xl text-gray-400" />
                    <span className="text-gray-500">Select Photo</span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              {errors.photo && (
                <p className="text-sm text-red-500">
                  {errors.photo.message as string}
                </p>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handlePhotoClick}
              >
                Update Photo
              </Button>
            </div>

            {/* ---------- Username ---------- */}
            <div>
              <Input placeholder="Username" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* ---------- Phone ---------- */}
            <div>
              <Input placeholder="Phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* ---------- Address ---------- */}
            <Input placeholder="Address" {...register("address")} />

            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
