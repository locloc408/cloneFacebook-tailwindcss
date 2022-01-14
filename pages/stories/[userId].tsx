import { GetServerSideProps } from "next";
import { useState, useRef, useEffect, forwardRef, ForwardedRef } from "react";
import Story from "../../lib/mongoose/model/Stories";
import User from "../../lib/mongoose/model/User";
import { StoryType, StoryContainer } from "../../type/Stories";
import { IconButton } from "../../component/IconButton/IconButton";
import { Divide } from "../../component/Divide/Divide";
import { StoryListFriends } from "../../component/Story/WatchStory/StoryFriends/StoryListFriends";
import { UserType } from "../../type/User";
import { useRouter } from "next/dist/client/router";
import { MenuFeatures } from "../../component/dummyData/dummyMenuFeatures";
import { MenuFeature } from "../../component/Navbar/MenuFeature";
import { Tooltip } from "../../component/Tooltip/Tooltip";
import { StoryDetail } from "../../component/Story/WatchStory/StoryDetail";
import { StoryEmoji } from "../../component/Story/WatchStory/StoryEmoji";
import { StoryResponse } from "../../component/Story/WatchStory/StoryResponse";
const StoryDetailPage = ({
  Friends,
  AllStories,
}: {
  Friends: UserType[];
  AllStories: StoryType[];
}) => {
  const [menuFeatureId, setMenuFeatureId] = useState(0);
  const router = useRouter();
  const hanldeMenuFeatureClick = (menuFeatureId: number) => {
    setMenuFeatureId(menuFeatureId);
  };
  const [isFocus, setIsFocus] = useState(false);
  // dispatch
  const callback = (IsFocus: boolean) => {
    setIsFocus(IsFocus);
  };
  const ref = useRef<HTMLDivElement>(null);

  const pauseFlagMouse = useRef(false);

  const handleClickOutside = (event: any) => {
    if (ref.current?.contains(event.target)) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const WrappedStoryResponse = forwardRef(
    (props, ref: ForwardedRef<HTMLDivElement>) => {
      return <StoryResponse callback={callback} isFocus={isFocus} ref={ref} />;
    }
  );

  return (
    <div>
      <div className="flex">
        <div style={{ width: "360px", height: "100%" }}>
          <div className="flex space-x-2 m-2">
            <div
              onClick={() => {
                router.push("/");
              }}
              className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-400 hover:opacity-90 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <svg
                viewBox="0 0 36 36"
                fill="url(#jsc_s_13)"
                height="40"
                width="40"
              >
                <defs>
                  <linearGradient
                    x1="50%"
                    x2="50%"
                    y1="97.0782153%"
                    y2="0%"
                    id="jsc_s_13"
                  >
                    <stop offset="0%" stopColor="#0062E0"></stop>
                    <stop offset="100%" stopColor="#19AFFF"></stop>
                  </linearGradient>
                </defs>
                <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
                <path
                  fill="white"
                  d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                ></path>
              </svg>
            </div>
          </div>
          <Divide />
          <div className="m-3 ">
            <div className="flex justify-between">
              <p className=" font-semibold text-2xl">Tin</p>
              <div>
                <IconButton
                  bg={true}
                  Icon={() => {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <p className="text-primary">Kho Lưu Trữ</p>
              <p className="text-primary">Cài Đặt</p>
            </div>
            <div className="mt-3">
              <p className="font-semibold text-base">Tin Của Bạn</p>
              <div className="cursor-pointer flex items-center space-x-2">
                <div
                  className=" bg-gray-100 rounded-full flex justify-center items-center mt-3"
                  style={{ height: "60px", width: "60px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="rgb(27,116,228)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-2">
                  <p className="text-base font-medium">Tạo Tin</p>
                  <p className="text-sm font-normal">
                    Bạn có thể chia sẻ ảnh hoặc viết gì đó
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-auto h-96">
            <StoryListFriends
              pauseFlagMouse={pauseFlagMouse}
              Friends={Friends}
              AllStories={AllStories}
            />
          </div>
        </div>
        <div
          className="bg-black h-screen"
          style={{ width: "calc(100vw - 360px)" }}
        >
          <div className="absolute right-2 top-2 flex justify-evenly">
            {MenuFeatures.map((menuFeature) => {
              return (
                <div
                  className="mr-4 cursor-pointer relative group"
                  onClick={() => hanldeMenuFeatureClick(menuFeature.id)}
                  key={menuFeature.id}
                >
                  <MenuFeature
                    bg={menuFeature.id === menuFeatureId ? true : false}
                    Icon={() =>
                      menuFeature.Icon(
                        menuFeature.id === menuFeatureId ? true : false
                      )
                    }
                  />
                  <Tooltip
                    title={menuFeature.title}
                    translate={menuFeature.translate}
                    width={menuFeature.width}
                  />
                  <div
                    className={
                      "absolute inset-0 rounded-full w-full h-full " +
                      (menuFeature.id === menuFeatureId ? "block" : "hidden")
                    }
                    style={{ backgroundColor: "rgb(24,119,242 , 0.15)" }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center h-full flex-col">
            <StoryDetail
              pauseFlagMouse={pauseFlagMouse}
              Friends={Friends}
              AllStories={AllStories}
            />
            <div className="flex mt-3">
              <WrappedStoryResponse />
              {isFocus === false && (
                <StoryEmoji pauseFlagMouse={pauseFlagMouse} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;

export const getServerSideProps: GetServerSideProps = async (conetxt) => {
  const { userId } = conetxt.query;
  const storyOfFriend = await Story.findOne({ userId: userId });
  const stories = await Story.find();

  //get another friends then sort by date created
  const AnotherFriends = stories.filter((story) => story.userId !== userId);

  const isNotWatch = await Story.find({
    stories: {
      $not: {
        $elemMatch: {
          viewerIds: "61b5cfe89f7f6d222bab9d67",
        },
      },
    },
  });
  const isNotWatched = isNotWatch.filter((story) => story.userId != userId);
  // const la = isNotWatch.filter(())
  const isWatch = await Story.find({
    stories: {
      $elemMatch: {
        viewerIds: "61b5cfe89f7f6d222bab9d67",
      },
    },
  });
  const filter = isWatch.filter((story) => story.userId != userId);

  //stories that is not watched all (example : got 2 stories but got 1 is watched )
  const isWatchAllStory = filter.filter((x) =>
    x.stories.every((story: StoryContainer) =>
      story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
    )
  );
  const isNotWatchAll = filter.filter(
    (x) =>
      !x.stories.every((story: StoryContainer) =>
        story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
      )
  );

  //make sure every storyDetail is clicked always at the beginning of the storyList
  const allStories = [
    storyOfFriend,
    ...isNotWatched,
    ...isNotWatchAll,
    ...isWatchAllStory,
  ];
  const AllStories: StoryType[] = JSON.parse(JSON.stringify(allStories));

  //get all friends
  const friends = await Promise.all(
    AllStories.map((story) => {
      const user = User.findById(story.userId);
      return user;
    })
  );

  const Friends = JSON.parse(JSON.stringify(friends));

  return {
    props: {
      Friends,
      AllStories,
    },
  };
};
