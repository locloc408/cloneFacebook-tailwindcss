import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { fecthData } from "../../lib/axios/fetchClientData";
import { CommentRes } from "../../type/Comment";
import { CommentItem } from "./CommentItems";
import useSWR from "swr";
import { ReactionMenu } from "../Reaction/ReactionMenu";
export const CommentList = ({ statusId }: { statusId: string }) => {
  const fetcher = async () => {
    const Comments = await fecthData.getComments(statusId);
    return Comments;
  };
  const { data } = useSWR(`${statusId}`, fetcher);
  const comments = data;
  console.log(comments);
  const commentRes = [
    {
      userId: "61bb16f29e4e9229d13fde15",
      reactionType: "love",
      _id: "620cc6f2e4dd796f04c7b4ee",
    },
    {
      userId: "61b5cfe89f7f6d222bab9d67",
      reactionType: "angry",
      _id: "621b416f65ed77e41e07bb7a",
    },
  ];
  return (
    <div>
      {comments?.map((comment) => (
        <div key={uid()}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </div>
  );
};
