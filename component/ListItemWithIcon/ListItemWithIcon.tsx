import { FC } from "react";

export const ListItemWithIcon = ({
  title,
  news,
  Icon,
  size,
  bg,
  padding,
}: {
  title: string;
  news: boolean;
  Icon: FC;
  size: string;
  bg: string;
  padding: string;
}) => {
  return (
    <div
      className={
        "rounded-lg hover:bg-gray-200 flex h-10 cursor-pointer  items-center " +
        padding
      }
    >
      <div className={"ml-2 flex items-center " + size}>
        <div
          className={
            "rounded-full h-7 w-7 flex items-center justify-center " + bg
          }
        >
          <Icon />
        </div>
      </div>
      <div
        className={
          "ml-2 h-full items-center " + (news === false && "flex items-center")
        }
      >
        <p className="font-medium text-base">{title}</p>

        {news === true && (
          <div className="flex">
            <div className="h-2 w-2 rounded-full bg-primary "></div>
            <p className="text-primary">4 mục mới</p>
          </div>
        )}
      </div>
    </div>
  );
};
