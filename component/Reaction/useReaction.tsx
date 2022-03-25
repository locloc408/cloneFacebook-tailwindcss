import React, { memo, useMemo } from "react";
import { UserReaction } from "../../type/Status";
import { UserType } from "../../type/User";
interface InputType {
  caseReactionRes: UserReaction[];
  caseId: string;
  caseUserId: string;
  caseFetch: string;
}
import { useEffect, useState, useRef } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { Emoji } from "../dummyData/emoji";
import { EmojiType } from "../../type/Emoji";
import { getUnique } from "../../utils/utils";
export const useReaction = ({
  caseReactionRes,
  caseId,
  caseUserId,
  caseFetch,
}: InputType) => {
  const [EmojiFlag, setEmojiFlag] = useState(false);
  const [likeFlag, setLikeFlag] = useState<boolean>(false);
  const findEmoji = (emojiType: string) => {
    const emoji = Emoji.find((emo) => emo.type === emojiType);
    return emoji;
  };

  const [statusReaction, setStatusReaction] = useState<EmojiType>(
    () => findEmoji("unLike") as EmojiType
  );

  const [Reactions, setReaction] = useState(() =>
    caseReactionRes?.filter((reaction) => reaction.reactionType !== "unLike")
  );

  const [uniqueReactions, setUniqueReactions] = useState<string[]>(() =>
    getUnique(Reactions, "reactionType")
  );

  const alreadyLikeUser = useMemo(() => {
    return caseReactionRes.find(
      (reaction) => reaction.userId === "61b5cfe89f7f6d222bab9d67"
    );
  }, [caseReactionRes]);
  const [statusesReactionQuantity, setStatusesReactionQuantity] =
    useState<number>(Reactions.length);
  const flag = useRef<any>(null);
  const pause = useRef<boolean>(false);

  useEffect(() => {
    setUniqueReactions(getUnique(Reactions, "reactionType"));
  }, [Reactions]);

  useEffect(() => {
    if (alreadyLikeUser) {
      if (alreadyLikeUser.reactionType !== "unLike") {
        setStatusReaction(
          () => findEmoji(alreadyLikeUser.reactionType) as EmojiType
        );
        setLikeFlag(true);
      }
    }
  }, []);
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
  const handleOnClickReaction = async (type: string) => {
    pause.current = true;
    setEmojiFlag(false);
    setLikeFlag(true);
    if (uniqueReactions.includes(type) === false) {
      setUniqueReactions([...uniqueReactions, type]);
    }
    const userReaction = Reactions.find(
      (react) => react.userId === "61b5cfe89f7f6d222bab9d67"
    );
    //check if in the unique reaction array has only this user reaction type
    if (userReaction) {
      //if it has this user reaction type then replace it
      console.log(type);
      setReaction(
        Reactions.map((reaction) => {
          if (reaction.userId === "61b5cfe89f7f6d222bab9d67") {
            return {
              userId: "61b5cfe89f7f6d222bab9d67",
              reactionType: type,
            };
          }
          return reaction;
        })
      );
      setStatusReaction(() => findEmoji(type) as EmojiType);
      switch (caseFetch) {
        case "status":
          await fecthData.postStatusReaction(caseUserId, {
            userId: "61b5cfe89f7f6d222bab9d67",
            reactionType: type,
            statusId: caseId,
          });

          break;
        case "comment":
          await fecthData.postCommentReaction(caseId, {
            userId: "61b5cfe89f7f6d222bab9d67",
            reactionType: type,
          });
          break;
      }
    } else {
      //else add a new reaction

      setReaction([
        ...Reactions,
        {
          userId: "61b5cfe89f7f6d222bab9d67",
          reactionType: type,
        },
      ]);
      setStatusesReactionQuantity(statusesReactionQuantity + 1);
    }
    setStatusReaction(() => findEmoji(type) as EmojiType);
    switch (caseFetch) {
      case "status":
        await fecthData.postStatusReaction(caseUserId, {
          userId: "61b5cfe89f7f6d222bab9d67",
          reactionType: type,
          statusId: caseId,
        });
        break;
      case "comment":
        await fecthData.postCommentReaction(caseId, {
          userId: "61b5cfe89f7f6d222bab9d67",
          reactionType: type,
        });
        break;
    }
  };

  const handleOnClickLike = async () => {
    if (alreadyLikeUser) {
      if (likeFlag === true) {
        const userReaction = Reactions.find(
          (react) => react.userId === "61b5cfe89f7f6d222bab9d67"
        );
        //check if in the unique reaction array has only this user reaction type
        if (userReaction) {
          setReaction(
            Reactions.filter((react) => react.userId !== userReaction.userId)
          );
        }
        setStatusReaction(() => findEmoji("unLike") as EmojiType);
        setStatusesReactionQuantity(statusesReactionQuantity - 1);
        setLikeFlag(false);
      } else {
        if (!uniqueReactions.includes("like")) {
          setUniqueReactions([...uniqueReactions, "like"]);
        }
        setReaction([
          ...Reactions,
          {
            userId: "61b5cfe89f7f6d222bab9d67",
            reactionType: "like",
          },
        ]);
        setStatusReaction(() => findEmoji("like") as EmojiType);
        setStatusesReactionQuantity(statusesReactionQuantity + 1);
        setLikeFlag(true);
      }
    } else {
      if (likeFlag === true) {
        console.log("lalal");
        setLikeFlag(false);
        const userReaction = Reactions.find(
          (react) => react.userId === "61b5cfe89f7f6d222bab9d67"
        );
        //check if in the unique reaction array has only this user reaction type
        if (userReaction) {
          setReaction(
            Reactions.filter((react) => react.userId !== userReaction.userId)
          );
        }
        setStatusReaction(() => findEmoji("unLike") as EmojiType);
        setStatusesReactionQuantity(statusesReactionQuantity - 1);
      } else {
        if (!uniqueReactions.includes("like")) {
          setUniqueReactions([...uniqueReactions, "like"]);
        }
        setReaction([
          ...Reactions,
          {
            userId: "61b5cfe89f7f6d222bab9d67",
            reactionType: "like",
          },
        ]);
        setStatusReaction(() => findEmoji("like") as EmojiType);
        setStatusesReactionQuantity(statusesReactionQuantity + 1);
        setLikeFlag(true);
      }
    }
  };
  return {
    EmojiFlag,
    uniqueReactions,
    statusesReactionQuantity,
    statusReaction,
    likeFlag,
    mouseEnter,
    mouseLeave,
    handleOnClickLike,
    handleOnClickReaction,
  };
};
