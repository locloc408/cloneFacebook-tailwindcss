import { ObjectId } from "mongoose";

export interface LeftSideMenuType {
  img: string;
  title: string;
  _id: ObjectId;
  link: {
    pathname: string;
  };
}
