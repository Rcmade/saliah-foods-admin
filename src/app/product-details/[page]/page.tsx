"use client";
import Image from "next/image";
import Button from "../../../../components/button/Button";
import { Button as UiButton } from "@/components/ui/button";
import RatingStar from "../../../../components/rating-star/rating-star";
import IncrementDecrementButton from "../../../../components/increament-decrement/increment-decrement";
import { useEffect, useReducer, useState } from "react";
import Products from "../../products.json";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCart, ActionTypes } from "@/app/cart";
import React from "react";
import InputField from "../../../../components/input-field/input-field";
import InputTextarea from "../../../../components/text-area/text-area";
const getHash = () =>
  typeof window !== "undefined"
    ? decodeURIComponent(window.location.hash.replace("#", ""))
    : undefined;

const ProductDetails = () => {
  const router = useRouter();
  const id = useParams();
  const [tab, setTab] = useState("Descriptions");
  const [activeTab, setActiveTab] = useState(tabCollection[0].tabItem);

  const handleTabClick = (tabItem: any) => {
    setActiveTab(activeTab === tabItem ? null : tabItem);
  };
  const { cartState, cartDispatch } = useCart();
  const targetId = id.page;
  const targetProduct = Products?.products.find(
    (product: any) => product.id == targetId
  );

  const [productData, setProductData] = React.useState({
    id: targetProduct?.id as any,
    name: targetProduct?.product as string,
    image: targetProduct?.images as string[],
    categories: targetProduct?.category as any,
    varient:
      targetProduct?.varient?.find((v) => v.unit === getHash()) ||
      (targetProduct?.varient?.[0] as any),
  });

  const descriptionArray = [
    {
      content: "Brand : " + targetProduct?.additional_information?.brand,
    },
    {
      content:
        "Nutritional info : calories-" +
        targetProduct?.additional_information?.nutritional_info?.calories +
        ", carbohydrates- " +
        targetProduct?.additional_information?.nutritional_info?.carbohydrates +
        ", fat- " +
        targetProduct?.additional_information?.nutritional_info?.fat +
        ", weight- " +
        targetProduct?.additional_information?.nutritional_info?.weight,
    },
    {
      content:
        "Storage instructions : " +
        targetProduct?.additional_information?.storage_instructions,
    },
    {
      content:
        "Healthy alternative : " +
        targetProduct?.additional_information?.healthy_alternative,
    },
    {
      content: "Flavor : " + targetProduct?.additional_information?.flavor,
    },
    {
      content: "Benefits : " + targetProduct?.additional_information?.benefits,
    },
    {
      content: "Weight : " + targetProduct?.additional_information?.weight,
    },
    {
      content:
        "Health benefits details : " +
        targetProduct?.additional_information?.health_benefits_details,
    },
    {
      content:
        "Butritional content : " +
        targetProduct?.additional_information?.nutritional_content,
    },
    {
      content:
        "Recommended intake : " +
        targetProduct?.additional_information?.recommended_intake,
    },
    {
      content:
        "Delivery info : " +
        targetProduct?.additional_information?.delivery_info,
    },
  ];

  const [state, dispatch] = useReducer(reducer, { count: 1 });

  function decrement() {
    if (state.count > 1) {
      dispatch({ type: "decrement" });
    }
  }
  function increment() {
    dispatch({ type: "increment" });
  }

  const numericProductPrice = parseFloat(
    String((targetProduct?.price_range?.min_price ?? "")).replace(/[^\d.-]/g, "")
  );
  const price = isNaN(numericProductPrice) ? 0 : numericProductPrice;
  const newProductPrice = Math.round(state?.count * price);

  const { toggleSidebar } = useCart();
  useEffect(() => {}, []);
  const handleCart = () => {
    const addItemToCart = {
      id: productData?.id,
      quantity: state?.count,
      total: Number(
        productData?.varient?.price_range?.min_price * state?.count
      ),
      product: {
        name: productData?.name,
        image: productData?.image?.[0],
        price: Number(productData?.varient?.price_range?.min_price),
        unit: productData?.varient?.unit,
        category: productData?.categories,
      },
    };

    cartDispatch({ type: ActionTypes.ADD_TO_CART, payload: addItemToCart });
    toggleSidebar();
  };
  const handleChangevarient = (item: any) => {
    setProductData((prev) => ({
      ...prev,
      varient: item,
    }));
  };

  if (window === undefined) {
    return;
  }

  return (
    <>
      <div className="px-3 py-3 md:py-10 md:px-20 bg-[url('/net.png')] bg-contain">
        <div className="md:flex md:justify-between">
          <div className="hidden md:block">
            <Button
              text="Go home"
              className="!bg-transparent text-primary-900 !border rounded-md px-4"
              arrowBack={true}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex gap-2 text-light-500 items-center">
            <div className="flex-none">
              <Image src={"/home.png"} alt="home" width={18} height={18} />
            </div>
            <span className="cursor-pointer" onClick={() => router.push("/")}>
              Home
            </span>
            <span>&gt;</span>
            <span
              onClick={() => router.push("/product-list")}
              className="cursor-pointer"
            >
              Shop
            </span>
            <span>&gt;</span>
            <span className="text-success-green-900">Dates</span>
          </div>
        </div>
        {/* product section and add to cart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mt-8">
          <div className="md:flex md:flex-col md:items-center">
            <div>
              <Image
                src={targetProduct?.images[0] ?? ""}
                alt="home"
                width={500}
                height={508}
                className="w-[500px] rounded-xl bg-white"
              />
            </div>
            {/* <div className="flex justify-between md:gap-0 mt-4">
              {targetProduct?.images?.map((value: any, index: any) => (
                <Image
                  src={value}
                  alt="home"
                  width={121}
                  height={110}
                  key={index}
                  className="rounded-xl mx-2 cursor-pointer bg-white"
                />
              ))}
            </div> */}
          </div>
          <div>
            <h2 className="text-[#1A5632] font-semibold tracking-wide">
              {targetProduct?.category}
            </h2>
            <h3 className="lg:text-4xl text-xl text-primary-500 tracking-wide mt-2">
              {targetProduct?.product}
            </h3>
            <div className="flex gap-2 mt-2">
              <RatingStar />
              <span className="text-light-500"> 4 Review</span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <span className="line-through text-light-500">
                {/* ₹{productData?.varient?.price_range?.max_price * state?.count} */}
                ₹{productData?.varient?.price_range?.max_price}
              </span>
              <div>
                <span>
                  ₹{productData?.varient?.price_range?.min_price * state?.count}
                </span>
              </div>
              <span className="text-xs font-sans bg-green-200 px-2 py-[2px] rounded-full">
                64% Off
              </span>
            </div>
            <p className="text-light-500 mt-6 mb-4">
              {targetProduct?.description}
            </p>
            <div className={"flex flex-wrap w-full gap-2"}>
              {targetProduct?.varient?.map((vari: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`border ${
                      productData?.varient === vari
                        ? "border-[#B68050] bg-[#f8ebdf]"
                        : "border-[#b1afad]"
                    }  px-2 py-[3px] text-sm font-semibold font-sans rounded-md cursor-pointer`}
                    onClick={() => handleChangevarient(vari)}
                  >
                    {vari?.unit}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4  items-center mt-4 border-b border-[#E1CBB7] pb-6">
              <div>
                {/* <IncrementDecrementButton /> */}
                <div className="flex gap-2 justify-center items-center w-[100px] border border-[#e5e5e9] px-2 py-[8px] bg-white rounded-full">
                  <UiButton
                    className="rounded-full w-6 h-6 bg-[#e5e5e9]"
                    onClick={decrement}
                    variant="outline"
                    size="icon"
                  >
                    -
                  </UiButton>
                  <span className="text-md w-4">{state.count}</span>
                  <UiButton
                    onClick={increment}
                    className="rounded-full w-6 h-6 bg-[#e5e5e9]"
                    variant="outline"
                    size="icon"
                  >
                    +
                  </UiButton>
                </div>
              </div>
              <div>
                <Button
                  cartIcon={true}
                  text="Add to Cart"
                  onClick={handleCart}
                  className="px-6"
                />
              </div>
              <div className="p-[10px] bg-primary-500 rounded-full">
                <Image src={"/Heart.png"} alt="heart" width={20} height={20} />
              </div>
            </div>
            <div className="flex justify-start mt-4 gap-4">
              <div className="flex justify-center gap-2 text-primary-500 font-semibold tracking-wide md:mr-20">
                <Image
                  src={"/svg/natural.svg"}
                  alt="heart"
                  width={32}
                  height={32}
                />
                <p className="text-xs">
                  100% <br />
                  Natural
                </p>
              </div>
              <div className="flex gap-2 text-primary-500 font-semibold tracking-wide">
                <Image
                  src={"/svg/sugar.svg"}
                  alt="heart"
                  width={32}
                  height={32}
                />
                <p className="text-xs">
                  No Added <br />
                  Sugar
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* tabs and collapsible */}
        <div className="hidden md:flex gap-8 mt-12 mb-4 border-b border-primary-500">
          {tabCollection?.map((value, index) => {
            return (
              <div
                key={index}
                className={`py-2 cursor-pointer ${
                  tab === value.tabItem
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-light-500"
                }`}
                onClick={() => setTab(value.tabItem)}
              >
                {value.tabItem}
              </div>
            );
          })}
        </div>
        {tab === "Descriptions" && (
          <div className="hidden md:block">
            <h3 className="mb-6 text-light-900">Buy 1 Get 1 free pack</h3>

            <div
              className="text-light-500"
              dangerouslySetInnerHTML={{
                __html: targetProduct?.main_description as any,
              }}
            ></div>

            {descriptionArray?.map((items, ind) => {
              return (
                items.content && (
                  <div className="flex items-center gap-2 pb-2" key={ind}>
                    {/* dangerouslySetInnerHTML={(_htm:)} */}
                    <div className="flex-none">
                      {/* <Image
                      src={"/story/Wish.png"}
                      alt="wish"
                      width={18}
                      height={18}
                    /> */}
                    </div>
                    <p className="text-light-500"></p>
                  </div>
                )
              );
            })}
          </div>
        )}
        {tab === "Additional Information" && (
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="flex-none">
                <Image
                  src={"/story/Wish.png"}
                  alt="wish"
                  width={18}
                  height={18}
                />
              </div>
              <p className="text-light-500 font-semibold tracking-wide">
                {targetProduct?.additional_information?.weight}
              </p>
            </div>
          </div>
        )}
        {tab === "Customer Feedback" && (
          <div className="grid gap-8 mb-8">
            {reviewCollection?.map((review, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={review.imageUrl}
                          alt="user"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div>
                        <h4>{review.name}</h4>
                        <RatingStar />
                      </div>
                    </div>
                    <div className="text-light-500">{review.time}</div>
                  </div>
                  <p className="text-light-500 mt-2">{review.comment}</p>
                </div>
              );
            })}
            <div className="md:w-[50%] w-full">
              <h3 className="text-2xl font-semibold">Post your review</h3>
              <InputField placeholder="Enter your name" />
              <InputField type="email" placeholder="Email Id" />
              <InputTextarea placeholder="Enter your review" />
              <Button text="Submit" />
            </div>
          </div>
        )}

        <div className="block md:hidden lg:hidden my-6">
          {tabCollection.map((tab, index) => (
            <div key={index} className="mb-2">
              <div
                onClick={() => handleTabClick(tab.tabItem)}
                className="cursor-pointer p-2 border-b border-[#E8E8EB]"
              >
                {tab.tabItem}
              </div>
              {activeTab === tab.tabItem && (
                <div className="p-4">
                  {tab.tabItem === "Descriptions" && (
                    <div>
                      <h3 className="mb-6 text-light-900">Buy 1 Get 1 free</h3>
                      <div className="flex items-center gap-2 pb-2">
                        <div className="flex-none">
                          <Image
                            src={"/story/Wish.png"}
                            alt="wish"
                            width={18}
                            height={18}
                          />
                        </div>
                        <p className="text-light-500">
                          {targetProduct?.additional_information?.benefits}
                        </p>
                      </div>
                    </div>
                  )}

                  {tab.tabItem === "Additional Information" && (
                    <div>
                      <div className="flex items-center gap-2 pb-2">
                        <div className="flex-none">
                          <Image
                            src={"/story/Wish.png"}
                            alt="wish"
                            width={18}
                            height={18}
                          />
                        </div>
                        <p className="text-light-500 font-semibold tracking-wide">
                          Weight : 400Gms
                        </p>
                      </div>
                    </div>
                  )}

                  {tab.tabItem === "Customer Feedback" && (
                    <div>
                      <div className="grid md:gap-8 gap-4 mb-8">
                        {reviewCollection?.map((review, ind) => (
                          <div key={ind}>
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div>
                                  <Image
                                    src={review.imageUrl}
                                    alt="user"
                                    width={32}
                                    height={32}
                                  />
                                </div>
                                <div>
                                  <h4>{review.name}</h4>
                                  <RatingStar />
                                </div>
                              </div>
                              <div className="text-light-500">
                                {review.time}
                              </div>
                            </div>
                            <p className="text-light-500 mt-2">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="md:w-[50%] w-full">
                        <h3 className="text-xl font-semibold text-center">
                          Post your review
                        </h3>
                        <InputField placeholder="Enter your name" />
                        <InputField type="email" placeholder="Email Id" />
                        <InputTextarea placeholder="Enter your review" />
                        <Button text="Submit" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
const variantCollection = [
  {
    variant: "250 gm",
    active: false,
  },
  {
    variant: "500 gm",
    active: true,
  },
  {
    variant: "1 kg",
    active: false,
  },
];
const imageCollection = [
  {
    imageUrl: "/slider/01.png",
  },
  {
    imageUrl: "/slider/02.png",
  },
  {
    imageUrl: "/slider/03.png",
  },
  {
    imageUrl: "/slider/04.png",
  },
];
const tabCollection = [
  {
    tabItem: "Descriptions",
  },
  {
    tabItem: "Additional Information",
  },
  {
    tabItem: "Customer Feedback",
  },
];
const reviewCollection = [
  {
    imageUrl: "/reviewUser.png",
    name: "Kristin Watson",
    time: "2 min ago",
    comment: "Duis at ullamcorper nulla, eu dictum eros.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Jane Cooper",
    time: "30 Apr, 2021",
    comment:
      "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to 'bolt' or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Jacob Jones",
    time: "2 min ago",
    comment:
      " Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Ralph Edwards",
    time: "2 min ago",
    comment:
      "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
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
