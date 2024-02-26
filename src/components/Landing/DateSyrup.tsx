import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionTypes, useCart } from "@/app/cart";
import { Button } from "../ui/button";
import { Mulish } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"] });

const DateSyrup = () => {
  const [selectedVariants, setSelectedVariants] = React.useState<{
    [key: string]: any;
  }>({});
  const { toggleSidebar, cartDispatch } = useCart();

  const handleVarient = (id: any, variant: any) => {
    const vari = variant.varient.find((i: any) => i.unit === id);
    if (vari) {
      setSelectedVariants((prevSelectedVariants) => ({
        ...prevSelectedVariants,
        [variant.id]: vari,
      }));
    }
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
    <>
      <Carousel
      //  plugins={[
      //   Autoplay({
      //     delay: 5000,
      //   }),

      // ]} 
      className="w-full ">
        <CarouselContent className="max-h-auto md:max-h-[61rem]">
          {productsArr.map((item, index) => (
            <CarouselItem key={index}>
              <div className="  bg-[url('/net.png')]">
                <h1 className="block  text-primary-500 text-4xl justify-center  text-center md:py-10 pt-10 pb-0 tracking-wide bg-cover">
                  {item?.product}
                </h1>
                <div className="flex flex-col-reverse md:items-start md:flex md:grid-cols-3 md:gap-20 items-center md:py-20 py-8 p-6 md:px-20  bg-contain  md:flex-row-reverse">
                  <div className="flex-1">
                    <span className="text-[#B68050] text-3xl my-10 border-b-[1px] pb-3 md:pr-20 border-[#E1CBB7]">
                      Health Benefits
                    </span>

                    <ul className="grid md:grid-cols-1 grid-cols-2 items-start justify-start mt-10 gap-4 border-b-[1px] pb-3 md:pr-20 border-[#E1CBB7]">
                      {item.additional_information?.benefitsArr?.map(
                        (value, index) => {
                          return (
                            <li
                              className="flex flex-col items-center justofy-between justify-start md:items-start md:flex-row gap-4 border-b border-[#F0E5DB] pb-4"
                              key={index}
                            >
                              <Image
                                src={value.imgUrl}
                                alt="image"
                                width={52}
                                height={52}
                              />
                              <span className="text-[#B68050] font-bold text-center  md:text-start">
                                {value.benefits}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>

                    <ul className="grid md:grid-cols-1 grid-cols-2 items-start justify-start mt-10 gap-4 ">
                      {item.additional_information?.anotherBenefits?.map(
                        (value, index) => {
                          return (
                            <li
                              className="flex flex-col items-center justofy-between justify-start md:items-start md:flex-row gap-4  pb-4"
                              key={index}
                            >
                              <Image
                                src={value.imgUrl}
                                alt="image"
                                width={52}
                                height={52}
                              />
                              <span className="text-[#B68050] font-bold text-center  md:text-start">
                                {value.benefits}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                  <div className="text-center  flex-1 md:block hidden">
                    <Image
                      src={item?.images[0]}
                      alt="banner"
                      width={300}
                      height={600}
                      className="w-full"
                    />
                    <div>
                      <h3 className="font-semibold my-6">
                        {selectedVariants[item?.id]?.unit || "400gm, pack of 1"}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-col flex-1 w-screen p-6 md:p-0">
                    <span className="text-[#B68050] text-2xl uppercase md:border-none border-b border-primary-500 md:pb-0 pb-2">
                      Description
                    </span>
                    <p className="md:my-10 mt-4 mb-0 text-[#847A73]">
                      {item.description}
                    </p>
                    <p className="text-[#847A73]">
                      Mix in cereal or coffee for a hint of sweetness.
                    </p>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex w-full justify-between rounded-full px-4 border-[1px] md:mt-10 mt-2 border-[#E1CBB7] py-2 my-2">
                            <span className="text-[#847A73] font-semibold">
                              Benefits
                              {/* {item.additional_information.benefits} */}
                            </span>
                            <span
                              className="cursor-pointer "
                            // onClick={() => expendContent()}
                            >
                              <Image
                                src={"/svg/expend-button.png"}
                                alt="heart"
                                width={24}
                                height={24}
                              />
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.additional_information?.benefits}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <div className="flex w-full justify-between rounded-full px-4 border-[1px]   border-[#E1CBB7] py-2 ">
                            <span className="text-[#847A73] font-semibold">
                              Ingredients
                            </span>
                            <span className="cursor-pointer ">
                              <Image
                                src={"/svg/expend-button.png"}
                                alt="heart"
                                width={24}
                                height={24}
                              />
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.additional_information?.ingredients}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="md:block hidden">
                      <div className="uppercase md:mt-20 mt-4 text-[#2a2a2a] font-bold">
                        Pricing Options
                      </div>
                      <div className="md:block grid grid-cols-2 gap-2 items-center">
                        <div className="md:my-5 dropdown bg-[url('/dropdown.png')] bg-contain h-fit">
                          <Select
                            onValueChange={(e) => {
                              handleVarient(e, item);
                            }}
                          >
                            <SelectTrigger className="bg-transparent border-[2px] border-[#E1CBB7] rounded-full md:p-4 p-2 w-full md:w-[400px]">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {item.varient.map((i) => (
                                <SelectItem key={i.unit} value={i.unit}>
                                  {`Unit ${i.unit}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleCart(item)}
                            className={`text-lg rounded-full uppercase font-bold px-6 py-4 ${mulish.className}`}
                          >
                            Add To Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden block w-full">
                    <div className="uppercase md:mt-20 mt-4 text-[#2a2a2a] font-bold">
                      Pricing Options
                    </div>
                    <div className="md:block grid grid-cols-2 gap-2 items-center">
                      <div className="md:my-5 dropdown bg-[url('/dropdown.png')] bg-contain h-fit">
                        <Select
                          onValueChange={(e) => {
                            handleVarient(e, item);
                          }}
                        >
                          <SelectTrigger className="bg-transparent border-[2px] border-[#E1CBB7] rounded-full md:p-4 p-2 w-full md:w-[400px]">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {item.varient.map((i) => (
                              <SelectItem key={i.unit} value={i.unit}>
                                {`Unit ${i.unit}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Button
                          onClick={() => handleCart(item)}
                          className={`text-lg rounded-full uppercase font-bold px-6 py-4 ${mulish.className}`}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center  flex-1 md:hidden block w-full">
                    <Image
                      src={item.images[0]}
                      alt="banner"
                      width={300}
                      height={600}
                      className="w-full"
                    />
                    <div>
                      <h3 className="font-semibold md:my-6 mt-4 mb-2">
                        {selectedVariants[item?.id]?.unit || "400gm, pack of 1"}
                      </h3>

                      {/* <div className="flex flex-row md:flex-row gap-4 justify-center md:items-center">
                        <button className="flex items-center border border-[#E6E8EC] rounded-full py-2 px-4 gap-2">
                          <Image
                            src={"/svg/comment.svg"}
                            alt="comment"
                            width={24}
                            height={24}
                          />
                          <span>8</span>
                        </button>
                        <button className="border border-[#E6E8EC] rounded-full py-2 px-4">
                          <Image
                            src={"/svg/share.svg"}
                            alt="share"
                            width={24}
                            height={24}
                          />
                        </button>
                        <button className="border border-[#E6E8EC] rounded-full py-2 px-4">
                          <Image
                            src={"/svg/heart-red.svg"}
                            alt="heart"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="absolute flex w-full justify-center h-10">
                  <CarouselPrevious className="relative -mt-12  md:-mt-32 xl:-mt-24 -mr-10 text-[#bd8050]  border-2 bg-transparent border-[#E1CBB7]  disabled:border-none p-2 text-2xl w-10 h-10 md:w-16 md:h-16  " />
                  <CarouselNext className="relative -mt-12 md:-mt-32 -ml-10 xl:-mt-24 text-[#bd8050]  border-2 bg-transparent border-[#E1CBB7]  disabled:border-none p-2 text-2xl w-10 h-10 md:w-16 md:h-16  " />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <div className="absolute flex w-full justify-center h-10">
          <CarouselPrevious className="relative -mt-10 md:-mt-32 -mr-10 text-[#bd8050]  border-2 bg-transparent border-[#bd8050]  disabled:border-none p-2 text-2xl w-10 h-10 md:w-16 md:h-16  " />
          <CarouselNext className="relative -mt-10 md:-mt-32 -ml-10 text-[#bd8050]  border-2 bg-transparent border-[#bd8050]  disabled:border-none p-2 text-2xl w-10 h-10 md:w-16 md:h-16  " />
        </div> */}
      </Carousel>
    </>
  );
};

export default DateSyrup;

const dateSyrupBenefits = [
  {
    imgUrl: "/svg/dateSyrup/image01.svg",
    benefits: "Strengthening Bones",
  },
  {
    imgUrl: "/svg/dateSyrup/image03.svg",
    benefits: "Healthier Digestive System",
  },
  {
    imgUrl: "/svg/dateSyrup/image04.svg",
    benefits: "Good For Skin",
  },
  {
    imgUrl: "/svg/dateSyrup/image05.svg",
    benefits: "Anti-Oxidant",
  },
];

const anotherBenefits = [
  {
    imgUrl: "/svg/dateSyrup/image06.svg",
    benefits: "100% Natural",
  },
  {
    imgUrl: "/svg/dateSyrup/image07.svg",
    benefits: "No Added Sugar",
  },
];

const productsArr = [
  {
    id: 2,
    product: "Date Syrup",
    price_range: {
      min_price: "280.50",
      max_price: "330.00",
    },
    homePageType: "New Arrivals",
    images: [
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/Date-Syrup_800x800.png?fit=800%2C800&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/Date-Syrup_800x800.png?fit=800%2C800&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/Date-Syrup_800x800.png?fit=800%2C800&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/Date-Syrup_800x800.png?fit=800%2C800&ssl=1",
    ],
    varient: [
      {
        unit: "400 Grams",
        price_range: {
          min_price: 280.5,
          max_price: 330.0,
        },
      },
    ],
    shipping_info: "Eligible for Shipping Across India",
    unit: "400 Grams",
    stock_status: "Out of stock",
    add_to_wishlist: true,
    compare: true,
    category: "Date Syrup",

    description:
      "Our date syrup can be used in addition to or instead of honey or syrup, and as a substitute for refined sugar in baking and cooking.",
    additional_information: {
      flavor: "Dates",
      benefits:
        "This syrup comes with no added sugar and preservatives for your daily need and diet. It is a delicious natural sweetener for beverages, energy bars, baby food, and baked goods. Enhances rich flavors and is a super alternative to sugar. Can be used in addition to or instead of honey or syrup, and as a substitute for refined sugar in baking and cooking. Mix in cereal or coffee for a hint of sweetness.",
      ingredients: "Natural Dates",
      weight: "400gm, Pack of 1",
      storage_instructions:
        "Store in a cool, hygienic and dry place, away from direct sunlight and strong odor in an airtight container and preferably refrigerate after opening the pack.",
      healthy_alternative:
        "Healthy alternative to refined sugar, honey, maple syrup, or agave syrup.",
      delivery_info:
        "Order will be delivered in 2-7 working days from the order date.",
      benefitsArr: [
        {
          imgUrl: "/svg/dateSyrup/image01.svg",
          benefits: "Strengthening Bones",
        },
        {
          imgUrl: "/svg/dateSyrup/image03.svg",
          benefits: "Healthier Digestive System",
        },
        {
          imgUrl: "/svg/dateSyrup/image04.svg",
          benefits: "Good For Skin",
        },
        {
          imgUrl: "/svg/dateSyrup/image05.svg",
          benefits: "Anti-Oxidant",
        },
      ],
      anotherBenefits: [
        {
          imgUrl: "/svg/dateSyrup/image06.svg",
          benefits: "100% Natural",
        },
        {
          imgUrl: "/svg/dateSyrup/image07.svg",
          benefits: "No Added Sugar",
        },
      ],
    },
    main_description:
      "<div>  <h2>Description</h2>  <ul>    <li>Flavor: Dates</li>    <li>Benefits: This Syrup comes with no added sugar and preservatives for your daily need and diet</li>    <li>Ingredients: Natural Dates</li>    <li>Weight: 400gm, Pack of 1</li>    <li>Storage Instructions: Store in a cool, hygienic and dry place, away from direct sunlight and strong odor in an airtight container and preferably refrigerate after opening the pack.</li>    <li>Healthy alternative to refined sugar, honey, maple syrup, or agave syrup</li>    <li>Delicious Natural Sweetener for beverages, energy bars, baby food and baked goods</li    <li>Enhances rich flavors and a super alternative to sugar</li>    </ul>    <p>Our date syrup can be used in addition to or instead of honey or syrup, and as a substitute for refined sugar in baking and cooking. Mix in cereal or coffee for a hint of sweetness.</p>    <p>Order will be delivered in 2-7 working days from order date.</p>                            </div>",
    additional_info: {
      some_additional_info:
        "Add any additional information specific to this product here.",
    },
  },
  {
    id: 1,
    product: "Date Syrup (280Grams)",
    price_range: {
      min_price: "135.15",
      max_price: "135.15",
    },
    shipping_info: "Eligible for Shipping Across India",
    quantity: 1,
    unit: "280 Grams",
    category: "Dates",
    varient: [
      {
        unit: "100 Grams",
        price_range: {
          min_price: 135,
          max_price: 159,
        },
      },
      {
        unit: "250 Grams",
        price_range: {
          min_price: 160,
          max_price: 180,
        },
      },
      {
        unit: "500 Grams",
        price_range: {
          min_price: 200,
          max_price: 200,
        },
      },
    ],
    description:
      "Our date syrup can be used in addition to or instead of honey or syrup, and as a substitute for refined sugar in baking and cooking.",
    images: [
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/1-01.png?fit=3334%2C3334&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/1-01.png?fit=3334%2C3334&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/1-01.png?fit=3334%2C3334&ssl=1",
      "https://i0.wp.com/www.saliahfoods.com/wp-content/uploads/2023/02/1-01.png?fit=3334%2C3334&ssl=1",
    ],

    additional_information: {
      brand: "Fardh",
      origin: "Unknown",
      nutritional_info: {
        calories: "100 per 100g",
        protein: "2g",
        carbohydrates: "25g",
        fat: "0.5g",
        weight: "250gms, 500gms",
      },
      storage_instructions:
        "Store in a cool, hygienic and dry place, away from direct sunlight and strong odor in an airtight container and preferably refrigerate after opening the pack.",
      healthy_alternative:
        "Healthy alternative to refined sugar, honey, maple syrup, or agave syrup.",
      ingredients: "Natural Dates",
      flavor: "Dates",
      benefits:
        "This syrup comes with no added sugar and preservatives for your daily need and diet. It is a delicious natural sweetener for beverages, energy bars, baby food, and baked goods. Enhances rich flavors and is a super alternative to sugar. Can be used in addition to or instead of honey or syrup, and as a substitute for refined sugar in baking and cooking. Mix in cereal or coffee for a hint of sweetness.",
      benefitsArr: [
        {
          imgUrl: "/svg/dateSyrup/image01.svg",
          benefits: "Strengthening Bones",
        },
        {
          imgUrl: "/svg/dateSyrup/image03.svg",
          benefits: "Healthier Digestive System",
        },
        {
          imgUrl: "/svg/dateSyrup/image04.svg",
          benefits: "Good For Skin",
        },
        {
          imgUrl: "/svg/dateSyrup/image05.svg",
          benefits: "Anti-Oxidant",
        },
      ],
      anotherBenefits: [
        {
          imgUrl: "/svg/dateSyrup/image06.svg",
          benefits: "100% Natural",
        },
        {
          imgUrl: "/svg/dateSyrup/image07.svg",
          benefits: "No Added Sugar",
        },
      ],
      delivery_info:
        "Order will be delivered in 2-7 working days from the order date.",
    },
  },
];
