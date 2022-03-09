import React from "react";
import { uid } from "uid";
import { CommentRes } from "../../type/Comment";
import { Avatar } from "../Avatar/Avatar";
import { CommentAction } from "./CommentAction";
import { useReaction } from "../Reaction/useReaction";
import { ReactionMenu } from "../Reaction/ReactionMenu";

export const CommentItem = ({ comment }: { comment: CommentRes }) => {
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
  console.log("2");
  return (
    <div className="flex space-x-1 mb-2 ml-1 relative">
      <div>
        <Avatar
          size="h-9 w-9"
          src={comment.userId.img}
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
            className="bg-gray-200 rounded-lg px-2 pt-1 inline-block"
          >
            <div
              style={{
                lineHeight: "1.2380",
                fontSize: "0.8125",
                fontWeight: "600px",
              }}
            >
              {comment.userId.name}
            </div>
            <div>{comment.textInput}</div>
          </div>
        </div>
        <div className="inline-block">
          <div className="flex space-x-2">
            {actions.map((action) => {
              return (
                <div key={uid()}>
                  <CommentAction action={action} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
