"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";

const Testimonials = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const defaultReview =
    "Provided excellent recommendations, made my trip memorable. Highly recommend!";
  //   const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <p className="md:text-4xl md:px-8 md:my-12 my-6">
        “{testimonialData[current]?.review || defaultReview}”
      </p>
      <Carousel
        setApi={(e) => setApi(e)}
        className="  max-w-[300px] m-auto flex gap-6 items-center"
      >
        <CarouselContent>
          {testimonialData.map((item) => (
            <CarouselItem key={item.name}>
              <div className="flex gap-2 justify-center">
                <div>
                  <Image
                    src={"/reviewUser.png"}
                    alt="previous"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <h3 className="text-primary-500 text-xl">{item.name}</h3>
                  <span className="text-light-500 text-sm">{item.role}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent justify-end border-none hover:bg-transparent">
          <Image
            src={"/svg/doubleArrow-left.svg"}
            alt="previous"
            width={25}
            height={31}
            className="cursor-pointer"
          />
        </CarouselPrevious>
        <CarouselNext className="bg-transparent justify-end border-none hover:bg-transparent">
          <Image
            src={"/svg/doubleArrow-right.svg"}
            alt="next"
            width={25}
            height={31}
            className="cursor-pointer"
          />{" "}
        </CarouselNext>
      </Carousel>
    </>
  );
};

export default Testimonials;

const testimonialData = [
  {
    name: "Camelia Harrington",
    role: "Hotel Client",
    review:
      "This guy is a true professional and very experienced in migration and server configuration. He was able to complete my order on time and as per the agreed scope. Highly recommend!",
  },
  {
    name: "John Smith",
    role: "Travel Enthusiast",
    review:
      "This guy is a true professional and very experienced in travel planning. He provided excellent recommendations and made my trip memorable. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    role: "Vacation Planner",
    review:
      "Emily is an exceptional vacation planner. She understood our preferences perfectly and curated an amazing itinerary. Everything went smoothly. Highly recommend!",
  },
  {
    name: "Michael Johnson",
    role: "Resort Visitor",
    review:
      "Michael is a fantastic host. He ensured our stay was comfortable and enjoyable. The resort facilities were top-notch. Will definitely come back!",
  },
];
