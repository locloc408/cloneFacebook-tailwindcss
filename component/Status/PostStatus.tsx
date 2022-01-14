import { Avatar } from "../Avatar/Avatar";
import { Divide } from "../Divide/Divide";
import { PostStatusIcons } from "../dummyData/dummyPostSatusIcon";
import { ListItemWithIcon } from "../ListItemWithIcon/ListItemWithIcon";
import { changeModal, ShowModal } from "../../redux/slice/status";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import dynamic from "next/dynamic";
import { nanoid } from "@reduxjs/toolkit";
const NoSSRComponent = dynamic(() => import("./Modal"), {
  ssr: false,
});
export const PostStatus = () => {
  const showModal = useAppSelector(ShowModal);
  const dispatch = useAppDispatch();
  const ChangeModal = () => {
    dispatch(changeModal(true));
  };

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
            border=""
            rounded={"rounded-full"}
            src="http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
            size="h-10 w-10"
            active={false}
            shadow={"shadow"}
          />
          <div
            className="rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 flex-1 items-center flex "
            onClick={ChangeModal}
          >
            <div className="ml-3">Nguyễn ơi , bạn đang nghĩ gì thế?</div>
          </div>
        </div>
        <div className="mx-4">
          <Divide />
        </div>
        <div className="flex pt-2 justify-around">
          {PostStatusIcons.map((PostStatusIcon) => {
            return (
              <div key={nanoid()}>
                <ListItemWithIcon
                  url=""
                  isActive={false}
                  height="h-10"
                  margin="ml-1"
                  padding={" "}
                  bg={" "}
                  key={PostStatusIcon.id}
                  size={"h-6 w-6"}
                  title={PostStatusIcon.title}
                  Icon={PostStatusIcon.Icon}
                  news={false}
                />
              </div>
            );
          })}
        </div>
      </div>
      {showModal === true && <NoSSRComponent />}
    </div>
  );
};
