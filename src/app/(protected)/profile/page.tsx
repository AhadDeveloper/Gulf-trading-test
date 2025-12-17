"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FiX, FiImage } from "react-icons/fi";

export default function ProfileSettings() {
  const [username, setUsername] = useState("ahad005");
  const [mobile, setMobile] = useState("03048152002");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      toast.success("Photo selected!");
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    toast("Photo removed.");
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-lg mx-auto w-[90%] py-6 flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            ⚙️ Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Profile Photo */}
          <div className="relative w-full pt-[50%] rounded-md overflow-hidden border border-gray-300 cursor-pointer bg-gray-100 flex items-center justify-center">
            {photoPreview ? (
              <>
                <Image
                  src={photoPreview}
                  alt="Profile"
                  fill
                  className="object-cover w-full h-full"
                  onClick={handlePhotoClick}
                />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full z-10"
                >
                  <FiX size={18} />
                </button>
              </>
            ) : (
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2"
                onClick={handlePhotoClick}
              >
                <FiImage className="text-gray-400 text-6xl" />
                <span className="text-gray-500 font-medium">
                  Select New Photo
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <Button
            onClick={handlePhotoClick}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Update Photo
          </Button>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Mobile</label>
            <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Input
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Save Changes Button */}
          <Button
            onClick={handleSave}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
