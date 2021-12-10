import axiosClient from "./ClientAxios";
import { UserType } from "../../type/User";
export const fecthData = {
  getFriendsLists: async () => {
    const url = "/RightSideMenuFriends";
    const res: UserType[] = await axiosClient.get(url);
    return res;
  },
};
