import { nanoid } from "@reduxjs/toolkit";
import React, { memo, useEffect, useState } from "react";
import useSWR from "swr";
import { fecthData } from "../../lib/axios/fetchClientData";
import { useAppSelector } from "../../redux/hooks";
import { showStatusWhenPost } from "../../redux/slice/status";
import { UserType } from "../../type/User";
import { StatusItems } from "./StatusItems";
import { StatusResponseList } from "../../type/Status";
const statusList = ({
  data,
  user,
}: {
  data: StatusResponseList[];
  user: UserType;
}) => {
  const ShowStatusWhenPost = useAppSelector(showStatusWhenPost);

  return (
    <div className="flex flex-col items-center mt-6">
      {ShowStatusWhenPost.map((status) => {
        return (
          <div
            key={nanoid()}
            className="bg-white mt-2 rounded-md"
            style={{ width: "500px" }}
          >
            <StatusItems
              statusReactionRes={[]}
              statusContent={status.textInput}
              statusImage={status.ImageUrl}
              statusUser={user as UserType}
              statusId={status.statusId}
            />
          </div>
        );
      })}
      {data?.map((status) => {
        if (status !== null) {
          return (
            <div
              key={nanoid()}
              className="bg-white mt-2 rounded-md"
              style={{ width: "500px" }}
            >
              <StatusItems
                statusReactionRes={
                  status.status[status.status.length - 1].usersReaction
                }
                statusContent={
                  status?.status[status?.status.length - 1].textInput
                }
                statusImage={status?.status[status?.status.length - 1].ImageUrl}
                statusUser={status.statusUser}
                statusId={status.status[status?.status.length - 1]._id}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export const StatusList = memo(statusList);
