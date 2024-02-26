"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import Filter from "../../../../public/filter.png";
// import Vertical from "../../../public/vert.png";
// import Horizontal from "../../../public/horiz.png";
import Products from "@/app/products.json";
import Card from "@/app/products-card";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { Mulish } from "next/font/google";
import DropDownField from "../../components/dropdown/dropdown";
const mulish = Mulish({ subsets: ["latin"] });

const ProductListComponent = () => {
  const [products, setProducts] = React.useState<any>(null);
  const filteredArray: any[] = [];
  const [productsImage, setProductsImage] = React.useState<any>(null);
  const searchParams = useSearchParams();
  const [selectedProdcutCat, setSelectedProductCat] = useState("");

  React.useEffect(() => {
    setProducts(Products);
    setProductsImage(Products?.products[0].images);
  }, []);
  const [selected, setSelected] = useState(
    searchParams.get("category") || "All Categories"
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productFilter, setProductFilter] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 500]);

  const handlePriceChange = (e: number[]) => {
    setPriceRange(e);
  };
  const [sortType, setSortType] = useState("");

  const handleFilterSelected = (e: string) => {
    setSelected(e);
  };
  const handleSorting = (e: string) => {
    setSortType(e);
  };

  useEffect(() => {
    handleFilterSelected(searchParams.get("category") || "All Categories");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const filterProductsByCategory = (
    selected: any,
    sortType: any,
    priceRange: any
  ) => {
    if (selected) {
      setSelected("");
      setSelectedProductCat(selected);
      const filtered = products?.products?.filter((item: any) =>
        selected === "All Categories" ? item : item.category?.includes(selected)
      );
      setFilteredProducts(filtered);

      setPriceRange([0, 0]);
    } else if (priceRange[1]) {
      const priceRangefiltered = products?.products?.filter((item: any) =>
        item?.varient[0]?.price_range?.min_price >= priceRange[1]
          ? item?.varient?.price_range?.min_price
          : "No"
      );
      setFilteredProducts(priceRangefiltered);
    } else if (sortType === "Price - Low to High") {
      setSortType("");
      const filtered = filteredProducts?.sort((a: any, b: any) => {
        const aMinPrice = a.varient?.map(
          (item: any) => item.price_range.min_price
        );
        const bMinPrice = b.varient?.map(
          (item: any) => item.price_range.min_price
        );

        if (!aMinPrice || !bMinPrice) {
          return 0;
        }

        const numericAMinPrice = parseFloat(aMinPrice);
        const numericBMinPrice = parseFloat(bMinPrice);

        return numericAMinPrice - numericBMinPrice;
      });

      setFilteredProducts(filtered);
    } else if (sortType === "Price - High to Low") {
      setSortType("");
      const filtered = filteredProducts?.sort((a: any, b: any) => {
        const aMinPrice = b.varient?.map(
          (item: any) => item.price_range.min_price
        );
        const bMinPrice = a.varient?.map(
          (item: any) => item.price_range.min_price
        );

        if (!aMinPrice || !bMinPrice) {
          return 0;
        }

        const numericAMinPrice = parseFloat(aMinPrice);
        const numericBMinPrice = parseFloat(bMinPrice);

        return numericAMinPrice - numericBMinPrice;
      });

      setFilteredProducts(filtered);
    }
  };

  const filterOptions = [
    {
      option: "All Categories",
    },
    {
      option: "Date Syrup",
    },
    {
      option: "Dates",
    },
    {
      option: "Fusions",
    },
    {
      option: "Gift Hampers",
    },
    {
      option: "Honey",
    },
    {
      option: "Mini Bytes",
    },
    // {
    //   option: "Uncategorized",
    // },
  ];

  const lengthOfProducts = products?.products ? products?.products?.length : 0;

  const [lengths, setLengths] = useState<{
    DateSyrup: number;
    Dates: number;
    AllCategories: number;
    Fusions: number;
    GiftHampers: number;
    Honey: number;
    MiniBytes: number;
    // Uncategorized: number;
    [key: string]: number; // Index signature for dynamic keys
  }>({
    DateSyrup: 0,
    Dates: 0,
    AllCategories: 0,
    Fusions: 0,
    GiftHampers: 0,
    Honey: 0,
    MiniBytes: 0,
    // Uncategorized: 0,
  });

  const filterTotalItems = () => {
    const categories = [
      "Date Syrup",
      "Dates",
      "All Categories",
      "Fusions",
      "Gift Hampers",
      "Honey",
      "Mini Bytes",
      // "Uncategorized",
    ];

    const updatedLengths: any = {};

    categories.forEach((category) => {
      const filteredItems = products?.products?.filter(
        (item: any) => item?.category === category
      );

      updatedLengths[category] = filteredItems?.length;
    });

    setLengths(updatedLengths);
  };

  useEffect(() => {
    filterProductsByCategory(selected, sortType, priceRange);
    filterTotalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, sortType, priceRange]);
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <Image
          src={"/productsBanner.png"}
          alt="banner"
          width={1440}
          height={600}
          className="w-full h-[300px] md:h-[70vh] object-cover z-20 "
        />

        <div className="z-0 flex  flex-col absolute top-20 md:top-40 left-0 md:ml-10 px-6 text-white">
          <span className="font-semibold text-[#D2B093]">
            <span className="cursor-pointer" onClick={() => router.push("/")}>
              Home &nbsp;
            </span>
            {">"} &nbsp;
            <span
              className="cursor-pointer"
              onClick={() => router.push("/product-list")}
            >
              Shop
            </span>
          </span>
          <span className="text-4xl md:text-7xl md:my-6 text-[#B68050] my-3">
            ALL PRODUCTS
          </span>
          <span className="text-lg md:w-[600px] font-semibold text-[#C3966F]">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis voluptatum deleniti.
          </span>
        </div>
      </div>

      <div
        className={`flex  gap-4 px-5 md:px-20 py-8 z-50 bg-[url('/net.png')] bg-contain ${mulish.className}`}
      >
        {productFilter ? (
          <div className="fixed md:sticky top-0 left-0 h-screen md:h-fit w-[80vw] md:w-[288px] bg-primary-100 px-4 rounded-md font-sans bg-white z-[2]">
            <div className="flex justify-between py-4 pb-6">
              <h3 className="text-xl">Filter </h3>
              <Image
                src={"/close.png"}
                alt="close"
                width={24}
                height={24}
                onClick={() => setProductFilter(!productFilter)}
                className="cursor-pointer md:hidden"
              />
            </div>
            <div className="pb-2">
              <h3 className="font-semibold mb-4">CATEGORIES</h3>
              {filterOptions?.map((value, index) => {
                const length = lengths[value.option];

                return (
                  <p
                    key={index}
                    className={`mb-2 font-semibold cursor-pointer ${
                      selectedProdcutCat === value.option
                        ? "text-primary-500 border-b border-primary-500 w-fit"
                        : "text-light-500"
                    }`}
                    onClick={() => {
                      router.push(`/product-list?category=${value.option}`, {
                        scroll: false,
                      });
                      handleFilterSelected(value.option);
                    }}
                  >
                    {value.option} (
                    {value.option === "All Categories"
                      ? //  ||
                        // value.option === "Uncategorized"
                        lengthOfProducts
                      : length}
                    )
                  </p>
                );
              })}
            </div>
            <div>
              <h3 className="text-primary-500">PRICE</h3>
              <div>
                <div className="my-8">
                  <label className="text-lg font-bold mb-2 block">
                    Price Range:
                  </label>
                  {/* <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full"
                    /> */}
                  <div className="h-4">
                    <Slider
                      className="h-4"
                      range
                      defaultValue={[0, 499]}
                      min={0}
                      max={500}
                      onChange={(e) => handlePriceChange(e as number[])}
                      styles={{
                        rail: {
                          background: "white",
                          borderRadius: "10px",
                        },
                        track: {
                          background: "#b68050",
                        },
                        handle: {
                          width: "20px",
                          height: "20px",
                          border: "none",
                          background: "#b68050",
                          opacity: 1,
                          transform: "translateX(-50%) translateY(-3px)",
                        },
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-center py-2 w-full">
                    <span>₹{priceRange[0]}</span> -
                    <span> ₹{priceRange[1] || "500"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="w-full">
          <div className=" md:mb-10 mb-4 md:mb-0 md:flex md:flex-row flex-col justify-between mr-8">
            <div className=" relative z-[1]">
              <DropDownField
                onChange={(e: any) => handleSorting(e.target.value)}
                className="w-[200px]"
                collection={sortbyCollection}
                label="Sort by:"
              />
            </div>
            <div className="md:flex gap-2 hidden  text-light-500 my-4 md:my-0 items-center">
              <div className="flex-none">
                <Image src={"/home.png"} alt="home" width={18} height={18} />
              </div>
              <span onClick={() => router.push("/")} className="cursor-pointer">
                Home
              </span>
              <span>&gt;</span>
              <span
                className="cursor-pointer"
                onClick={() => router.push("/product-list")}
              >
                Categories
              </span>
              {/* <span>&gt;</span> */}
              {/* <span className="text-success-green-900">Categories</span> */}
            </div>
          </div>
          <div className="flex md:hidden justify-between border-b-2 border-[#E1CBB7] pb-6">
            <span>{lengthOfProducts} Products</span>
            <span className="border-b-[1px] border-black">Sort by</span>
          </div>
          <div className="mt-6 md:hidden flex justify-between">
            <span
              onClick={() => setProductFilter(!productFilter)}
              className="font-semibold text-xl flex items-center gap-2"
            >
              Filter
              <Image
                src={"/filter.png"}
                alt="ajwa"
                width={88}
                height={88}
                className="w-[20px]"
              />
            </span>
            <span className="flex items-center">
              <Image
                src={"/vert.png"}
                alt="ajwa"
                width={88}
                height={88}
                className="w-[40px]"
                onClick={() => setProductFilter(!productFilter)}
              />
              <Image
                src={"/horiz.png"}
                alt="ajwa"
                width={88}
                height={88}
                className="w-[40px]"
                onClick={() => setProductFilter(!productFilter)}
              />
            </span>
          </div>
          <div>
            <Card
              productsImage={productsImage}
              filteredProducts={filteredProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductListComponent;

const sortbyCollection = [
  {
    option: "Default",
  },
  {
    option: "Price - Low to High",
  },
  {
    option: "Price - High to Low",
  },
];
