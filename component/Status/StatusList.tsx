import axios from "axios";
import React from "react";
import { StatusResponseList } from "../../type/Status";
import { statusResponseItems } from "../../redux/slice/status";
import { useAppSelector } from "../../redux/hooks";
import { StatusItems } from "./StatusItems";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { UserType } from "../../type/User";
export const StatusList = () => {
  const StatusResponseItems = useAppSelector(statusResponseItems);
  const [statuses, setStatuses] = useState<StatusResponseList[]>([]);
  const [user, setUser] = useState<UserType>();
  console.log(statuses);
  const getStatus = async () => {
    const status = await fecthData.getStatuses("61b5cfe89f7f6d222bab9d67");
    setStatuses(status);
  };
  const getPostUser = async () => {
    const user = await fecthData.getUserById("61b5cfe89f7f6d222bab9d67");
    setUser(user);
  };
  useEffect(() => {
    getStatus();
    getPostUser();
  }, []);
  return (
    <div className="flex flex-col items-center mt-6">
      {StatusResponseItems.map((status) => {
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
              user={user as UserType}
              statusId={status.statusId}
            />
          </div>
        );
      })}
      {statuses?.map((status) => {
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
                user={status.userId}
                statusId={status.status[status?.status.length - 1]._id}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
