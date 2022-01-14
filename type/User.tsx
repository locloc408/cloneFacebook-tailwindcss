import { ObjectId } from "mongoose";
import { StoryType } from "./Stories";
export interface UserType {
  _id: string;
  img: string;
  name: string;
  linktoProfile: string;
  sex: string;
  friendsId: string[];
  followerId: string[];
  followingId: string[];
  email: string;
}
