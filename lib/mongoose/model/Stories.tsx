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
    commenterId: {
      type: Array,
      default: [],
    },
    likeIds: {
      type: Array,
      default: [],
    },
    viewerIds: {
      type: Array,
      default: [],
    },
    style: {
      type: Object,
      default: {},
    },
    viewerReaction: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Story = new Schema({
  userId: "",
  stories: [StoriesContain],
});

export default mongoose.models.Stories || mongoose.model("Stories", Story);
