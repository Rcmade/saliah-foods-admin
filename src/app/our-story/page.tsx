import Image from "next/image";
import Button from "../../../components/button/Button";

const OurStory = () => {
  return (
    <>
      <div className="w-full ">
        {/* ************** hero section image *********** */}
        <Image
          src={"/story/story-banner.png"}
          alt="banner"
          width={1850}
          height={1000}
          className="w-full"
        />

        {/* ************** OUR STORY *********** */}

        <div className="text-center bg-no-repeat px-4 md:max-w-full md:m-auto py-10 md:py-20 bg-cover bg-[url('/story-background.png')] w-[100vw] flex flex-col justify-center items-center">
          <div className="md:max-w-[800px] md:mt-12">
            <h2 className="md:text-4xl text-2xl md:text-6xl text-primary-500 tracking-wide">
              OUR STORY
            </h2>
            <Image
              src={"/story/company-details.png"}
              alt="banner"
              width={250}
              height={150}
              className="md:m-auto mx-auto md:my-12 my-4"
            />
            <div className="grid md:gap-6 gap-2 text-justify text-primary-800">
              <p>
                Our story began over three decades ago, among lush date farms in
                Saudi Arabia. I spent years across fields, growing and
                cultivating prized dates. My dream was to bring date cultivation
                back home to the fertile soils of India. Since 1992, I began to
                realise my vision.
              </p>
              <p>
                I was the first farmer to start a full-fledged date palm
                plantation in South India. At Saliah Dates®, we have firm roots
                supporting farmers and harvest gardens of splendour.
              </p>
              <p>
                Today, we carry sun-ripened Arabian and local date varieties,
                bursting with nutrients and goodness. Dates are a superfood that
                spans across cultures and traditions. Discover our delightful
                collection, one date at a time.
              </p>
              <Image
                src={"/story/founder.png"}
                alt="founder"
                width={300}
                height={150}
                className="m-auto mt-4"
              />
            </div>
          </div>
        </div>

        {/* ******** QUALITY IN OUR ROOTS ********** */}

        <div className="bg-primary-100 py-10 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:gap-8 gap-2 m-auto md:w-fit">
            <div>
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={9}
              />
            </div>
            <h2 className="text-primary-500 text-xl md:text-4xl">
              QUALITY IN OUR ROOTS
            </h2>
            <div>
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={9}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 md:px-20 md:my-12 mt-6 mb-4">
            <div>
              <Image
                src={"/story/video.png"}
                alt="video"
                width={601}
                height={543}
              />
            </div>
            <div>
              {qualityCollection?.map((value, index) => (
                <div key={index} className="md:mb-8 mb-2">
                  <div className="flex gap-2 items-center text-primary-500 font-semibold text-md py-2 border-b-2 border-[#E1CBB7]">
                    <div>
                      <Image
                        src="/story/Wish.png"
                        alt="wish"
                        width={18}
                        height={18}
                      />
                    </div>
                    <h3>{value.heading}</h3>
                  </div>
                  <p>{value.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ************* NO CARBON ************** */}

        <div className="bg-secondary grid grid-cols-1 md:grid-cols-3  text-center items-center justify-center md:py-20 py-10 px-4 md:px-30">
          {gridCollection?.map((item, ind) => (
            <div
              key={ind}
              className="flex flex-col justify-center items-center mb-8 md:mb-0 md:flex-row"
            >
              <div className="md:mb-6 mb-2">
                <Image
                  src={item.imageUrl}
                  alt={item.desc}
                  width={100}
                  height={100}
                  className="m-auto"
                />
              </div>
              <div className="text-primary-500 tracking-wide md:ml-4">
                <span className="mb-4">{item.content1}</span> <br />
                <span>{item.content2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ********** SALIAH FOODS ********** */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 pb-6 md:py-20  items-center bg-[url('/mountain.png')] bg-contain">
          <div className="hidden md:block">
            <Image
              src={"/honey.png"}
              alt="honey"
              width={494}
              height={544}
              className="m-auto"
            />
          </div>
          <div className="md:pr-20">
            <div className="flex flex-col md:flex-row items-center justify-center md:mr-6 md:gap-8">
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={8}
                className="mb-4 hidden md:block md:mb-0 md:mr-2"
              />
              <h2 className="text-primary-500 text-3xl md:text-5xl tracking-wide text-center md:text-left">
                SALIAH FOODS
              </h2>
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={8}
                className="mb-4 hidden md:block md:mb-0 md:ml-2"
              />
            </div>
            <p className="md:my-6 my-2 md:mx-0 mx-2 text-light-500 text-center md:text-left">
              Our story began over three decades ago, among lush date farms in
              Saudi Arabia. I spent years across fields, growing and cultivating
              prized dates. My dream was to bring date cultivation back home to
              the fertile soils of India. Since 1992, I began to realize my
              vision.
            </p>

            <div className="block m-auto w-[85%] md:hidden rounded mb-6">
              <Image
                src={"/honey.png"}
                alt="honey"
                width={494}
                height={544}
                className="m-auto rounded-xl"
              />
            </div>

            <div className="grid px-6 grid-cols-1 md:grid-cols-2">
              <div className="md:pr-4">
                <h3 className="border-b-2 border-[#B68050] md:w-fit w-full text-2xl pb-4 text-primary-500">
                  Our Mission
                </h3>
                <p className="mt-4 text-light-500">
                  To introduce different ranges of date products to the Indian
                  market
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <h3 className="border-b-2 border-[#B68050] md:w-fit w-full text-2xl pb-4 text-primary-500">
                  Our Vision
                </h3>
                <p className="mt-4 text-light-500">
                  To provide healthy and nutritious food to consumers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ******** About Saliah dates ******** */}

        <div className="p-6 md:p-20 bg-[url('/net.png')] bg-contain">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-8 mb-8">
            <Image
              src={"/story/zigzag.png"}
              alt="zigzag"
              width={40}
              height={8}
              className="mb-4 hidden md:block md:mb-0 md:mr-2"
            />
            <h2 className="text-primary-500 text-3xl md:text-5xl tracking-wide text-center md:text-left">
              About Saliah dates
            </h2>
            <Image
              src={"/story/zigzag.png"}
              alt="zigzag"
              width={40}
              height={8}
              className="mb-4 hidden md:block md:mb-0 md:ml-2"
            />
          </div>
          <div className="mt-8 md:mt-0 md:hidden block mb-2">
            <Image
              src={"/datesFarm.png"}
              alt="datesTree"
              width={604}
              height={546}
              className="m-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex md:items-center gap-4">
                <Image
                  src={"/arabiya.png"}
                  alt="arabiya"
                  width={97}
                  height={97}
                  className="flex-none"
                />
                <h3 className="text-lg md:text-2xl tracking-wide text-primary-500">
                  Saliah Dates Farm Was Featured in 2018 by Leading Regional
                  News Channel, Al Arabiya English TV.
                </h3>
              </div>
              <p className="my-4 text-light-500">
                In India, there is a presumption that good, juicy dates are
                procured only in the Gulf Cooperation Council (GCC) countries,
                little do we know that similar quality dates can be grown in
                India too.
              </p>
              <p className="mb-4 text-light-500">
                Though the Kutch region in Gujarat and Rajasthan are two major
                date-growing states, with Gujarat alone home to 2 million date
                palm trees, Tamil Nadu in south India is fast catching up.
              </p>
              <Button text="Saliah Dates" className="px-4" />
            </div>
            <div className="mt-8 md:mt-0 md:block hidden">
              <Image
                src={"/datesFarm.png"}
                alt="datesTree"
                width={604}
                height={546}
                className="m-auto"
              />
            </div>
          </div>
        </div>

        {/* ******** Download Our Product Catalogue **** */}
        <div className="flex flex-col md:flex-row justify-between px-4 md:px-20 py-6 md:py-14 bg-[url('/mountain-strip.png')] bg-contain border-t border-[#fff]">
          <div className="mb-4 md:mb-0 md:flex md:items-center md:gap-4">
            <div className="w-[40px] h-[40px] rounded-full bg-primary-500 flex justify-center cursor-pointer mb-2 md:mb-0 mx-auto md:mx-0">
              <Image
                src={"/svg/download.svg"}
                alt="download"
                width={18}
                height={18}
              />
            </div>
            <h3 className="text-primary-500 text-base md:text-xl text-center md:text-left">
              Download Our Product Catalogue
            </h3>
          </div>
          <div className="mx-auto md:mx-0">
            <Button text="Download" className="px-4" />
          </div>
        </div>
      </div>
    </>
  );
};
export default OurStory;
const qualityCollection = [
  {
    heading: "Quality Products",
    content:
      "We believe in serving our customers the best possible products, bringing out the highest standard of quality and taste of our products that are manufactured by our professional group of employees.",
  },
  {
    heading: "Excellent Customer Services",
    content:
      "To achieve the best customer service possible, we have associated with a group of professionals that are very skilled and have obtained many years of experience in their field of work.",
  },
  {
    heading: "Competitive Pricing",
    content:
      "We have developed a reputation in keeping our prices competitive without sacrificing the highest standards of product and quality.",
  },
];
const gridCollection = [
  {
    imageUrl: "/svg/co2.svg",
    desc: "co2",
    content1: "NO CARBON",
    content2: "FOOT PRINT",
  },
  {
    imageUrl: "/svg/support.svg",
    desc: "support",

    content1: "SUPPORTING",
    content2: "LOCAL COMMUNITIES",
  },
  {
    imageUrl: "/svg/yield.svg",
    desc: "yield",

    content1: "ALWAYS",
    content2: "FRESH YIELD",
  },
];
