import { Avatar } from "../Avatar/Avatar";
import { Divide } from "../Divide/Divide";
import { PostStatusIcons } from "../dummyData/dummyPostSatusIcon";
import { ListItemWithIcon } from "../ListItemWithIcon/ListItemWithIcon";

export const PostStatus = () => {
  return (
    <div className="flex justify-center ">
      <div
        className="rounded-lg bg-white shadow"
        style={{
          width: "500px",
          height: "125px",
        }}
      >
        <div className="flex space-x-2 px-4 pt-3 pb-2 ">
          <Avatar
            rounded={"rounded-full"}
            src="http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
            height={"h-10"}
            width="w-10"
            active={false}
            shadow={"shadow"}
          />
          <input
            className="text-sm pl-2  rounded-full  focus:outline-none focus:border-none border-none w-full"
            style={{
              backgroundColor: "rgb(240,242,245)",
            }}
            placeholder="Nguyễn ơi , bạn đang nghĩ gì thế?"
            autoComplete="off"
          ></input>
        </div>
        <div className="mx-4">
          <Divide />
        </div>
        <div className="flex pt-2 justify-around">
          {PostStatusIcons.map((PostStatusIcon) => {
            return (
              <ListItemWithIcon
                padding={" "}
                bg={" "}
                key={PostStatusIcon.id}
                size={"h-6 w-6"}
                title={PostStatusIcon.title}
                Icon={PostStatusIcon.Icon}
                news={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
