import React, { useRef, useState } from "react";
import { CommentItem } from "./CommentItems";
import { CommentRes } from "../../type/Comment";
import { UserReaction } from "../../type/Comment";
import { UserType } from "../../type/User";
import CustomNode from "../testComp/CustomNode";
export const CommentNode = ({
  comment,
  UserReaction,
  userId,
  statusId,
}: {
  comment: CommentRes;
  UserReaction: UserReaction[];
  userId: UserType;
  statusId: string;
}) => {
  return (
    <div>
      <CustomNode
        comment={comment}
        UserReaction={UserReaction}
        userId={userId}
        statusId={statusId}
      />
    </div>
  );
};
