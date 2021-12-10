import React, { FC } from "react";

export const IconButton = ({ Icon, bg }: { Icon: FC; bg: boolean }) => {
  return (
    <button
      className={
        "rounded-full hover:bg-gray-200 w-8 h-8 flex justify-center items-center " +
        (bg === true && "bg-gray-100")
      }
    >
      <Icon />
    </button>
  );
};
