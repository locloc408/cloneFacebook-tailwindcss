import React from "react";
import { useRouter } from "next/dist/client/router";
export const StoryUpload = ({ img }: { img: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/CreateStory");
      }}
    >
      <div
        className="cursor-pointer group rounded-2xl  overflow-hidden relative"
        style={{ height: "190px" }}
      >
        <div className=" overflow-hidden relative" style={{ height: "150px" }}>
          <img
            src={img}
            className=" duration-700 group-hover:transform group-hover:scale-110 h-full"
          ></img>
          <div
            className="absolute inset-0 z-2"
            style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.1)" }}
          ></div>
        </div>
        <div
          className="absolute inset-0 group-hover:bg-overlay z-10 "
          style={{ height: "190px" }}
        ></div>
        <div
          className=" shadow-inner bg-white relative flex flex-col justify-end items-center "
          style={{ height: "40px" }}
        >
          <div className="font-semibold ">Tạo Tin</div>
          <div className="absolute rounded-full h-10 w-10 bg-primary border-white border-solid border-4  items-center dark:border-dark -top-6 left-1/2 grid place-items-center transform -translate-x-1/2">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="white">
              <g fillRule="evenodd" transform="translate(-446 -350)">
                <g fillRule="nonzero">
                  <path
                    d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                    transform="translate(354.5 159.5)"
                  ></path>
                  <path
                    d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                    transform="translate(354.5 159.5)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
