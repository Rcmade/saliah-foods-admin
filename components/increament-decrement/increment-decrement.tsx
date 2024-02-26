"use client";
import { useReducer } from "react";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return { state };
  }
}
interface data{
  quantity?:number;
}
const IncrementDecrementButton = ({quantity}:data) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function decrement() {
    dispatch({ type: "decrement" });
  }
  function increment() {
    dispatch({ type: "increment" });
  }
  return (
    <>
      <div className="flex gap-2 items-center w-[100px] border border-[#e5e5e9] px-2 py-[8px] bg-white rounded-full">
        <button
          className="text-2xl w-6 h-6 flex items-center justify-center bg-[#e5e5e5] rounded-full"
          onClick={decrement}
        >
          -
        </button>
        <span className="text-md w-4">{quantity||state.count}</span>
        <button
          className="text-2xl w-6 h-6 flex items-center justify-center bg-[#e5e5e5] rounded-full"
          onClick={increment}
        >
          +
        </button>
      </div>
    </>
  );
};
export default IncrementDecrementButton;
