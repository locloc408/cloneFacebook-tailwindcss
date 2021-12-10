import React from "react";
import {
  Color,
  TextStyle,
  TextInput,
  ImageStory,
} from "../../redux/slice/story";
import { useAppSelector } from "../../redux/hooks";

export const CreateStoryWithText = () => {
  const img = useAppSelector(ImageStory);
  const textStyle = useAppSelector(TextStyle);
  const textInput = useAppSelector(TextInput);
  return (
    <div
      className="bg-white rounded-md w-full"
      style={{
        height: "calc(100vh - 90px)",
        width: "930px",
        margin: "56px 24px 32px 24px",
      }}
    >
      <div className="h-full w-full">
        <p className="w-full mx-4 pt-4 font-medium">Xem Trước</p>
        <div
          className="rounded relative  m-4"
          style={{ height: "calc(100vh - 160px)", width: "auto" }}
        >
          <div className="absolute inset-0 bg-black  w-full h-full flex justify-center  flex-col items-center">
            <div
              className=" rounded-md mt-2 mb-2 border-white boder-2  bg-gray-200 relative h-full"
              style={{
                width: "250px",
              }}
            >
              <div
                className={
                  " w-full h-full  absolute top-0 items-center justify-center flex  "
                }
              >
                <img className="h-full w-full rounded-lg" src={img} alt="" />
                <p
                  className={
                    "absolute text-white opacity-50 font-bold text-lg " +
                    textStyle
                  }
                >
                  {textInput.length > 0 ? textInput : "Bắt Đầu Nhập"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
