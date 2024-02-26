import Image from "next/image";

interface buttonProps {
  text?: string;
  onClick?: any;
  className?: string;
  parentClass?: string;
  cartIcon?: boolean;
  rightArrow?: boolean;
  arrowBack?: boolean;
  couponSvg?: boolean;
  plusIcon?: boolean;
  cartGolden?: boolean;
}
const Button = ({
  text,
  onClick,
  className,
  parentClass="",
  rightArrow,
  cartIcon,
  arrowBack,
  couponSvg,
  plusIcon,
  cartGolden,
}: buttonProps) => {
  return (
    <>
      <div className={`w-full my-2 ${parentClass}`}>
        <button
          onClick={onClick}
          className={`bg-primary-500 text-white py-[10px] px-4 md:px-6 rounded-full flex items-center md:text-[16px] text-[12px] gap-2 ${className}`}
        >
          {couponSvg && (
            <Image src={"/Coupon.png"} alt="cart" width={20} height={20} />
          )}
          {arrowBack && (
            <Image
              src={"/svg/arrowLeft.svg"}
              alt="cart"
              width={16}
              height={16}
            />
          )}
          {plusIcon && (
            <Image src={"/svg/addIcon.svg"} alt="add" width={20} height={20} />
          )}
          {text}{" "}
          {cartIcon && (
            <Image src={"/svg/cartBag.svg"} alt="cart" width={16} height={16} />
          )}
          {cartGolden && (
            <Image
              src={"/svg/cartGolden.svg"}
              alt="cart"
              width={16}
              height={16}
            />
          )}
          {rightArrow && (
            <Image
              src={"/svg/arrow-right.svg"}
              alt="cart"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>
    </>
  );
};
export default Button;
