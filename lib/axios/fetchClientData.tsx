import { CommentForm, CommentRes } from "../../type/Comment";
import {
  StatusPostType,
  StatusResponseList,
  UserReaction,
  UserReactionPost,
} from "../../type/Status";
import {
  postStoryText,
  StoryType,
  StoryViewerReact,
  WatchedStoryType,
} from "../../type/Stories";
import { UserType } from "../../type/User";
import axiosClient from "./ClientAxios";

export const fecthData = {
  getFriendsLists: async () => {
    const url = "/RightSideMenuFriends";
    const res: UserType[] = await axiosClient.get(url);
    return res;
  },

  //Story
  postStories: async (story: postStoryText) => {
    const url = "/Stories/" + story.userId + "/ADD-STORY";
    await axiosClient.post(url, story);
  },
  getStoryByUserId: async (id: string) => {
    const url = "/Stories/" + id + "/GET-ONE";
    const res: StoryType = await axiosClient.get(url);
    return res;
  },
  getStories: async () => {
    const url = "/Stories/Stories";
    const res: StoryType[] = await axiosClient.get(url);
    return res;
  },
  postStoryReaction: async (data: StoryViewerReact) => {
    const url = "/Stories/" + data.userId + "/reaction";
    const res: any = await axiosClient.post(url, data);
    return res;
  },
  setWatchedStory: async (data: WatchedStoryType) => {
    const url = "/Stories/" + data.userId + "/watched";
    const res = await axiosClient.put(url, data);
    return res;
  },

  //User
  getUserById: async (id: string) => {
    const url = "/User/" + id;
    const res: UserType = await axiosClient.get(url);
    return res;
  },
  postUser: async (story: StoryType) => {
    const url = "/User/User";
    await axiosClient.post(url, story);
  },

  //Status
  postStatus: async (userId: string, data: StatusPostType) => {
    const url = "/Status/" + userId;
    const res: StatusResponseList = await axiosClient.post(url, data);
    return res;
  },
  getStatuses: async (userId: string) => {
    const url = "/Status/" + userId;
    const res: StatusResponseList[] = await axiosClient.get(url);
    return res;
  },

  postStatusReaction: async (userId: string, data: UserReactionPost) => {
    const url = "/Status/" + userId + "/reaction";
    const res: StatusResponseList = await axiosClient.post(url, data);
    return res;
  },

  //Comment
  postComment: async (data: CommentForm) => {
    const url = "/Comment/" + data.statusId;
    const res: CommentRes[] = await axiosClient.post(url, data);
    return res;
  },
  getComments: async (statusId: string) => {
    const url = "/Comment/" + statusId;
    const res: CommentRes[] = await axiosClient.get(url);
    return res;
  },
  postCommentReaction: async (commentId: string, data: UserReaction) => {
    const url = "/Comment/Reaction/" + commentId;
    const res = await axiosClient.post(url, data);
    return res;
  },

  //
};
