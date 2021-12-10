import mongoose, { Schema, models, model } from "mongoose";
export const User = new Schema({
  img: String,
  name: String,
  isOnline: Boolean,
  isFriend: Boolean,
  linktoProfile: String,
  sex: String,
  friendsId: Array,
  followerId: Array,
  followingId: Array,
});
export default mongoose.models.Users || mongoose.model("Users", User);
