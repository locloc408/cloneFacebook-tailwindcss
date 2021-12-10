import React from "react";

export const Badge = ({ numberBadge }: { numberBadge: number }) => {
  return numberBadge !== 0 ? (
    <span className="rounded-3xl bg-error h-5 w-5 absolute text-white -top-2.5 left-4 flex justify-center items-center">
      {numberBadge}
    </span>
  ) : (
    <div></div>
  );
};
