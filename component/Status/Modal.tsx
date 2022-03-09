import React, { useState, useRef, useEffect } from "react";
import { Divide } from "../Divide/Divide";
import { IconButton } from "../IconButton/IconButton";
import {
  changeModal,
  ShowInputZone,
  setStatusResponseItems,
} from "../../redux/slice/status";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Avatar } from "../Avatar/Avatar";
import { PostIcon } from "../dummyData/dummySpritePost";
import { WrapSpriteIcon } from "./WrapSpriteIcon";
import Picker from "emoji-picker-react";
import { useClickOutSide, usePreviewImage } from "../../utils/utils";
import { ImageZone } from "./ImageZone";
import axios from "axios";
import { fecthData } from "../../lib/axios/fetchClientData";
import { nanoid } from "@reduxjs/toolkit";
import useSWR from "swr";
const Modal = () => {
  const dispatch = useAppDispatch();
  const ChangeModal = () => {
    dispatch(changeModal(false));
  };

  const [textInput, setTextInput] = useState("");
  const inputRef = useRef<any>(null);
  const ref = useRef<any>(null);
  const showInputZone = useAppSelector(ShowInputZone);
  const [openEmoji, setOpenEmoji] = useState(false);
  useClickOutSide(ref, setOpenEmoji);
  const onEmojiClick = (e: any, emojiObject: any) => {
    const cursor = inputRef.current.selectionStart;
    const text =
      textInput.slice(0, cursor) + emojiObject.emoji + textInput.slice(cursor);
    setTextInput(text);
  };
  const { files, getRootProps, getInputProps, setFiles } = usePreviewImage();

  const uploadImage = async () => {
    // Tạo một form data chứa dữ liệu gửi lên
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "my upload");

      const ImageUploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dlq2u39zm/image/upload",
        formData
      );
      const status = await fecthData.postStatus("61b5cfe89f7f6d222bab9d67", {
        ImageUrl: ImageUploadRes.data.url,
        textInput: textInput,
        statusId: "",
      });
      dispatch(changeModal(false));
      dispatch(
        setStatusResponseItems({
          ImageUrl: ImageUploadRes.data.url,
          textInput: textInput,
          statusId: status._id,
        })
      );
    } else {
      const status = await fecthData.postStatus("61b5cfe89f7f6d222bab9d67", {
        ImageUrl: "",
        textInput: textInput,
        statusId: "",
      });
      dispatch(changeModal(false));
      dispatch(
        setStatusResponseItems({
          ImageUrl: "",
          textInput: textInput,
          statusId: status._id,
        })
      );
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
      <div
        className="absolute inset-0 "
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      ></div>
      <div
        className="bg-white relative rounded-md"
        style={{ height: "auto", width: "500px" }}
      >
        <div style={{ height: "59px" }}>
          <div className="flex justify-center items-center h-full">
            <p className=" text-lg font-bold mt-1">Tạo Bài Viết</p>
            <div className="absolute right-2 top-3" onClick={ChangeModal}>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  );
                }}
              />
            </div>
          </div>
          <Divide />
        </div>
        <div>
          <div className="p-4">
            <div className="flex items-center space-x-2 ">
              <Avatar
                src="http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
                active={false}
                rounded="rounded-full"
                shadow=""
                size="h-10 w-10"
                border="border"
              />
              <div className="font-semibold text-base">Lộc Nguyễn</div>
            </div>
            <input
              className="focus:border-transparent focus:ring-transparent border-none w-full text-xl mt-2 focus:outline-none"
              placeholder="Nguyễn ơi , bạn đang nghĩ gì thế?"
              value={textInput}
              ref={inputRef}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
            />
            {showInputZone === true && (
              <div>
                {files.length === 0 ? (
                  <div
                    className="overflow-auto mt-3"
                    style={{ height: "200px" }}
                  >
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        className="rounded-md w-full border border-gray-300 "
                        style={{ height: "200px" }}
                      >
                        <div className="p-2 h-full relative">
                          <div className="  h-full cursor-pointer flex justify-center items-center">
                            <div className="flex items-center justify-center flex-col z-50">
                              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <i
                                  style={{
                                    background:
                                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/5B7Xjn6goQW.png)",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block",
                                    backgroundSize: "auto",
                                    width: "20px",
                                    height: "20px",
                                    backgroundPosition: "-25px -271px",
                                  }}
                                ></i>
                              </div>

                              <div className="font-semibold text-base">
                                Thêm Ảnh/Video
                              </div>
                              <div className="text-sm">Hoặc kéo và thả</div>
                            </div>
                          </div>
                          <div className="absolute inset-0  bg-gray-200 opacity-60 hover:opacity-100 cursor-pointer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ImageZone
                    files={files}
                    setFiles={setFiles}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative h-10">
          <img
            className="absolute bottom-0 left-2 cursor-pointer"
            src="/SATP_Aa_square-2x.png"
            height={"38px"}
            width="38px"
          />
          <div
            className="absolute bottom-0 right-2 flex items-center"
            style={{ height: "38px", width: "38px" }}
            onClick={() => {
              setOpenEmoji(true);
            }}
          >
            {openEmoji && (
              <div
                ref={ref}
                className="absolute bottom-7 "
                style={{ right: "-117px" }}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <i
              className="cursor-pointer"
              style={{
                backgroundImage:
                  "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/KzmUzY1_3Zb.png)",
                backgroundPosition: "0 -182px",
                height: "24px",
                width: "24px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                display: "inline-block",
              }}
            />
          </div>
        </div>
        <div>
          <div
            className="border rounded-md h-14"
            style={{ margin: "20px 14px 0 14px" }}
          >
            <div className="p-2 flex items-center h-full justify-between">
              <div className="text-sm font-semibold">Thêm Vào Bài Viết</div>
              <div className="flex space-x-1">
                {PostIcon.map((icon) => (
                  <div key={nanoid()}>
                    <WrapSpriteIcon
                      id={icon.id}
                      bg={icon.bg}
                      title={icon.title}
                      url={icon.url}
                      position={icon.position}
                      width={icon.width}
                      translate={icon.translate}
                      text={"text-xs"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={"border rounded-md relative h-9"}
          style={{
            margin: "16px 14px 16px 14px",
          }}
        >
          <button
            className={
              "h-full w-full " +
              ((textInput?.length as number) > 0
                ? "bg-primary text-white rounded-md"
                : "")
            }
            disabled={(textInput?.length as number) > 0 ? false : true}
            onClick={uploadImage}
          >
            Đăng
          </button>
          {textInput?.length === 0 && (
            <div
              className="absolute w-full h-full inset-0 opacity-60 cursor-not-allowed"
              style={{ backgroundColor: "rgba(228 , 230 , 235)" }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
