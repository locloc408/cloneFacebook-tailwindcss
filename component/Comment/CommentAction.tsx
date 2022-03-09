import React from "react";
import { uid } from "uid";
import { useReaction } from "../Reaction/useReaction";
import { ReactionMenu } from "../Reaction/ReactionMenu";
interface actionType {
  name: string;
  id: number;
  fontWeight: string;
}
export const CommentAction = ({ action }: { action: actionType }) => {
  const statusReactionRes = [
    {
      userId: "61bb16f29e4e9229d13fde15",
      reactionType: "love",
      _id: "620cc6f2e4dd796f04c7b4ee",
    },
    {
      userId: "61b5cfe89f7f6d222bab9d67",
      reactionType: "sad",
      _id: "621b416f65ed77e41e07bb7a",
    },
  ];
  const caseId = "621600d2d28a5a7f54cae961";
  const caseUserId = "61bb16f29e4e9229d13fde15";
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
    caseId,
    caseUserId,
    caseFetch: "comment",
  });
  return (
    <div>
      {action.id === 1 ? (
        <div>
          <div
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={handleOnClickLike}
            className="flex-1 flex justify-center items-center  cursor-pointer hover:bg-gray-100 rounded-md relative "
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
              top={"-top-0"}
              handleOnClickReaction={handleOnClickReaction}
              mouseEnter={mouseEnter}
              mouseLeave={mouseLeave}
            />
          )}
        </div>
      ) : (
        <div>{action.name}</div>
      )}
    </div>
  );
};
