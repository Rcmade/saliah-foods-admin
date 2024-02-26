"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CldUploadWidget } from "next-cloudinary";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import Tiptap from "./RichText/Tiptap";
import { Pencil, PlusSquare, Trash2 } from "lucide-react";
import { categoryOptions } from "@/data/category-data";
import ImageUpload from "./ImageUpload";
import { ProductSchema } from "@/lib/models/products.model";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// Define Zod schema
const ProductZodSchema = z.object({
  _id: z.string(),
  product: z.string().min(1, {
    message: "Field is required",
  }),
  price_range: z.object({
    min_price: z.string().min(1, {
      message: "Field is required",
    }),
    max_price: z.string().min(1, {
      message: "Field is required",
    }),
  }),
  shipping_info: z.string().optional(),
  quantity: z.string().min(1, {
    message: "Field is required",
  }),

  unit: z.string().min(1, {
    message: "Field is required",
  }),
  category: z.string().min(1, {
    message: "Field is required",
  }),
  homePageType: z.string().optional(),
  description: z.string().min(1, {
    message: "Field is required",
  }),
  main_description: z.string().optional(),
  varient: z
    .array(
      z.object({
        unit: z.string(),
        price_range: z
          .object({
            min_price: z.string(),
            max_price: z.string(),
          })
          .optional(),
      })
    )
    .optional(),
  additional_information: z
    .object({
      brand: z.string().optional(),
      origin: z.string().optional(),
      nutritional_info: z.object({
        calories: z.string().optional(),
        protein: z.string().optional(),
        carbohydrates: z.string().optional(),
        fat: z.string().optional(),
        weight: z.string().optional(),
      }),
      storage_instructions: z.string().optional(),
      healthy_alternative: z.string().optional(),
      flavor: z.string().optional(),
      benefits: z.string().optional(),
      delivery_info: z.string().optional(),
    })
    .optional(),
});

const CreateUpdateForm = ({
  _id,
  data,
}: {
  _id?: string;
  data?: ProductSchema;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgs, setImgs] = useState(data?.images || []);
  const router = useRouter();

  useEffect(() => {
    return () => {};
  }, []);

  const form = useForm<z.infer<typeof ProductZodSchema>>({
    resolver: zodResolver(ProductZodSchema),
    defaultValues: {
      _id: _id || "",
      category: data?.category || "",
      description: data?.description || "",
      homePageType: data?.homePageType || "New Arrivals",
      product: data?.product || "",
      price_range: {
        max_price: String(data?.price_range?.max_price || ""),
        min_price: String(data?.price_range?.min_price || ""),
      },
      varient: (data?.varient && data?.varient?.length > 0
        ? data?.varient
        : [
            {
              unit: "",
              price_range: {
                max_price: "",
                min_price: "",
              },
            },
          ]
      ).map((v, i) => ({
        key: i,
        unit: v.unit,
        price_range: {
          min_price: String(v?.price_range?.min_price || ""),
          max_price: String(v?.price_range?.max_price || ""),
        },
      })),
      quantity: String(data?.quantity || ""),
      shipping_info: data?.shipping_info || "",
      unit: data?.unit || "",
      main_description: data?.main_description || "",
    },
  });

  const { append, fields, insert, move, remove } = useFieldArray({
    name: "varient",
    control: form.control,
  });

  const onSubmit = async (data: z.infer<typeof ProductZodSchema>) => {
    try {
      setIsLoading(true);
      const formateData = { ...data, images: imgs };
      const res = await fetch(
        `/api/product`,
        {
          method: "POST",
          body: JSON.stringify(formateData),
        }
      );
      const resData: ProductSchema | any = await res.json();
      if (resData?._id) {
        toast.success(`Products has been ${resData?.type} successfully`);
        setTimeout(() => {
          router.push("/admin/dashboard/products");
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = (url: string) => {
    setImgs((pre) => pre.filter((i) => i !== url));
  };

  return (
    <div className="flex-1">
      <h2>Product info</h2>

      <Form {...form}>
        <form
          id="createForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            <FormField
              control={form.control}
              name="product"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Product Name{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Dates syrup...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_range.min_price"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Minimum price (₹)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1999.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_range.max_price"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Maximum price (₹)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1990" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shipping_info"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Shipping Info
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eligible for Shipping Across India"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Total Quantity
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homePageType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Show on home page</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New Arrivals">New Arrivals</SelectItem>
                      <SelectItem value="Best Sellers">Best Sellers</SelectItem>
                      <SelectItem value="Sale">Sale</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-black-800 ">
                    Products Category
                  </FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((i) => (
                        <SelectItem key={i.option} value={i.option}>
                          {i.option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">Unit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Unit"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-800 ">
                    Short description
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Tell us about products" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3">
              <h1>Products varient info</h1>
              <div className=" flex flex-col">
                {fields.map((field, index) => {
                  return (
                    <div key={index}  className="flex items-start gap-5">
                      <FormField
                        key={index}
                        control={form.control}
                        name={`varient[${index}].unit` as any}
                        disabled={isLoading}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-black-800 ">
                              Unit
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="400 Grams" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`varient[${index}].price_range.max_price` as any}
                        disabled={isLoading}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-black-800 ">
                              Maximum price (₹)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1999.."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex-1 flex items-end  gap-2">
                        <FormField
                          control={form.control}
                          name={
                            `varient[${index}].price_range.min_price` as any
                          }
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-black-800 ">
                                Minimum Price
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="1999.."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="destructive"
                          size={"icon"}
                          onClick={() => {
                            if (index !== 0) {
                              remove(0);
                            }
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex justify-end mt-6">
                <Button
                  variant="default"
                  type={"button"}
                  size={"icon"}
                  onClick={() =>
                    append({
                      unit: "",
                      price_range: {
                        max_price: "",
                        min_price: "",
                      },
                    })
                  }
                >
                  <PlusSquare />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end  ">
            <ImageUpload
              values={imgs}
              setImgs={setImgs}
              disabled={isLoading}
              onRemove={onRemove}
            />
            <Button form="createForm" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUpdateForm;
