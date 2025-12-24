import { z } from "zod";

export const depositSchema = z.object({
  mobileNumber: z.string().min(10, "Select a mobile number"),
  paymentMethod: z.enum(["JazzCash", "Easypaisa"]),
  transactionId: z.string().min(4, "Transaction ID is required"),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
