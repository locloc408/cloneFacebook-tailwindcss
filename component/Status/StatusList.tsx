import axios from "axios";
import React, { memo } from "react";
import { StatusResponseList } from "../../type/Status";
import { showStatusWhenPost } from "../../redux/slice/status";
import { useAppSelector } from "../../redux/hooks";
import { StatusItems } from "./StatusItems";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { UserType } from "../../type/User";
import useSWR from "swr";
const statusList = () => {
  const ShowStatusWhenPost = useAppSelector(showStatusWhenPost);
  const [user, setUser] = useState<UserType>();
  const getStatus = async () => {
    const status = await fecthData.getStatuses("61b5cfe89f7f6d222bab9d67");
    return status;
  };
  const { data } = useSWR("61b5cfe89f7f6d222bab9d67", getStatus);
  const getUser = async () => {
    const user = await fecthData.getUserById("61b5cfe89f7f6d222bab9d67");
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
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
