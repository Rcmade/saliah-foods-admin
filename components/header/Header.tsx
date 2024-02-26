"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import Menu from "../../public/menu.png";
import Cross from "../../public/cross.png";
import { ActionTypes, useCart } from "@/app/cart";
import React from "react";
import { useUser } from "@/components/Providers/user-provider";
import { logoutAction } from "@/lib/actions/user-actions";
import { Mulish } from "next/font/google";
import { LayoutDashboard } from "lucide-react";
const mulish = Mulish({ subsets: ["latin"] });
const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useCart();
  const { user, dispatch } = useUser();
  console.log(user)

  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const checkout = () => {
    router.push("/checkout");
    toggleSidebar();
  };
  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderChange = (event: any) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const disableScroll = (e: any) => {
      e.preventDefault();
    };
    document.body.addEventListener("scroll", disableScroll, { passive: false });
    return () => {
      document.body.removeEventListener("scroll", disableScroll);
    };
  }, []);

  const { cartState, cartDispatch } = useCart();

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

  const productPage = () => {
    router.push("/product-list");
    toggleSidebar();
  };

  function redirect() {
    router.push("/login");
    setMenu(false);
  }

  return (
    <>
      <div
        className={`flex  relative justify-between bg-[#1A5632] text-primary-500 items-center py-4 px-4 sm:px-16 md:px-20 ${mulish.className}`}
      >
        <div className="md:flex gap-8 text-[1.25rem] hidden">
          {/* <div
            className="cursor-pointer"
            onClick={() => router.push("/our-story")}
          >
            OUR STORY
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/product-list")}
          >
            SHOP
          </div> */}

        </div>


        <div>
          <Image
            src="/svg/logo.svg"
            alt="logo"
            width={140}
            height={140}
            className="w-[120px] md:mr-44  md:w-[200px] h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex gap-8 text-sm items-center">

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <Link href="/admin/dashboard" className="flex gap-4 text-[1.25rem]">
              <LayoutDashboard /> <span>Dashboard</span>
            </Link>

          </div>
        </div>
      </div>

    </>
  );
};
export default Header;
const cartCollection = [
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
];
