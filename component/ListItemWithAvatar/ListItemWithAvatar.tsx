import { Avatar } from "../Avatar/Avatar";

export const ListItemWithAvatatar = ({
  src,
  active,
  title,
  news,
  rouneded,
}: {
  src: string;
  active: boolean;
  title: string;
  news: boolean;
  rouneded: string;
}) => {
  return (
    <div
      className="rounded-lg hover:bg-gray-200 flex pl-2 cursor-pointer  items-center pr-2 "
      style={{ height: "44px" }}
    >
      <div className="ml-2 flex items-center ">
        <Avatar
          src={src}
          active={active}
          rounded={rouneded}
          height={"h-7"}
          width={"w-7"}
          shadow={" "}
        />
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
