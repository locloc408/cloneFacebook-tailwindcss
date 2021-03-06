import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { LatestStory } from "../../type/Stories";
import { StoryComp } from "../Story/WatchStory/StoryComp";
import { StoryUpload } from "../Story/WatchStory/StoryUpload";
export const Stories = ({
  latestStories,
}: {
  latestStories: LatestStory[];
}) => {
  //get 4 stories for view home
  const router = useRouter();
  return (
    <div
      className="pb-6 flex justify-center relative "
      style={{ width: "590px" }}
    >
      <div className="grid grid-cols-5 pt-4 gap-1">
        <StoryUpload
          img={
            "http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
          }
        />
        {latestStories?.map((latestStory) => {
          return (
            <StoryComp
              text={latestStory.last.textInput}
              textStyle={latestStory.last.textStyle}
              height="190px"
              key={nanoid()}
              img={latestStory.last.ImageStory}
              user={latestStory.user}
              storyId={latestStory.last._id}
            />
          );
        })}
      </div>
      <div
        onClick={() => {
          router.push("/stories");
        }}
        className="rounded-full cursor-pointer bg-gray-300 w-10 h-10 absolute z-10 flex flex-col justify-center items-center -right-5 top-24"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5  "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </div>
  );
};
