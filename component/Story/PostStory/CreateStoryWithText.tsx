import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "../../../redux/hooks";
import { ImageStory, TextInput, TextStyle } from "../../../redux/slice/story";
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
          <div className="bg-black  w-full h-full flex justify-center  flex-col items-center">
            <div
              className=" rounded-md mt-2 mb-2 border-white boder-2  bg-gray-200 relative h-full flex justify-center items-center"
              style={{
                width: "250px",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="h-full w-full flex justify-center items-center"
              >
                <TextareaAutosize
                  className={
                    " text-white opacity-50 font-bold text-lg text-center resize-none  border-none  focus:ring-transparent focus:border-transparent focus:outline-none" +
                    textStyle
                  }
                  value={textInput.length > 0 ? textInput : "Bắt Đầu Nhập"}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.01)",
                  }}
                  cols={15}
                  minRows={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
