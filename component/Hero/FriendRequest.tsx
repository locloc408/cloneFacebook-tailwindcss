import React from "react";
import { Avatar } from "../Avatar/Avatar";

export const FriendRequest = () => {
  return (
    <div className="px-2 ">
      <div className="flex justify-between">
        <p className="pl-2">Friend Requests</p>
        <p className="text-primary">See All</p>
      </div>
      <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer ">
        <Avatar
          rounded={"rounded-full"}
          src="http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
          active={false}
          height={"h-12"}
          width={"w-12"}
          shadow="shadow"
        />
        <div className="w-full ">
          <div className="flex justify-between">
            <p className="text-base font-medium">Lộc Nguyễn</p>
            <p>6d</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button className="text-white bg-primary rounded-lg w-1/2 hover:opacity-80">
              ConFirm
            </button>
            <button className="text-black bg-gray-300 rounded-lg w-1/2 hover:opacity-60">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
