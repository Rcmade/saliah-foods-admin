import Image from "next/image";

const RatingStar = () => {
  return (
    <>
      <div className="flex">
        {starCollection?.map((value, index) => {
          return (
            <Image
              src={value.imgUrl}
              alt="star"
              width={18}
              height={18}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
export default RatingStar;
const starCollection = [
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
];
