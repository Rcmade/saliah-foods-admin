import Image from "next/image";
import Button from "../../../components/button/Button";
import InputField from "../../../components/input-field/input-field";
import InputTextarea from "../../../components/text-area/text-area";
import Link from "next/link";
import FaqSection from "../../../components/faq/faq-section";

const ContactUs = () => {
  return (
    <>
      <div className="w-full">
        {/* ********** Contact form & From Farm to Your Soul ******** */}

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 p-6 md:p-20 gap-6 md:gap-20 bg-[url('/net.png')] bg-contain">
          <div>
            <form action="">
              <InputField
                label="Full name"
                placeholder="Your first name"
                className="mb-4"
              />
              <InputField
                label="Email address"
                placeholder="Your email address"
                className="mb-4"
              />
              <InputTextarea
                label="Message"
                placeholder="Type your message"
                className="mb-4"
              />
              <Button
                text="Send Message"
                className="px-[7em] md:px-4 mx-auto md:mx-0"
              />
            </form>
          </div>
          <div>
            <div className="flex items-center justify-center mr-6 gap-8 mb-8">
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={8}
                className="hidden md:block"
              />
              <h2 className="text-primary-500 text-3xl md:text-5xl tracking-wide text-center">
                From Farm to <br /> Your Soul
              </h2>
              <Image
                src={"/story/zigzag.png"}
                alt="zigzag"
                width={40}
                height={8}
                className="hidden md:block"
              />
            </div>
            <div className="text-light-500 grid gap-4">
              <p>
                Saliah introduce a wide range of dates to the Indian
                Market.Saliah Dates Nursery grows and harvests about 35
                different varieties of delicious dates and supplies more than
                1800 acres of date palm plants in India.
              </p>
              <p>
                We are committed to providing our consumers with the best
                products available, upholding the highest standards of quality
                and flavour in all items.
              </p>
              <p>
                In order to provide the finest possible customer service, we
                have teamed up with a group of experts who are highly competent
                and have accumulated a lot of experience in their field of
                specialisation.
              </p>
              <div>
                <h3 className="text-primary-500">Connect with us</h3>
                <div className="flex gap-2 mt-2">
                  <Image
                    src={"/facebook.png"}
                    alt="facebook"
                    width={32}
                    height={32}
                  />
                  <Image
                    src={"/instagram.png"}
                    alt="instagram"
                    width={32}
                    height={32}
                  />
                  <Image
                    src={"/youtube.png"}
                    alt="youtube"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ******* Contact Information ******* */}

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center text-center p-6 md:p-20 text-primary-500 gap-4 bg-primary-50">
          <div className="mb-8 md:mb-0">
            <div className="w-[40px] h-[40px] bg-primary-200 rounded-full flex justify-center m-auto mb-4">
              <Image
                src={"/svg/location.svg"}
                alt="location"
                width={24}
                height={24}
              />
            </div>
            <h3>ADDRESS</h3>
            <p className="text-sm">
              Krishnapuram (Po), Dharmapuri (Taluk) <br /> 635202, Tamilnadu,
              India.
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <div className="w-[40px] h-[40px] bg-primary-200 rounded-full flex justify-center m-auto mb-4">
              <Image
                src={"/svg/phone.svg"}
                alt="phone"
                width={24}
                height={24}
              />
            </div>
            <h3>CONTACT NUMBER</h3>
            <Link href={"tel:+91 63837574614"} className="text-sm block mb-2">
              +91 63837574614
            </Link>{" "}
            <Link href={"tel:1(800)9755304"} className="text-sm block">
              1 (800) 975-5304
            </Link>
          </div>
          <div>
            <div className="w-[40px] h-[40px] bg-primary-200 rounded-full flex justify-center m-auto mb-4">
              <Image
                src={"/svg/envelope.svg"}
                alt="env"
                width={24}
                height={24}
              />
            </div>
            <h3>EMAIL US</h3>
            <Link
              href={"mailto:consumer@saliahdates.com"}
              className="text-sm block"
            >
              consumer@saliahdates.com
            </Link>
          </div>
        </div>

        <FaqSection />
      </div>
    </>
  );
};
export default ContactUs;
