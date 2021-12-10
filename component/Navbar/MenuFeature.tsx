import { FC } from "react";
export const MenuFeature = ({ Icon, bg }: { Icon: FC; bg: boolean }) => {
  return (
    <div
      className={
        " rounded-3xl hover:bg-gray-300 h-10 w-10 flex justify-center items-center " +
        (bg === true ? "bg-white" : "bg-gray-200")
      }
    >
      <Icon />
    </div>
  );
};
