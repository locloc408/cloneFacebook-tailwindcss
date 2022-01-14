import React, { useEffect, useState, memo } from "react";
import { StoryUpload } from "../Story/WatchStory/StoryUpload";
import { StoryComp } from "../Story/WatchStory/StoryComp";
import { fecthData } from "../../lib/axios/fetchClientData";
import { nanoid } from "@reduxjs/toolkit";
import { LatestStory } from "../../type/Stories";
import { sortStory } from "../../utils/utils";
import { useRouter } from "next/dist/client/router";
export const Stories = () => {
  const [latestStories, setLatestStories] = useState<LatestStory[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getStories = async () => {
      let stories = await fecthData.getStories();

      // get latest Stories and user
      const LatestStories = sortStory(stories);
      //get 4 stories for view home
      const news = LatestStories.slice(0, 4);

      setLatestStories(news);
    };
    getStories();
  }, []);
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
              userId={latestStory.id}
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
