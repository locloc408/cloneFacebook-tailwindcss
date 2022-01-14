import React, { ForwardedRef } from "react";

export const StoryResponse = ({
  callback,
  isFocus,
  ref,
}: {
  callback: (isFocus: boolean) => void;
  isFocus: boolean;
  ref: ForwardedRef<HTMLDivElement>;
}) => {
  return (
    <div
      className="rounded-full border border-white flex space-x-2 z-5 justify-between"
      style={{ width: isFocus === true ? "680px" : "300px", height: "40px" }}
      ref={ref}
    >
      <input
        placeholder="Trả lời ..."
        className="placeholder-white bg-black focus:ring-transparent focus:outline-none text-white ml-5 w-full"
        onFocus={() => {
          callback(true);
        }}
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};
