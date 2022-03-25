import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { CommentRes } from "../../type/Comment";
import { UserReaction } from "../../type/Status";
import { Avatar } from "../Avatar/Avatar";
import { ReactionMenu } from "../Reaction/ReactionMenu";
import { useReaction } from "../Reaction/useReaction";
import { setReplyComment } from "../../redux/slice/Comment";
import { useAppDispatch } from "../../redux/hooks";
import { SubCommentRes } from "../../type/SubComment";
export interface CommentItemType {
  comment?: CommentRes;
}
const actions = [
  {
    name: "Thích",
    id: 1,
    fontWeight: "bold",
  },
  {
    name: "Phản Hồi",
    id: 2,
    fontWeight: "bold",
  },
  {
    name: "6 giờ",
    id: 3,
    fontWeight: "700px",
  },
];
export const CommentItem: React.FC<CommentItemType> = ({ comment }) => {
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
    caseReactionRes: comment?.UserReaction as UserReaction[],
    caseId: comment?.userId._id as string,
    caseUserId: comment?.userId._id as string,
    caseFetch: "comment",
  });

  const dispatch = useAppDispatch();
  const handleOnClickAction = (id: number) => {
    if (id === 2) {
      console.log("click");
      dispatch(
        setReplyComment({
          replyCommentId: comment?._id,
        })
      );
    }
  };
  return (
    <div className="flex space-x-1 mb-2 ml-1">
      <div>
        <Avatar
          size="h-9 w-9"
          src={comment?.userId.img as string}
          rounded={"rounded-full"}
          active={false}
          shadow=""
          border="border"
        />
      </div>
      <div className="inline-block w-full">
        <div className="flex">
          <div
            style={{
              maxWidth: "calc(100% - 26px)",
            }}
            className="bg-gray-200 rounded-lg px-2 pt-1 inline-block relative"
          >
            <div
              style={{
                lineHeight: "1.2380",
                fontSize: "0.8125",
                fontWeight: "600px",
              }}
            >
              {comment?.userId.name}
            </div>
            <div>{comment?.textInput}</div>
            <div
              style={{ borderRadius: "10px" }}
              className="flex space-x-1 absolute -right-6 bottom-0  bg-white border-white shadow-lg px-1 "
            >
              <div className="flex">
                {uniqueReactions?.map((reaction) => {
                  if (reaction !== "") {
                    return (
                      <div key={nanoid()}>
                        <img
                          style={{
                            height: "100%",
                          }}
                          src={`./emoji/${reaction}.svg`}
                          width="15px"
                        />
                      </div>
                    );
                  }
                })}
                {statusesReactionQuantity > 0 && statusesReactionQuantity}
              </div>
            </div>
          </div>
        </div>
        <div className="inline-block">
          <div className="flex space-x-2">
            {actions.map((action) => {
              return (
                <div key={nanoid()}>
                  {action.id === 1 ? (
                    <div>
                      <div
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        onClick={handleOnClickLike}
                        className="flex-1 flex justify-center items-center  cursor-pointer hover:underline rounded-md "
                      >
                        <div className="flex space-x-1 ">
                          <div
                            className={`text${statusReaction?.color} ${statusReaction?.font}`}
                          >
                            {statusReaction ? statusReaction.content : "Thích"}
                          </div>
                        </div>
                      </div>
                      {EmojiFlag === true && (
                        <ReactionMenu
                          position={"-top-0 left-1"}
                          handleOnClickReaction={handleOnClickReaction}
                          mouseEnter={mouseEnter}
                          mouseLeave={mouseLeave}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => handleOnClickAction(action.id)}
                      className="cursor-pointer hover:underline"
                    >
                      {action.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
