import mongoose, { Schema } from "mongoose";
export const StatusContain = new Schema(
  {
    ImageUrl: {
      type: String,
      default: "",
    },
    textInput: {
      type: String,
      default: "",
    },
    commenters: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        text: {
          type: String,
          default: "",
        },
      },
    ],
    usersReaction: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        reactionType: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Status = new Schema({
  statusUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  status: [StatusContain],
});

export default mongoose.models.Status || mongoose.model("Status", Status);
