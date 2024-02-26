"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../../../../components/button/Button";
import InputField from "../../../../components/input-field/input-field";
import { useUser } from "@/components/Providers/user-provider";
import { logoutAction } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";

const MyAccount = () => {
  const [menu, setMenu] = useState("Profile");
  const { user, dispatch } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    await logoutAction();
    router.replace("/");
  };
  return (
    <>
      <div className="md:p-20 md:pt-10 overflow-hidden">
        <h2 className="text-primary-500 text-4xl text-center tracking-wide mt-4 mb-6">
          {menu === "Logout" ? "My account" : menu}
        </h2>
        <div className="flex gap-20 items-start flex-col md:flex-row">
          <div className="bg-[#F0E5DB] w-full md:w-[286px] sticky top-0 p-4 rounded-md flex-none">
            <div className="relative w-fit">
              <Image
                src={"/profile.png"}
                alt="profile"
                width={60}
                height={60}
              />
              <Image
                src={"/camera.png"}
                alt="profile"
                width={60}
                height={60}
                className="absolute left-4 top-6"
              />
            </div>
            <div className="mt-8 grid gap-4">
              {sidebarArray?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className={`pb-2 cursor-pointer ${
                      menu === value.value
                        ? "text-primary-500 border-b-2 border-primary-500"
                        : "text-black-600"
                    }`}
                    onClick={() => {
                      setMenu(value.value);
                    }}
                  >
                    {value.value}
                  </div>
                );
              })}
            </div>
          </div>
          {menu === "Profile" && (
            <div className="w-full p-6 md:p-0">
              <div className="w-[800px]">
                <div className="flex items-center gap-4">
                  <div>
                    <Image
                      src={"/profile.png"}
                      alt="profile"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-2xl mb-2">Alex Carder</h3>
                    <div className="flex">
                      <Image
                        src={"/location.png"}
                        alt="location"
                        width={20}
                        height={20}
                      />
                      <span className="text-light-500">New York, USA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mt-8">
                    <div className="flex gap-2 items-center w-full">
                      <div>
                        <Image
                          src={"/phone.png"}
                          alt="phone"
                          width={36}
                          height={36}
                        />
                      </div>
                      <div className="leading-none w-full">
                        <label
                          htmlFor="phone"
                          className="text-light-500 text-xs font-semibold block"
                        >
                          Phone number
                        </label>{" "}
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          // value={"+0 1234567891"}
                          placeholder="+0 1234567891"
                          className="outline-none px-2 text-xs font-semibold pl-0 w-full"
                        />
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <Image
                        src={"/right-arrow.png"}
                        alt="copy"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <div className="flex gap-2 items-center">
                      <div>
                        <Image
                          src={"/phone.png"}
                          alt="phone"
                          width={36}
                          height={36}
                        />
                      </div>
                      <div className="leading-none">
                        <label
                          htmlFor="phone"
                          className="text-light-500 text-xs font-semibold block"
                        >
                          Email
                        </label>{" "}
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={"user@saliahdates.com"}
                          className="outline-none px-2 text-xs font-semibold pl-0"
                        />
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <Image
                        src={"/copy.png"}
                        alt="copy"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full mt-12">
                  <Button
                    text="Update"
                    parentClass="!w-fit"
                    className="px-6 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="w-full">
            {menu === "Orders" && (
              <div>
                <div className="grid grid-cols-6 mb-12 text-xs">
                  {orderTableHeading?.map((heading, index) => {
                    return (
                      <div key={index} className="font-semibold">
                        {heading.heading}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {orderTableData?.map((data, ind) => {
                    return (
                      <div
                        key={ind}
                        className="grid grid-cols-6 py-4 border-b-2 items-center text-xs pl-2 pr-6"
                      >
                        <div>
                          <Image
                            src={data.imageUrl}
                            alt="product"
                            width={90}
                            height={64}
                          />
                        </div>
                        <div className="ml-2">{data.productName}</div>
                        <div>{data.orderDate}</div>
                        <div>{data.price}</div>
                        <div>{data.status}</div>
                        <div className="px-6 py-2 bg-[#F7F2ED] w-fit text-primary-500 rounded-md cursor-pointer">
                          Track
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {menu === "Addresses" && (
              <div className="text-xs flex flex-col">
                <Button
                  plusIcon={true}
                  text="ADD A NEW ADDRESS"
                  className="!bg-transparent text-primary-500 border border-primary-500 ml-6 md:ml-0 mb-10 md:w-full rounded-md !px-4"
                />
                <div className="grid gap-8  grid-cols-1 px-6 md:px-0 md:grid-cols-2 mt-8">
                  <div className="border-2 p-6 rounded-md">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">Billing address</h3>
                      <div className="flex gap-2 cursor-pointer">
                        <Image
                          src={"/edit.png"}
                          alt="edit"
                          width={20}
                          height={20}
                          className="!w-[20px] !h-[20px]"
                        />
                        <span className="font-semibold">Edit</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div>Jill Dower</div>
                      <div>Nayzak Design</div>
                      <div>10 Strudwick CourtLondonSW4 6TE</div>
                      <div>United Kingdom (UK)</div>
                    </div>
                  </div>
                  <div className="border-2 p-6 rounded-md">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">Shipping address</h3>
                      <div className="flex gap-2 cursor-pointer">
                        <Image
                          src={"/edit.png"}
                          alt="edit"
                          width={20}
                          height={20}
                          className="!w-[20px] !h-[20px]"
                        />
                        <span className="font-semibold">Edit</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div>Jill Dower</div>
                      <div>Nayzak Design</div>
                      <div>10 Strudwick CourtLondonSW4 6TE</div>
                      <div>United Kingdom (UK)</div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end my-12 pr-6 md:pr-0">
                  <Button
                    text="Update"
                    parentClass="!w-fit"
                    className="!px-8"
                  />
                </div>
              </div>
            )}
            {menu === "Account details" && (
              <div className="lex flex-col text-xs px-10 mb-10">
                <h3 className="font-semibold">Change Personal Information</h3>
                <div className="mt-6 f md:grid gap-4">
                  <InputField
                    label="Username"
                    placeholder=" Alex Carder"
                    topClass="flex items-center gap-8 font-semibold"
                    labelClass="w-[200px]"
                  />
                  <InputField
                    label="Mobile No."
                    type="number"
                    placeholder="+1 23252598"
                    topClass="flex items-center gap-8 font-semibold"
                    labelClass="w-[200px]"
                  />
                  <InputField
                    label="Email"
                    placeholder="user@saliahdates.com"
                    topClass="flex items-center gap-8 font-semibold"
                    labelClass="w-[200px]"
                  />
                </div>
                <div className="w-full flex justify-end mt-8 border-b pb-4">
                  <Button text="Done" parentClass="!w-fit" className="!px-8" />
                </div>
                <h3 className="font-semibold">Change Password</h3>
                <div className="mt-6 grid gap-4">
                  <InputField
                    label="Password"
                    type="password"
                    topClass="flex items-center gap-8 font-semibold"
                    labelClass="w-[200px]"
                  />
                  <InputField
                    label="Confirm Password "
                    type="password"
                    topClass="flex items-center gap-8 font-semibold"
                    labelClass="w-[200px]"
                  />
                </div>
                <div className="w-full flex justify-end mt-8 border-b pb-4">
                  <Button
                    text="Update "
                    parentClass="!w-fit"
                    className="!px-8"
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <div className="w-[200px]">Account actions</div>
                  <div className="grid gap-4">
                    <div
                      onClick={handleLogout}
                      className="flex gap-2 cursor-pointer w-fit"
                    >
                      <Image
                        src={"/svg/logout.svg"}
                        alt="logout"
                        width={20}
                        height={20}
                      />
                      <span className="font-semibold">Log out</span>
                    </div>
                    <div className="flex gap-2 cursor-pointer w-fit">
                      <Image
                        src={"/svg/delete.svg"}
                        alt="trash"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#E71D35] font-semibold">
                        Delete account
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {menu === "Wishlist" && (
              <>
                <div className="grid grid-cols-[10%_18%_18%_18%_18%_18%] mb-12">
                  {wishlistTableHeading?.map((heading, index) => {
                    return (
                      <div key={index} className="font-semibold text-[12px]">
                        {heading.heading}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {wishlistTableData?.map((data, ind) => {
                    return (
                      <div
                        key={ind}
                        className="grid grid-cols-[10%_18%_18%_18%_18%_18%] py-4 border-b-2 items-center text-[12px]"
                      >
                        <div className="w-fit cursor-pointer">
                          <Image
                            src={"/close.png"}
                            alt="product"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          <Image
                            src={data.imageUrl}
                            alt="product"
                            width={90}
                            height={64}
                          />
                        </div>
                        <div>{data.orderDate}</div>
                        <div>{data.price}</div>
                        <div
                          className={`${
                            data.status === "In Stock"
                              ? "text-[#1A5632]"
                              : "text-[#E71D35]"
                          }`}
                        >
                          {data.status}
                        </div>
                        <div>
                          <Button
                            text="Add to Cart"
                            cartGolden={true}
                            className="!bg-transparent text-primary-500 border border-primary-500 !px-4 text-[12px]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {menu === "Logout" && (
              <div onClick={handleLogout} className="flex gap-8 my-10 p-6">
                <div>Account actions</div>
                <div className="flex gap-2 cursor-pointer">
                  <Image
                    src={"/svg/logout.svg"}
                    alt="logout"
                    width={16}
                    height={16}
                  />
                  <span className="font-semibold">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyAccount;
const sidebarArray = [
  {
    value: "Profile",
  },
  {
    value: "Orders",
  },
  {
    value: "Addresses",
  },
  {
    value: "Account details",
  },
  {
    value: "Wishlist",
  },
  {
    value: "Logout",
  },
];
const orderTableHeading = [
  {
    heading: "Order ID",
  },
  {
    heading: "Product Name",
  },
  {
    heading: "Order Date",
  },
  {
    heading: "Price",
  },
  {
    heading: "Status",
  },
  {
    heading: "Action",
  },
];
const orderTableData = [
  {
    imageUrl: "/product-order.png",
    productName: "#98224",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Delivered ",
  },
  {
    imageUrl: "/product-order.png",
    productName: "#98224",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Delivered ",
  },
  {
    imageUrl: "/product-order.png",
    productName: "#98224",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Delivered ",
  },
  {
    imageUrl: "/product-order.png",
    productName: "#98224",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Delivered ",
  },
];
const wishlistTableHeading = [
  {
    heading: "",
  },
  {
    heading: "Product",
  },
  {
    heading: "Product Name",
  },
  {
    heading: "Price",
  },
  {
    heading: "Status",
  },
  {
    heading: "Action",
  },
];
const wishlistTableData = [
  {
    productName: "#98224",
    imageUrl: "/product-order.png",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "In Stock",
  },
  {
    productName: "#98224",
    imageUrl: "/product-order.png",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Out of Stock",
  },
  {
    productName: "#98224",
    imageUrl: "/product-order.png",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "In Stock",
  },
  {
    productName: "#98224",
    imageUrl: "/product-order.png",
    orderDate: "Black Dates",
    price: "₹220.00",
    status: "Out of Stock",
  },
];
