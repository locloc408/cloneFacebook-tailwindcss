import mongoose, { Schema, models, model } from "mongoose";
export const User = new Schema({
  img: String,
  name: String,
  isOnline: Boolean,
  linktoProfile: String,
  sex: String,
  friendsId: {
    type: Array,
    default: [],
  },
  followerId: {
    type: Array,
    default: [],
  },
  followingId: {
    type: Array,
    default: [],
  },
  email: String,
});
export default mongoose.models.Users || mongoose.model("Users", User);
