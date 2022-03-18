import React from "react";
import { Emoji } from "../dummyData/emoji";
interface ActionType {
  handleOnClickReaction: (type: string) => void;
  mouseLeave: () => void;
  mouseEnter: () => void;
  position: string;
}
export const ReactionMenu = ({
  handleOnClickReaction,
  mouseLeave,
  mouseEnter,
  position,
}: ActionType) => {
  return (
    <div
      className={
        "absolute flex space-x-1 bg-white rounded-full border-2 border-gray-200 h-12  z-50 " +
        position
      }
      style={{
        width: "300px",
      }}
    >
      {Emoji.map((emoji) => {
        if (emoji.type !== "unLike") {
          return (
            <div
              key={emoji.id}
              className="hover:scale-125 cursor-pointer transform"
              onClick={() => handleOnClickReaction(emoji.type)}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <img
                style={{
                  height: "50px",
                  width: "50px",
                }}
                src={`/emoji/${emoji?.type}.svg`}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
