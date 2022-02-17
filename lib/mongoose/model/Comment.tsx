import mongoose, { Schema } from "mongoose";
const Comment = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  statusId: {
    type: Schema.Types.ObjectId,
    ref: "Status",
  },
  text: {
    default: "",
    type: String,
  },
  UserReaction: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      reactionType: String,
    },
  ],
});
export default mongoose.models.Comment || mongoose.model("Comments", Comment);
