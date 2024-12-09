import { z } from "zod";

export const partValidationSchema = z.object({
  _id: z.string().optional(),
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  type: z.string(
    z.enum(["sparepart", "consumable", "material"])
  ),
  specification: z
    .string()
    .min(1, "Specification is required"),
  brand: z.string().min(1, "Brand is required"),
  image: z.string().optional(),
  category: z.string().optional(),
});
