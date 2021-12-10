import { FC } from "react";
import { Badge } from "../Badge/Badge";
import { Tooltip } from "../Tooltip/Tooltip";
export const Tab = ({
  Icon,
  clicked,
  numberBadge,
}: {
  Icon: FC;
  clicked: boolean;
  numberBadge: number;
}) => {
  return (
    <div
      role="tablist"
      className={
        "relative w-28  cursor-pointer flex justify-center h-14 items-center rounded-lg " +
        (clicked === false && "hover:bg-gray-100")
      }
    >
      <span
        className={
          "absolute pt-1 -bottom-0 left-0 h-1 bg-primary w-full " +
          (clicked === true ? "block" : "hidden")
        }
      ></span>
      <div className="relative">
        <Icon />
        <Badge numberBadge={numberBadge} />
      </div>
    </div>
  );
};
