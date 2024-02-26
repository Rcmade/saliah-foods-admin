import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "This field has to be filled.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

const emailValidator = z.string().email();

// Define user schema using zod
export const userFormSchema = z
  .object({
    name: z.string().min(1, "Please enter the name"),
    email: z
      .string()
      .refine(
        (v) => (v ? emailValidator.safeParse(v).success : true),
        "Invalid email"
      ),
    phone: z.string().refine((value) => {
      if (value) return value.length >= 10;

      return true;
    }, "Invalid number"),
    role: z.enum(["ADMIN", "USER"]).optional(),
    agree: z.boolean().optional(),
  })
  .partial()
  .refine(
    (data) => {
      return !!data.email || !!data.phone;
    },
    {
      path: ["email", "phone"],
    }
  );

export const loginFormSchema = z
  .object({
    email: z
      .string()
      .refine(
        (v) => (v ? emailValidator.safeParse(v).success : true),
        "Invalid email"
      ),
    phone: z.string().refine((value) => {
      if (value) return value.length >= 10;
      return true;
    }, "Invalid number"),
    rememberMe: z.boolean().optional(),
  })
  .partial()
  .refine((data) => {
    return !!data.email || !!data.phone;
  });

export const checkoutSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

  phone: z.string().min(9, { message: "Please enter a valid phone number." }),
  country: z.string().min(1, { message: "This field has to be filled." }),
  state: z.string().min(1, { message: "This field has to be filled." }),
  city: z.string().min(1, { message: "This field has to be filled." }),
  pinCode: z.string().min(1, { message: "Please enter a code." }),
  streetAddress: z.string().min(1, { message: "This field has to be filled." }),
  // area: z.string().min(1, { message: "This field has to be filled." }),
  coupon: z.string().optional(),
  note: z.string().optional(),
});

export const couponSchema = z.object({
  coupon: z.string().optional(),
});
