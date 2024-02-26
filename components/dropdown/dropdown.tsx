import Image from "next/image";

interface dropdownProp {
  label?: string;
  collection?: any;
  className?: string;
  dropDown?: string;
  value ?: string,
  onChange ?: any
}
const DropDownField = ({
  label,
  collection,
  className,
  dropDown,
  value,
  onChange
}: dropdownProp) => {
  return (
    <>
      <div className="relative w-full">
        <label htmlFor="sortby" className="mr-2 text-light-500">
          {label}
        </label>
        <select
          name="sortby"
          id="sortby"
          value={value}
          onChange={onChange}
          className={`px-2 py-2 border border-[#C2BDB9] outline-none rounded-md appearance-none w-[170px] z-[9] relative bg-transparent ${className}`}
        >
          {collection?.map((value: any, index: number) => {
            return (
              <option value={value.option} id={value.option} key={index}>
                {value.option}
              </option>
            );
          })}
        </select>
        <Image
          src={"/svg/dropdown.svg"}
          alt="dropdown"
          width={24}
          height={24}
          className={`absolute right-2 top-2 ${dropDown}`}
        />
      </div>
    </>
  );
};
export default DropDownField;
