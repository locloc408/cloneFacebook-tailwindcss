import React from "react";
import useSWR from "swr";
import { uid } from "uid";
import { fecthData } from "../../lib/axios/fetchClientData";
import CustomNode from "../testComp/CustomNode";
import { CommentItem } from "./CommentItems";
export const CommentList = ({ statusId }: { statusId: string }) => {
  const fetcher = async () => {
    const Comments = await fecthData.getComments(statusId);
    return Comments;
  };
  const { data } = useSWR(`${statusId}`, fetcher);
  const comments = data;

  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div className="relative" key={uid()}>
            <CustomNode Component={<CommentItem comment={comment} />} />
          </div>
        );
      })}
    </div>
  );
};
