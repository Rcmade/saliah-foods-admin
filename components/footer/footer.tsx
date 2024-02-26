"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mulish } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"] });
const Footer = () => {
  const router = useRouter();
  const [footerLink, setFooterLink] = useState("");
  {
    footerLink === "Contact Us" ? router.push("/contact-us") : "";
    footerLink === "Our Story" ? router.push("/our-story") : "";
    footerLink === "Privacy policy" ? router.push("/privacy-policy") : "";
    footerLink === "Return policy" ? router.push("/return-policy") : "";
    footerLink === "Terms & conditions"
      ? router.push("/terms-and-conditions")
      : "";
    footerLink === "Cancellation policy"
      ? router.push("/cacellation-policy")
      : "";
    footerLink === "Security" ? router.push("/security") : "";
    footerLink === "Payment" ? router.push("/payment-policy") : "";
    footerLink === "Shipping" ? router.push("/shipping-policy") : "";

    footerLink === "Date Syrup" ? router.push("/product-list") : "";
    footerLink === "Dates" ? router.push("/product-list") : "";
    footerLink === "Fusions" ? router.push("/product-list") : "";
    footerLink === "Honey" ? router.push("/product-list") : "";
    footerLink === "Mini Bytes" ? router.push("/product-list") : "";
    footerLink === "Gift Hamper" ? router.push("/product-list") : "";
  }
  return (
    <>
      <div
        className={`bg-secondary p-4 md:p-20 md:pt-0 md:pb-0 pt-8 pb-0 ${mulish.className} `}
      >
        <div className="md:grid md:grid-cols-2 flex flex-col md:pb-20 pb-8">
          <div className="grid gap-6 md:mt-16">
            <Image
              src={"/svg/logo.svg"}
              alt="previous"
              width={138}
              height={55}
            />
            <p className="text-primary-200 ">
              Krishnapuram (Po) Ariyakulam (Vill), Dharmapuri <br />{" "}
              (Taluk)Krishnapuram, Dharmapuri, 635202,Tamilnadu, India.
            </p>
            <div className="text-primary-200">
              <Link href={"#"}>consumer@saliahdates.com</Link>
              <Link href={"#"}>1 (800) 975-5304</Link>
            </div>
            <div className="text-white hidden md:flex  md:flex-row gap-6 w-fit ">
              <div>
                <Link
                  href={"https://www.facebook.com/saliahdates"}
                  target="_blank"
                  className=" border-[#B68050] h-fit pb-2"
                >
                  <div className=" border-[#B68050] border-b-[1.5px] h-fit pb-1 mb-1">
                    Facebook
                  </div>
                </Link>
                <span className="border-b-[1.5px] border-[#B68050] h-fit block mt-[2px]"></span>
              </div>
              <div>
                <Link
                  href={"https://www.instagram.com/saliahdates/"}
                  className=" border-[#B68050] border-b-[1.5px] h-fit pb-2"
                >
                  <div className=" border-[#B68050] border-b-[1.5px] h-fit pb-1 mb-1">
                    Instagram
                  </div>
                </Link>
                <span className="border-b-[1.5px] border-[#B68050] h-fit block mt-[2px]"></span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 md:mt-20 mt-10">
            {footerCollection?.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className="text-[#B68050] mb-6">{item.heading}</h3>
                  {item?.footerMenu.map((value, ind) => {
                    return (
                      <ul className="text-primary-200" key={ind}>
                        <li
                          className="mb-4"
                          onClick={() => setFooterLink(value.link)}
                        >
                          <Link href={"#"}>{value.link}</Link>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="text-white flex md:flex-col gap-6 md:hidden">
            <div>
              <Link
                href={"https://www.facebook.com/saliahdates"}
                target="_blank"
                className=" border-[#B68050] h-fit pb-2"
              >
                <div className=" border-[#B68050] border-b-[1.5px] h-fit pb-1 mb-1">
                  Facebook
                </div>
              </Link>
              <span className="border-b-[1.5px] border-[#B68050] h-fit block mt-[2px]"></span>
            </div>
            <div>
              <Link
                href={"https://www.instagram.com/saliahdates/"}
                className=" border-[#B68050] border-b-[1.5px] h-fit pb-2"
              >
                <div className=" border-[#B68050] border-b-[1.5px] h-fit pb-1 mb-1">
                  Instagram
                </div>
              </Link>
              <span className="border-b-[1.5px] border-[#B68050] h-fit block mt-[2px]"></span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-primary-200 py-6 border-t border-[#B68050]">
            © 2024 saliahfoods , All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};
export default Footer;
const footerCollection = [
  {
    heading: "PRODUCTS",
    footerMenu: [
      {
        link: "Date Syrup",
      },
      {
        link: "Dates",
      },
      {
        link: "Fusions",
      },
      {
        link: "Honey",
      },
      {
        link: "Mini Bytes",
      },
      {
        link: "Gift Hamper",
      },
    ],
  },
  {
    heading: "POLICY",
    footerMenu: [
      {
        link: "Privacy policy",
      },
      {
        link: "Return policy",
      },
      {
        link: "Terms & conditions",
      },
      {
        link: "Cancellation policy",
      },
      {
        link: "Security",
      },
      {
        link: "Payment",
      },
      {
        link: "Shipping",
      },
    ],
  },
  {
    heading: "COMPANY",
    footerMenu: [
      {
        link: "Our Story",
      },
      {
        link: "Contact Us",
      },
    ],
  },
];
