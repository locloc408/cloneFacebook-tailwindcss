import { useRouter } from "next/dist/client/router";
import { FC } from "react";
export const ListItemWithIcon = ({
  title,
  news,
  Icon,
  size,
  bg,
  padding,
  height,
  margin,
  url,
  isActive,
}: {
  title: string;
  news: boolean;
  Icon: FC;
  size: string;
  bg: string;
  padding: string;
  height: string;
  isActive: boolean;
  margin: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(url);
      }}
      className={
        "rounded-lg flex items-center " +
        padding +
        " " +
        height +
        " " +
        (isActive ? "bg-clicked" : "cursor-pointer hover:bg-gray-200")
      }
    >
      <div className={"ml-2 flex items-center " + size}>
        <div
          className={
            "rounded-full h-full flex items-center justify-center w-full " + bg
          }
        >
          <Icon />
        </div>
      </div>
      <div
        className={
          "h-full items-center " +
          (news === false && "flex items-center ") +
          margin
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
