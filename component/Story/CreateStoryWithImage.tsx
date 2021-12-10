import Draggable from "react-draggable";
import React, { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeTextStyle } from "./ChangeTextStyle";
import { useAppSelector } from "../../redux/hooks";
import { Color, TextStyle } from "../../redux/slice/story";

export const CreateStoryWithImage = ({
  files,
  isOpenTextInput,
}: {
  files: any[];
  isOpenTextInput: boolean;
}) => {
  const [activedrag, setActivedrag] = useState<boolean | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const color = useAppSelector(Color);
  const textStyle = useAppSelector(TextStyle);

  const ref = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const changeImageStyle = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<number>(50);

  const onStart = () => {};
  const onStop = () => {};
  const dragHandler = {
    onStart,
    onStop,
  };
  const handleSlider = () => {
    const x = parseInt(rangeRef.current?.value as string);
    setValue(x);
    setScale(value / (50 / 1.001));
  };
  const handleRotate = () => {
    setRotate(rotate + 90);
  };
  useEffect(() => {
    handleSlider();
  }, [value]);
  useEffect(() => {
    textRef.current?.focus();
  });
  const handleScale = (plus: boolean) => {
    if (plus === true) {
      setValue((prev) => prev + 5);
    } else {
      setValue((prev) => prev - 5);
    }
  };
  const handleClickOutside = (event: any) => {
    if (
      (ref.current && ref.current.contains(event.target)) ||
      (changeImageStyle.current &&
        changeImageStyle.current.contains(event.target))
    ) {
      setActivedrag(true);
    } else {
      setActivedrag(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
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
              className=" rounded-md mt-4 border-white boder-2  bg-gray-200 relative h-full"
              style={{
                width: "250px",
              }}
            >
              <Draggable {...dragHandler} nodeRef={ref}>
                <div
                  ref={ref}
                  className="cursor-pointer"
                  style={{ zIndex: 0, height: "250px", width: "250px" }}
                >
                  <img
                    className="transform transform:rotate(90deg)"
                    height="100%"
                    width="100%"
                    src={files[0].preview}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                  ></img>
                </div>
              </Draggable>
              <div
                className={
                  " w-full h-full  absolute top-0 items-center justify-center  " +
                  (isOpenTextInput === true ? "flex" : "hidden")
                }
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              >
                <TextareaAutosize
                  className={
                    "font-medium placeholder-white border-none  text-center  resize-none  focus:ring-transparent " +
                    textStyle
                  }
                  style={{
                    backgroundColor: "rgba(0,0,0,0.01)",
                    color: color,
                  }}
                  defaultValue=""
                  placeholder="Bắt Đầu Nhập"
                  cols={15}
                  minRows={1}
                  ref={textRef}
                />
              </div>
            </div>
            {isOpenTextInput === true && <ChangeTextStyle />}
            {activedrag ? (
              <div
                className="flex space-x-2 items-center"
                ref={changeImageStyle}
              >
                <div onClick={() => handleScale(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M5 11h14v2H5z"></path>
                  </svg>
                </div>
                <input
                  ref={rangeRef}
                  type="range"
                  min="10"
                  max="60"
                  value={value.toString()}
                  onChange={handleSlider}
                ></input>
                <div onClick={() => handleScale(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                </div>
                <div>
                  <div
                    onClick={handleRotate}
                    className="mt-1 w-20 h-9 rounded-md bg-gray-50  flex items-center justify-center space-x-1 cursor-pointer hover:opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0c.51 6.16 5.66 11 11.95 11 .23 0 .44-.02.66-.03L8.8 20.15l-1.33 1.34zM12.05 0c-.23 0-.44.02-.66.04l3.81 3.81 1.33-1.33C19.8 4.07 22.14 7.24 22.5 11H24c-.51-6.16-5.66-11-11.95-11zM16 14h2V8c0-1.11-.9-2-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8c0 1.1.89 2 2 2h8v2h2v-2h2v-2H8z" />
                    </svg>
                    <p>Xoay</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white">
                <p>Chọn ảnh để cắt và xoay</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
