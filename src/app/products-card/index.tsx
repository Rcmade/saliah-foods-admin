"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { ActionTypes, useCart } from "../cart";
import { Button } from "@/components/ui/button";

const Index = (props: any) => {
  const router = useRouter();
  const item = props.filteredProducts;
  const image = props.productsImage;
  const { toggleSidebar, cartDispatch } = useCart();

  const handleClick = (id: any) => {
    router.push(
      `/product-details/${id}#${decodeURIComponent(
        window.location.hash.substr(1)
      )}`
    );
  };
  const [selectedVariants, setSelectedVariants] = React.useState<{
    [key: string]: any;
  }>({});

  const handleVarient = (id: number, variant: any) => {
    router.push(`#${encodeURIComponent(variant.unit)}`, {
      scroll: false,
    });

    //console.log(variant, id);
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [id]: variant,
    }));
  };

  const handleCart = (value: any) => {
    // value?
    const price =
      selectedVariants?.[value.id]?.price_range?.min_price ||
      value?.varient?.[0]?.price_range?.min_price;
    const addItemToCart = {
      id: value?.id,
      quantity: 1,
      total: price,
      product: {
        name: value?.product,
        image: value?.images?.[0],
        price: price,
        unit: selectedVariants?.[value.id]?.unit,
        category: value?.category,
      },
    };
    // console.log({ addItemToCart, value, selectedVariants });

    cartDispatch({ type: ActionTypes.ADD_TO_CART, payload: addItemToCart });
    toggleSidebar();
  };

  return (
    <div>
      <div className="md:p-6 p-0 m-0  mt-10 pl-0 grid gap-6 grid-cols-2 lg:grid-cols-3 md:flex-row justify-between flex-col marker">
        {Array.isArray(item) &&
          item?.map((value: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full  cursor-pointer flex rounded-lg bg-white flex-col justify-between font-sans  shadow-lg md:shadow-md hover:md:shadow-xl transition-all"
                onClick={() => handleClick(value.id)}
              >
                <Image
                  className="cursor-pointer rounded-lg w-full md:h-full h-[140px] object-contain"
                  src={value.images[0]}
                  alt="Description of the image"
                  width={1334} // Replace with the actual width you want
                  height={1334} // Replace with the actual height you want
                />

                <div className="pt-2 pb-4 px-2 md:px-4  rounded-lg">
                  <h4 className="text-[11px] font-semibold text-success-green-900">
                    {value.category}
                  </h4>
                  <h5 className="text-primary-500 font-semibold text-[12px] md:text-xl cursor-pointer">
                    {value.product}
                  </h5>
                  <div className="flex text-xs md:text-sm flex-wrap gap-1 md:gap-2 md:my-3 my-[5px]">
                    {Array.isArray(value.varient) &&
                      value?.varient?.map((variant: any, index: number) => {
                        return (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVarient(value.id, variant);
                            }}
                            className={`border rounded-md px-1 text-light-500 cursor-pointer md:text-[14px] text-[8px] md:font-medium font-semibold ${
                              selectedVariants?.[value.id] === variant
                                ? "border-[#B68050] !text-primary-500 bg-[#fffaf5]"
                                : ""
                            } ${
                              selectedVariants?.[value.id]
                                ? ""
                                : index === 0
                                ? "border-[#B68050] !text-primary-500 bg-[#fffaf5]"
                                : ""
                            }`}
                          >
                            {variant?.unit}
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold mr-2">
                        ₹
                        {selectedVariants?.[value.id]?.price_range?.min_price ||
                          value?.varient?.[0]?.price_range?.min_price}
                      </span>
                      <span className="line-through text-sm font-semibold text-light-500">
                        ₹
                        {selectedVariants?.[value.id]?.price_range?.max_price ||
                          value?.varient?.[0]?.price_range?.max_price}
                      </span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCart(value);
                      }}
                    >
                      <Image
                        src={"/svg/bag.svg"}
                        alt="cart"
                        width={28}
                        height={28}
                        className="md:hidden block"
                      />
                      <Button className="hidden md:block"> Add to cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
