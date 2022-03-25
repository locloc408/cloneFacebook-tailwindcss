import mongoose, { Schema } from "mongoose";
export const SubComment = new Schema(
  {
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
    UserReaction: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        reactionType: String,
      },
    ],
    statusId: String,
  },
  { timestamps: true }
);

export default mongoose.models.SubComments ||
  mongoose.model("SubComments", SubComment);
