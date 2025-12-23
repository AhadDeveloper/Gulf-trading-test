import { z } from "zod";

const MAX_FILE_SIZE_KB = 500;
const MAX_FILE_SIZE = MAX_FILE_SIZE_KB * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().optional(),

  photo: z
    .any()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Image must be less than ${MAX_FILE_SIZE_KB}KB`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, JPEG, PNG files are allowed"
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
