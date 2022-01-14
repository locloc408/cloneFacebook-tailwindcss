export interface StoryContainer {
  ImageStory: string;
  textInput: string;
  textStyle: string;
  commenterId: string[];
  likeIds: StoryViewerReact[];
  viewerIds: string[];
  viewerReaction: StoryReact[];
  style: object;
  userId: string;
  _id: string;
}
export interface StoryType {
  userId: string;
  stories: StoryContainer[];
}
export interface LatestStory {
  id: string;
  last: StoryContainer;
  index: number;
}
export interface sortedUserStory {
  userId: string;
  index: number;
  storyContainer: StoryContainer;
}

export interface StoryViewerReact {
  type: string;
  viewerId: string;
  storyId: string;
  userId: string;
}

export interface StoryReact {
  type: string;
  viewerId: string;
}

export interface WatchedStoryType {
  viewerId: string;
  storyId: string;
  userId: string;
}
export interface sortedStoryType {
  index: number;
  storyContainer: StoryContainer;
}
export interface postStoryText {
  ImageStory: string;
  textInput: string;
  textStyle: string;
  style: object;
  userId: string;
}
