import React, { useState } from "react";
import { BackgroundStoris } from "../dummyData/dummyColor";
import { useAppDispatch } from "../../redux/hooks";
import {
  setColor,
  setTextStyle,
  setTextInput,
  setImg,
} from "../../redux/slice/story";
export const ChangeParagraphStyle = () => {
  const [backgroundColor, setBackgroundColor] = useState(1);

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
    <div
      className="bg-white rounded-md absolute overflow-auto"
      style={{
        width: "360px",
      }}
    >
      <div className="m-4">
        <textarea
          onChange={(e) => {
            dispatch(setTextInput(e.target.value));
          }}
          placeholder="Bắt Đầu Nhập"
          className="w-full rounded-md resize-none"
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
  );
};
