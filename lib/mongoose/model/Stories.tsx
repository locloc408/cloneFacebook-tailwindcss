import mongoose, { Schema } from "mongoose";
export const StoriesContain = new Schema(
  {
    ImageStory: {
      type: String,
      default: "/backgroundStories/1.jpg",
    },
    textInput: {
      type: String,
      default: "",
    },
    textStyle: {
      type: String,
      default: "lowercase",
    },
    commenters: [
      {
        text: {
          type: String,
          default: "",
        },
        viewerId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      },
    ],
    style: {
      type: Object,
      default: {},
    },
    viewerReaction: [
      {
        type: {
          type: String,
          default: "",
        },
        viewerId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      },
    ],
    viewerIds: [String],
  },
  { timestamps: true }
);
export const Story = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  stories: [StoriesContain],
});

export default mongoose.models.Stories || mongoose.model("Stories", Story);
