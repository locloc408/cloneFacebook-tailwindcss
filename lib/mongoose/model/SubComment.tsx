import mongoose, { Schema } from "mongoose";
export const SubComment = new Schema(
  {
    replyUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    replyCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    textInput: {
      type: String,
      default: "",
    },
    userReaction: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        reactionType: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SubComment ||
  mongoose.model("SubComment", SubComment);
