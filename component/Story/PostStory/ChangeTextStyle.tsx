import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ImageStory, postTextStory, setImg, setTextInput, setTextStyle, TextInput, TextStyle
} from "../../../redux/slice/story";
import { BackgroundStoris } from "../../dummyData/dummyColor";
export const ChangeParagraphStyle = () => {
  const [backgroundColor, setBackgroundColor] = useState(1);

  const textInput = useAppSelector(TextInput);
  const imageStory = useAppSelector(ImageStory);
  const textStyle = useAppSelector(TextStyle);
  const dispatch = useAppDispatch();
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Mềm Mại") {
      dispatch(setTextStyle("lowercase"));
    }
    if (e.target.value === "gọn gàng") {
      dispatch(setTextStyle("uppercase"));
    }
  };
  return (
    <div className="">
      <div
        className="bg-white rounded-md overflow-auto"
        style={{
          width: "360px",
          height: "384px",
        }}
      >
        <div className="m-4">
          <textarea
            onChange={(e) => {
              dispatch(setTextInput(e.target.value));
            }}
            placeholder="Bắt Đầu Nhập"
            className="w-full rounded-md resize-none "
            rows={6}
          />
          <div
            className="mb-3 border-gray-100 h-full w-full"
            style={{ borderWidth: "1px" }}
          >
            <select
              className="h-full w-full rounded-md cursor-pointer focus:ring-transparent focus:outline-none"
              onChange={handleSelect}
            >
              <option hidden className="font-serif">
                Aa Mềm mại
              </option>
              <option value="Mềm Mại">Mềm Mại</option>
              <option value="gọn gàng">Gọn Gàng</option>
            </select>
          </div>
          <div
            className="h-full w-full rounded-md"
            style={{ borderWidth: "1px" }}
          >
            <label className="m-2 text-base">phông nền</label>
            <div className="grid grid-cols-8 grid-rows-3 ">
              {BackgroundStoris.map((backgroundStory) => {
                return (
                  <div
                    onClick={() => {
                      setBackgroundColor(backgroundStory.id);
                      dispatch(setImg(backgroundStory.img));
                    }}
                    key={backgroundStory.id}
                  >
                    <img
                      className={
                        "rounded-full border-2 h-7   w-7 my-3 mx-1 cursor-pointer " +
                        (backgroundColor === backgroundStory.id
                          ? "border-primary "
                          : "border-gray-200 ")
                      }
                      src={backgroundStory.img}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white flex flex-col justify-end shadow-inner">
        <div
          className=" w-full h-14"
          style={{
            boxShadow:
              "rgb(0 0 0 / 8%) 0px 4.48625rem 5.27794rem, rgb(0 0 0 / 6%) 0px 1.87425rem 2.205rem, rgb(0 0 0 / 5%) 0px 1.00206rem 1.1789rem, rgb(0 0 0 / 4%) 0px 0.561748rem 0.66088rem, rgb(0 0 0 / 3%) 0px 0.29834rem 0.350988rem, rgb(0 0 0 / 4%) 0px -0.2rem 1.2rem",
          }}
        >
          <div className="flex space-x-3 px-3 items-center h-full">
            <button
              className="bg-gray-300 opacity-70 rounded-md text-center h-9 hover:opacity-100 "
              style={{ width: "121px" }}
            >
              Bỏ
            </button>
            <button
              className="bg-primary text-white text-center h-9 rounded-md relative group "
              style={{ width: "198px" }}
              onClick={() => {
                dispatch(
                  postTextStory({
                    ImageStory: imageStory,
                    textInput: textInput,
                    textStyle: textStyle,
                    style: {},
                    userId: "61bb18209e4e9229d13fde18",
                  })
                );
              }}
            >
              Chia sẻ lên tin
              <div
                className="absolute inset-0 hidden group-hover:block"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
