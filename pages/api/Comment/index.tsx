import { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "../../../lib/mongoose/ConnectDB";
import Comment from "../../../lib/mongoose/model/Comment";
import mongoose from "mongoose";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ConnectDB();
  const { userId, text, statusId } = req.body;
  try {
    if (req.method === "POST") {
      const comment = await Comment.create({
        userId: new mongoose.Types.ObjectId(userId),
        statusId: new mongoose.Types.ObjectId(statusId),
        text,
      });
      const findcomment = await Comment.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        statusId: new mongoose.Types.ObjectId(statusId),
        text,
      }).populate("userId");
      res.status(200).json(findcomment);
    }
  } catch (error) {}
};
export default handler;
