import { Avatar } from "../Avatar/Avatar";

export const ListItemWithAvatatar = ({
  src,
  active,
  title,
  news,
  rouneded,
  height,
  clicked,
  AvatarSize,
  needClick,
  AvatarBorderColor,
  isWatched,
}: {
  src: string;
  active: boolean;
  title: string;
  news: number;
  rouneded: string;
  height: string;
  clicked: boolean;
  AvatarSize: string;
  needClick: boolean;
  AvatarBorderColor: string;
  isWatched: boolean;
}) => {
  return (
    <div
      className={
        "rounded-lg hover:bg-gray-200 flex pl-2 cursor-pointer  items-center pr-2 " +
        (clicked === true && "bg-gray-200")
      }
      style={{ height: height }}
    >
      <div
        style={{ padding: "3px" }}
        className={
          "ml-2 flex items-center " +
          (isWatched === true
            ? "border border-gray-400 rounded-full "
            : "border-2  rounded-full " + `border-${AvatarBorderColor}` + " ") +
          (needClick === false && "border-transparent")
        }
      >
        <Avatar
          size={AvatarSize}
          border=""
          src={src}
          active={active}
          rounded={rouneded}
          shadow={" "}
        />
      </div>
      <div
        className={
          "ml-2 h-full items-center flex " +
          (news > 0 && "flex-col items-center justify-center pt-2")
        }
      >
        <p className="font-medium text-base">{title}</p>

        {news > 0 && (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary "></div>
            <p className="text-primary">{news} mục mới</p>
          </div>
        )}
      </div>
    </div>
  );
};
