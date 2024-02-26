"use client";
import Image from "next/image";
import Button from "../../../components/button/Button";
import InputField from "../../../components/input-field/input-field";
import DropDownField from "../../../components/dropdown/dropdown";
import InputTextarea from "../../../components/text-area/text-area";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActionTypes, useCart } from "../cart";
import { Button as UiButton } from "@/components/ui/button";
import { checkoutSchema, couponSchema } from "@/lib/schemas/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/components/Providers/user-provider";
import { toast } from "sonner";
import { loginAction } from "@/lib/actions/user-actions";
import {
  CountryStateData,
  OrderItem,
  RazorpayPaymentSuccess,
  User,
} from "@/lib/interface";
import { Mulish } from "next/font/google";
import Link from "next/link";
const mulish = Mulish({ subsets: ["latin"] });
import { countryStateData } from "@/data/country-state-data";
import {
  handleCheckoutAction,
  handlePaymentAction,
} from "@/lib/actions/checkout-actions";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { cartState, cartDispatch } = useCart();
  const { user, dispatch } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormReset, setIsFormReset] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoggingMessage, setShowLoggingMessage] = useState("");
  const defaultMessage =
    "Welcome! It seems you're not logged in. Please enter your phone number to either log in or create an account.";
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      country: "India",
      email: user?.email || "",
      firstName: user?.name || "",
      lastName: "",
      phone: "",
      pinCode: "",
      state: "",
      streetAddress: "",
      coupon: "",
      // area: "",
      note: "",
    },
  });

  useEffect(() => {
    if (!user?._id) {
      setShowLoggingMessage(defaultMessage);
    } else {
      setShowLoggingMessage("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const couponForm = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      coupon: "",
    },
  });

  const handleIncrement = (item: any) => {
    cartDispatch({ type: ActionTypes.INCREASE_QUANTITY, payload: item });
  };

  const handleDecrement = (item: any) => {
    cartDispatch({ type: ActionTypes.DECREASE_QUANTITY, payload: item });
  };

  const handleRemove = (item: any) => {
    cartDispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: item });
  };

  // Calculate the total value and total quantity ...
  const { totalValue, totalQuantity } = cartState?.cartItems?.reduce(
    (accumulator, item) => {
      const { totalValue, totalQuantity } = accumulator;
      const itemTotal = item.quantity * item.product.price;
      return {
        totalValue: totalValue + itemTotal,
        totalQuantity: totalQuantity + item.quantity,
      };
    },
    { totalValue: 0, totalQuantity: 0 }
  );

  const handleRemoveAllItems = () => {
    cartDispatch({ type: ActionTypes.REMOVE_ALL_ITEMS, payload: [] });
  };

  const payload = {
    totalValue,
    totalQuantity,
    name: "Aasif Aahaan",
  };

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    try {
      setIsLoading(true);
      if (user) {
        const data = await handlePaymentAction(
          values,
          cartState?.cartItems as unknown as OrderItem[],
          { total: totalValue, totalQuantity },
          user?._id || ""
        );
        if (!data.id) {
          toast.error(
            "Payment failed. Please try again. Contact support for help"
          );
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
          amount: data.amount,
          currency: "INR",
          name: values.firstName,
          description: "Tutorial of RazorPay",
          order_id: data.id,
          prefill: {
            name: values.firstName,
            email: values.email,
            contact: values.phone,
          },
          notes: {
            address: `${values.streetAddress}, ${values.city}, ${values.state}, ${values.country} - ${values.pinCode}`,
          },
          theme: {
            color: "#121212",
          },
          handler: (response: RazorpayPaymentSuccess) => {
            fetch("/api/payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: data.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.id,
                createdId: user?._id || "",
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message) {
                  toast.success("Payment successful");
                  router.replace(
                    `/payment-success?paymentId=${data?.payment?.paymentId}`
                  );
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  "Payment failed. Please try again. Contact support for help"
                );
              });
          },
        };

        //@ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response: any) {
          toast.error(
            String(response?.error?.description) ||
              "Payment failed. Please try again. Contact support for help"
          );
        });
      } else {
        setShowLoggingMessage(defaultMessage);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again. Contact support for help");
    } finally {
      setIsLoading(false);
    }
  }

  const loginSignupHandler = async (values: User) => {
    
  };

  return (
    <>
      <div
        className={`p-4 md:p-16 flex flex-col md:block bg-[url('/net.png')] bg-contain ${mulish.className}`}
      >
        <div className="flex">
          <div className="md:w-full w-[600px]">
            <Link href="/product-list">
              <Button
                text="Continue shopping"
                className="!bg-transparent text-primary-900 !border rounded-md px-4"
                arrowBack={true}
              />
            </Link>
          </div>
          <div className="flex gap-2 text-light-500 items-center w-full ml-[10%]">
            <h2 className="md:text-4xl text-primary-500 text-2xl text-end md:text-center">
              CHECKOUT
            </h2>
          </div>
        </div>
        <div className="flex md:grid flex-col grid-cols-[60%_40%] gap-4 mt-12">
          <Form {...form}>
            <form id="checkoutForm" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="">
                <h3 className="font-semibold text-xl">Billing Details</h3>
                <div className="mt-4 grid gap-4">
                  <div className="md:flex gap-4">
                    {/* <InputField label="First name" placeholder="First name" /> */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-black-800 ">
                            First name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="First name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-black-800 ">
                            Last name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <InputField label="Last name" placeholder="Last name" /> */}
                  </div>

                  <div className="md:flex gap-4 w-full">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-black-800 ">
                              Email address
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-black-800 ">
                              Phone Number
                            </FormLabel>
                            <div className="flex justify-center gap-4">
                              <FormControl>
                                <Input
                                  placeholder="Phone Number"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <UiButton>Verify</UiButton>
                            </div>
                            <FormMessage>{showLoggingMessage} </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="md:flex gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Country/Region</FormLabel>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              setSelectedCountry(val);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.keys(countryStateData).map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
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
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* {stateCollection.map((c) => (
                                <SelectItem key={c.option} value={c.option}>
                                  {c.option}
                                </SelectItem>
                              ))} */}

                              {(
                                countryStateData[
                                  selectedCountry as keyof CountryStateData
                                ] || []
                              ).map((c: string) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:flex gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Town/City</FormLabel>

                          <FormControl>
                            <Input placeholder="Enter a city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Town/City</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cityCollection.map((c) => (
                                <SelectItem key={c.option} value={c.option}>
                                  {c.option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    {/* <InputField
                      label="Pin code"
                      placeholder="Pin code"
                      className="mt-0"
                    /> */}

                    <FormField
                      control={form.control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-black-800 ">
                            Pin code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Pin code"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-black-800 ">
                          Street address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="House number and street name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order notes (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Note about your order, e.g. special notes for delivery."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
          <div>
            <div className="text-left p-4 bg-[#F0E5DB] rounded-md">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold text-xl pl-2">Order summary</h2>
                <div
                  className="w-fit cursor-pointer"
                  onClick={handleRemoveAllItems}
                >
                  <Image
                    src={"/close.png"}
                    alt="close"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="grid gap-2 border-b border-primary-500">
                <div>
                  {cartState?.cartItems?.length > 0 ? (
                    cartState?.cartItems?.map((value: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="rounded-md p-4 flex items-center gap-4">
                            <div>
                              <Image
                                src={value?.product?.image}
                                alt="dates"
                                width={120}
                                height={120}
                              />
                            </div>
                            <div className="w-full">
                              <div className="flex justify-between">
                                <h3 className="text-[18px]">
                                  {value?.product?.name}
                                </h3>
                                <span>₹{value?.total}</span>
                              </div>
                              <div className="flex items-center mt-[2px] mb-2 justify-between">
                                <div className="text-light-500 text-sm">
                                  <span>{value?.product?.unit} x</span>
                                  <span>{value?.product?.price}</span>
                                </div>
                                <div onClick={() => handleRemove(value)}>
                                  <Image
                                    src={"/svg/trash.svg"}
                                    alt="trash"
                                    width={18}
                                    className="cursor-pointer"
                                    height={18}
                                  />
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="flex gap-2 items-center w-[100px] border border-[#e5e5e9] px-2 py-[8px] bg-white rounded-full">
                                    <UiButton
                                      className="rounded-full w-6 h-6 bg-[#e5e5e9]"
                                      onClick={() => handleDecrement(value)}
                                      variant="outline"
                                      size="icon"
                                    >
                                      -
                                    </UiButton>

                                    <span className="text-md w-4">
                                      {value?.quantity}
                                    </span>

                                    <UiButton
                                      className="rounded-full w-6 h-6 bg-[#e5e5e9]"
                                      onClick={() => handleIncrement(value)}
                                      variant="outline"
                                      size="icon"
                                    >
                                      +
                                    </UiButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <h2 className="font-semibold">No items for checkout</h2>
                  )}
                </div>
              </div>

              <Button
                couponSvg={true}
                text="Have a Coupon? Enter Below to Apply"
                className="w-full justify-center text-sm font-semibold mt-6 !bg-[#C3966F]"
              />
              <div className="flex items-center justify-between gap-2 mt-6">
                {/* <input
                      type="text"
                      placeholder="Input"
                      className=" rounded-md py-0 h-[40px] pl-2 w-full"
                    /> */}

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Form {...couponForm}>
                    <form id="couponForm" className="flex items-end gap-x-2">
                      <FormField
                        control={form.control}
                        name="coupon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coupon</FormLabel>
                            <FormControl>
                              <Input placeholder="Coupon code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <UiButton form="couponForm" className="space-y-2">
                        Apply
                      </UiButton>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="grid gap-4 mt-6">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalValue}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalValue}</span>
                </div>
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our <b> privacy policy</b>.
                </p>
                {/* <Button
                  text="place order"
                  onClick={checkoutHandler(300)}
                  className="rounded-md w-full justify-center"
                /> */}

                <div>
                  <UiButton
                    // onClick={() => checkoutHandler(payload)}
                    form="checkoutForm"
                    type="submit"
                    className="rounded-md w-full justify-center"
                    disabled={isLoading}
                  >
                    Buy Now
                  </UiButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
const cartCollection = [
  {
    id: "1",
    imgUrl: "/cart/01.png",
    price: "₹300.00",
    productName: "Black Dates",
    totalWeight: "Size:",
    pricePerPiece: "280 Grams",
  },
  // {
  //   id: "2",
  //   imgUrl: "/cart/01.png",
  //   price: "₹771.00",
  //   productName: "Black Dates",
  //   totalWeight: "Size:",
  //   pricePerPiece: "Regular Pack",
  // },
  // {
  //   id: "3",
  //   imgUrl: "/cart/01.png",
  //   price: "₹301.00",
  //   productName: "Black Dates",
  //   totalWeight: "Size:",
  //   pricePerPiece: "500 Grams",
  // },
];
const countryCollection = [
  {
    option: "India",
  },
  {
    option: "United State (US)",
  },
  {
    option: "United Kingdom (UK)",
  },
];
const stateCollection = [
  {
    option: "Uttar Pradesh",
  },
  {
    option: "Haryana",
  },
  {
    option: "Uttrakhands",
  },
];
const cityCollection = [
  {
    option: "Noida",
  },
  {
    option: "Ghaziabad",
  },
  {
    option: "meerut",
  },
];

function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return { state };
  }
}
