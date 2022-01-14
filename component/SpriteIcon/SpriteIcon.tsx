import React from "react";

export const SpriteIcon = ({
  bg,
  url,
  position,
}: {
  url: string;
  position: string;
  bg: boolean;
}) => {
  return (
    <div
      className={
        bg === true
          ? "hover:bg-gray-100 rounded-full h-9 w-9 flex items-center justify-center"
          : ""
      }
    >
      <i
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: position,
          height: "24px",
          width: "24px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          display: "inline-block",
        }}
      />
    </div>
  );
};
