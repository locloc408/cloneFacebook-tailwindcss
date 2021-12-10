import mongoose, { Schema } from "mongoose";
import { ObjectId } from "bson";
export const collection4ds = new Schema({
  title: String,
  img: String,
  _id: ObjectId,
  link: {
    pathname: String,
    query: {},
  },
});
export default mongoose.models.LeftSideMenuGroups ||
  mongoose.model("LeftSideMenuGroups", collection4ds);
