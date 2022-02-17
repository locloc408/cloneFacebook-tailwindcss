import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { UserReaction } from "../../type/Status";
import { UserType } from "../../type/User";
import { Avatar } from "../Avatar/Avatar";
import { Divide } from "../Divide/Divide";
import { Emoji } from "../dummyData/emoji";
import { getUnique } from "../../utils/utils";
interface StatusItemsType {
  user: UserType;
  statusContent: string;
  statusImage: string;
  statusId: string;
  statusReactionRes: UserReaction[];
}
interface ReactionStatus {
  content: string;
  reactionType: string;
  color: string;
  font: string;
}
export const StatusItems = ({
  user,
  statusContent,
  statusImage,
  statusId,
  statusReactionRes,
}: StatusItemsType) => {
  const [EmojiFlag, setEmojiFlag] = useState(false);
  const [likeFlag, setLikeFlag] = useState<boolean>(false);
  const [statusReaction, setStatusReaction] = useState<ReactionStatus>({
    reactionType: "normalLike",
    content: "Thích",
    color: "",
    font: "",
  });
  const ref = useRef<HTMLInputElement>(null);
  const [statusesReactionRes, setStatusesReactionRes] = useState<any[]>(() =>
    getUnique(statusReactionRes, "reactionType")
  );
  const [statusesReactionQuantity, setStatusesReactionQuantity] =
    useState<number>(statusReactionRes?.length);
  const flag = useRef<any>(null);
  const pause = useRef<boolean>(false);

  const mouseEnter = () => {
    let time = 0;
    clearInterval(flag.current);
    pause.current = false;
    flag.current = setInterval(() => {
      if (pause.current === false) {
        time++;
        if (time === 10) {
          time = 0;
          setEmojiFlag(true);
          clearInterval(flag.current);
        }
      } else {
        clearInterval(flag.current);
      }
    }, 100);
  };
  const mouseLeave = () => {
    clearInterval(flag.current);
    let time = 0;
    flag.current = setInterval(() => {
      if (pause.current === false) {
        time++;
        if (time === 10) {
          time = 0;
          setEmojiFlag(false);
          clearInterval(flag.current);
        }
      } else {
        clearInterval(flag.current);
      }
    }, 100);
  };
  const handleOnClickReaction = async (
    type: string,
    content: string,
    color: string
  ) => {
    pause.current = true;
    setEmojiFlag(false);
    setLikeFlag(true);
    if (statusesReactionRes.includes(type) === false) {
      setStatusesReactionRes([...statusesReactionRes, type]);
    }
    setStatusReaction({
      reactionType: type,
      content: content,
      color: color,
      font: "font-medium",
    });
    setStatusesReactionQuantity(statusesReactionQuantity + 1);
    await fecthData.postStatusReaction(user._id, {
      userId: "61bb16f29e4e9229d13fde15",
      reactionType: type,
      statusId: statusId,
    });
  };

  const handleOnClickLike = async () => {
    if (likeFlag === false) {
      setLikeFlag(true);
      if (!statusesReactionRes.includes("like")) {
        setStatusesReactionRes([...statusesReactionRes, "like"]);
      }
      setStatusReaction({
        reactionType: "like",
        content: "Thích",
        color: "-primary",
        font: "font-medium",
      });
      setStatusesReactionQuantity(statusesReactionQuantity + 1);
      await fecthData.postStatusReaction("61b74737b003e561f956b6d7", {
        userId: "61bb16f29e4e9229d13fde15",
        reactionType: "like",
        statusId: statusId,
      });
    } else {
      setLikeFlag(false);
      setStatusesReactionRes(
        statusesReactionRes.filter(
          (reaction) => reaction !== statusReaction.reactionType
        )
      );
      setStatusReaction({
        reactionType: "normalLike",
        content: "Thích",
        color: "",
        font: "",
      });
      setStatusesReactionQuantity(statusesReactionQuantity - 1);
      await fecthData.postStatusReaction("61b74737b003e561f956b6d7", {
        userId: "61bb16f29e4e9229d13fde15",
        reactionType: "normalLike",
        statusId: statusId,
      });
    }
  };

  return (
    <div className="pt-3">
      <div>
        <div className="flex ml-4 space-x-1">
          <Avatar
            src={user?.img as string}
            active={false}
            rounded="rounded-full"
            shadow=""
            border="border"
            size="h-10 w-10"
          />
          <div className="text-md font-semibold">{user?.name}</div>
        </div>
      </div>
      <div className="">
        <div className="ml-4 mb-2">{statusContent}</div>
        <div className="">
          {statusImage?.length > 0 && (
            <img src={statusImage} style={{ width: "100%" }} />
          )}
        </div>
      </div>
      <div className="mx-3">
        <div className="flex space-x-3">
          <div className="flex">
            {statusesReactionRes.map((reaction) => {
              return (
                <div key={nanoid()}>
                  <img
                    style={{
                      height: "100%",
                    }}
                    src={`./emoji/${reaction}.svg`}
                    width="20px"
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              fontSize: "15px",
              lineHeight: "20px",
            }}
          >
            {statusesReactionQuantity > 0 && statusesReactionQuantity}
          </div>
        </div>
        <div className="my-1">
          <Divide />
        </div>
        <div className=" flex space-x-2 pt-2 relative justify-between h-11">
          <div
            className="flex-1 flex justify-center items-center  cursor-pointer hover:bg-gray-100 rounded-md relative "
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={handleOnClickLike}
          >
            <div className="flex space-x-1 ">
              <img
                src={`./emoji/${statusReaction.reactionType}.svg`}
                height={"20px"}
                width={"20px"}
              />
              <div
                className={`text${statusReaction.color} ${statusReaction.font}`}
              >
                {statusReaction.content}
              </div>
            </div>
          </div>
          {EmojiFlag === true && (
            <div className="absolute flex -top-12 space-x-1 bg-white rounded-full border-2 border-gray-200 h-12 z-50">
              {Emoji.map((emoji) => {
                return (
                  <div
                    key={emoji.id}
                    className="hover:scale-125 cursor-pointer transform"
                    onClick={() =>
                      handleOnClickReaction(
                        emoji.type,
                        emoji.content,
                        emoji.color
                      )
                    }
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseEnter}
                  >
                    <img
                      style={{
                        height: "100%",
                      }}
                      src={`/emoji/${emoji?.type}.svg`}
                      width="35px"
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div
            onClick={() => {
              ref.current?.focus();
            }}
            className="flex-1 flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <i
              style={{
                backgroundImage:
                  "url(	https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/-5nDun15jc_.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "26px 562px",
                display: "inline-block",
                backgroundPosition: "0px -192px",
                height: "20px",
                width: "20px",
                marginTop: "4px",
              }}
            >
              {" "}
            </i>
            <div>Bình Luận</div>
          </div>
          <div className=" flex-1 flex space-x-1 justify-center cursor-pointer items-center hover:bg-gray-100 rounded-md">
            <i
              style={{
                backgroundImage:
                  "url(	https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/E2BXhjYXUP-.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                display: "inline-block",
                backgroundPosition: "0px -240px",
                height: "20px",
                width: "20px",
                marginTop: "4px",
              }}
            >
              {" "}
            </i>
            <div>Chia Sẻ</div>
          </div>
        </div>
        <div className="my-2">
          <Divide />
        </div>
        <div className="pb-2">
          <div className="flex ml-1 space-x-1">
            <Avatar
              src={
                "http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
              }
              active={false}
              rounded="rounded-full"
              shadow=""
              border="border"
              size="h-8 w-8"
            />
            <div className=" w-full h-9 bg-gray-100 rounded-full ">
              <input
                ref={ref}
                placeholder="viết bình luận"
                className="px-4 rounded-full ring-transparent border-transparent  focus:outline-none h-full bg-gray-100"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
