import { ObjectId } from "mongoose";

export interface UserType {
  _id: ObjectId;
  img: string;
  name: string;
  isOnline: boolean;
  isFriend: boolean;
  linktoProfile: String;
  sex: string;
  friendsId: string[];
  followerId: string[];
  followingId: string[];
}
