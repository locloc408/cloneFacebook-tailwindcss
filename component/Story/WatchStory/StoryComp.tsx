import React, { useEffect, useState } from "react";
import { fecthData } from "../../../lib/axios/fetchClientData";
import { UserType } from "../../../type/User";
import { Avatar } from "../../Avatar/Avatar";
import { useRouter } from "next/dist/client/router";
import { useAppDispatch } from "../../../redux/hooks";
import { showStoryDetail } from "../../../redux/slice/Stories";
import { StoryType } from "../../../type/Stories";
export const StoryComp = ({
  img,
  userId,
  height,
  text,
  textStyle,
  storyId,
}: {
  img: string;
  userId: string;
  height: string;
  text: string;
  textStyle: string;
  storyId: string;
}) => {
  const [User, setUser] = useState<UserType>();
  const [story, setStory] = useState<StoryType>();
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await fecthData.getUserById(userId);
    setUser(user);
  };
  const getStory = async () => {
    const story = await fecthData.getStoryByUserId(userId);
    setStory(story);
  };
  const router = useRouter();
  useEffect(() => {
    getUser();
    getStory();
  }, [userId]);

  return (
    <div
      onClick={async () => {
        router.push(`/stories/${userId}`);

        dispatch(
          showStoryDetail({
            userId: userId,
            storyFriendIndex: 0,
            storyId: storyId,
          })
        );

        //updated watched story in DB
        await fecthData.setWatchedStory({
          viewerId: "61b5cfe89f7f6d222bab9d67",
          storyId: story?.stories[story.stories.length - 1]._id as string,
          userId: userId,
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
            src={User?.img as string}
            shadow={"shadow"}
            border="border-4 border-primary"
          />
        </div>
        <div className="absolute bottom-2 left-2 text-white font-normal">
          {User?.name}
        </div>
      </div>
    </div>
  );
};
