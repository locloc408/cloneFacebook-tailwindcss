import React, { useState } from "react";
import { Colors, BackgroundStoris } from "../../dummyData/dummyColor";
import { useAppDispatch } from "../../../redux/hooks";
import { setColor, setTextStyle } from "../../../redux/slice/story";
export const ChangeTextStyle = () => {
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
      className="bg-white rounded-md absolute right-9"
      style={{ height: "216px", width: "286px" }}
    >
      <div className="m-4">
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
          <div className="grid grid-cols-7 grid-rows-3 ">
            {Colors.map((color) => {
              return (
                <div
                  onClick={() => {
                    setBackgroundColor(color.id);
                    dispatch(setColor(color.color));
                  }}
                  key={color.id}
                  className={
                    "rounded-full border-2 h-5 w-5 my-3 mx-1 cursor-pointer " +
                    (backgroundColor === color.id
                      ? "border-primary "
                      : "border-gray-200 ")
                  }
                  style={{ backgroundColor: color.color }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
