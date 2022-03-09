import { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "../../../../lib/mongoose/ConnectDB";
import Comment from "../../../../lib/mongoose/model/Comment";
import mongoose from "mongoose";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ConnectDB();
  const { statusId } = req.query;
  const { userId, textInput } = req.body;
  const comments = await Comment.find({
    statusId: new mongoose.Types.ObjectId(statusId as string),
  }).populate("userId");
  try {
    if (req.method === "GET") {
      return res.status(200).json(comments);
    }
    if (req.method === "POST") {
      const Createdcomment = await Comment.create({
        userId: new mongoose.Types.ObjectId(userId),
        statusId: new mongoose.Types.ObjectId(req.body.statusId),
        textInput,
      });
      const comment = await Createdcomment.populate("userId");
      return res.status(200).json([...comments, comment]);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
