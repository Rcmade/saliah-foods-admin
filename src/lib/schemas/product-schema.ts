import { z } from "zod";

// Define Zod schema
export const ProductSchema = z.object({
  id: z.number(),
  _id: z.string(),
  product: z.string(),
  price_range: z.object({
    min_price: z.number(),
    max_price: z.number(),
  }),
  shipping_info: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  category: z.string(),
  varient: z
    .array(
      z.object({
        unit: z.string().optional(),
        price_range: z
          .object({
            min_price: z.number(),
            max_price: z.number(),
          })
          .optional(),
      })
    )
    .optional(),
  homePageType: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()),
  main_description: z.string(),
  additional_information: z
    .object({
      brand: z.string(),
      origin: z.string(),
      nutritional_info: z.object({
        calories: z.string(),
        protein: z.string(),
        carbohydrates: z.string(),
        fat: z.string(),
        weight: z.string(),
      }),
      storage_instructions: z.string(),
      healthy_alternative: z.string(),
      flavor: z.string(),
      benefits: z.string(),
      delivery_info: z.string(),
    })
    .optional(),
});
