import axiosClient from "./ClientAxios";
import { UserType } from "../../type/User";
import {
  postStoryText,
  StoryContainer,
  StoryType,
  StoryViewerReact,
  WatchedStoryType,
} from "../../type/Stories";
export const fecthData = {
  getFriendsLists: async () => {
    const url = "/RightSideMenuFriends";
    const res: UserType[] = await axiosClient.get(url);
    return res;
  },
  postStories: async (story: postStoryText) => {
    const url = "/Stories/" + story.userId + "/ADD-STORY";
    await axiosClient.post(url, story);
  },
  postUser: async (story: StoryType) => {
    const url = "/User/User";
    await axiosClient.post(url, story);
  },
  getStories: async () => {
    const url = "/Stories/Stories";
    const res: StoryType[] = await axiosClient.get(url);
    return res;
  },
  getUserById: async (id: string) => {
    const url = "/User/" + id;
    const res: UserType = await axiosClient.get(url);
    return res;
  },
  getStoryByUserId: async (id: string) => {
    const url = "/Stories/" + id + "/GET-ONE";
    const res: StoryType = await axiosClient.get(url);
    return res;
  },
  postReaction: async (data: StoryViewerReact) => {
    const url = "/Stories/" + data.userId + "/reaction";
    const res: any = await axiosClient.post(url, data);
    return res;
  },
  setWatchedStory: async (data: WatchedStoryType) => {
    const url = "/Stories/" + data.userId + "/watched";
    const res = await axiosClient.put(url, data);
    return res;
  },
};
