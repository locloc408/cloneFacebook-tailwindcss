import { nanoid } from "@reduxjs/toolkit";
import React, { useRef } from "react";
import { UserReaction, UserReactionPost } from "../../type/Status";
import { UserType } from "../../type/User";
import { Avatar } from "../Avatar/Avatar";
import { Divide } from "../Divide/Divide";
import PostComment from "../Comment/PostComment";
import { CommentList } from "../Comment/CommentList";
import { useReaction } from "../Reaction/useReaction";
import { ReactionMenu } from "../Reaction/ReactionMenu";
import { fecthData } from "../../lib/axios/fetchClientData";
interface StatusItemsType {
  statusUser: UserType;
  statusContent: string;
  statusImage: string;
  statusId: string;
  statusReactionRes: UserReaction[];
}
export const StatusItems = ({
  statusUser,
  statusContent,
  statusImage,
  statusId,
  statusReactionRes,
}: StatusItemsType) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const {
    EmojiFlag,
    uniqueReactions,
    statusesReactionQuantity,
    statusReaction,
    mouseEnter,
    mouseLeave,
    handleOnClickLike,
    handleOnClickReaction,
  } = useReaction({
    caseReactionRes: statusReactionRes,
    caseId: statusId,
    caseUserId: statusUser._id,
    caseFetch: "status",
  });
  return (
    <div className="pt-3">
      <div>
        <div className="flex ml-4 space-x-1">
          <Avatar
            src={statusUser?.img as string}
            active={false}
            rounded="rounded-full"
            shadow=""
            border="border"
            size="h-10 w-10"
          />
          <div className="text-md font-semibold">{statusUser?.name}</div>
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
      <div className="mx-3 ">
        <div className="flex space-x-3">
          <div className="flex">
            {uniqueReactions.map((reaction) => {
              if (reaction !== "") {
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
              }
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
                src={`./emoji/${
                  statusReaction ? statusReaction.type : "unLike"
                }.svg`}
                height={"20px"}
                width={"20px"}
              />
              <div
                className={`text${statusReaction?.color} ${statusReaction?.font}`}
              >
                {statusReaction ? statusReaction.content : "Thích"}
              </div>
            </div>
          </div>
          {EmojiFlag === true && (
            <ReactionMenu
              top={"-top-12"}
              handleOnClickReaction={handleOnClickReaction}
              mouseEnter={mouseEnter}
              mouseLeave={mouseLeave}
            />
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
        <CommentList statusId={statusId} />
        <PostComment postId={statusId} ref={ref} />
      </div>
    </div>
  );
};
