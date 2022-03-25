import { useRouter } from "next/dist/client/router";
import React from "react";
import { fecthData } from "../../../lib/axios/fetchClientData";
import { useAppDispatch } from "../../../redux/hooks";
import { showStoryDetail } from "../../../redux/slice/Stories";
import { UserType } from "../../../type/User";
import { Avatar } from "../../Avatar/Avatar";
export const StoryComp = ({
  img,
  user,
  height,
  text,
  textStyle,
  storyId,
}: {
  img: string;
  user: UserType;
  height: string;
  text: string;
  textStyle: string;
  storyId: string;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        router.push(`/stories/${user._id}`);
        dispatch(
          showStoryDetail({
            userId: user._id,
            storyFriendIndex: 0,
            storyId: storyId,
          })
        );

        //updated watched story in DB
        await fecthData.setWatchedStory({
          viewerId: "61b5cfe89f7f6d222bab9d67",
          storyId: storyId,
          userId: user._id,
        });
      }}
    >
      <div
        className={
          " cursor-pointer group rounded-2xl  overflow-hidden relative "
        }
        style={{ height: height }}
      >
        <div className="h-full w-full relative">
          {/* <img src={img} className=" h-full w-full"></img> */}
          <div
            className={
              "h-full w-full flex justify-center items-center " + textStyle
            }
            style={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {text}
          </div>
        </div>
        <div
          className={"absolute inset-0 group-hover:bg-overlay z-10 "}
          style={{ height: height }}
        ></div>
        <div className="absolute top-4 left-4">
          <Avatar
            rounded={"rounded-full"}
            active={false}
            size="h-10 w-10"
            src={user?.img as string}
            shadow={"shadow"}
            border="border-4 border-primary"
          />
        </div>
        <div className="absolute bottom-2 left-2 text-white font-normal">
          {user?.name}
        </div>
      </div>
    </div>
  );
};
