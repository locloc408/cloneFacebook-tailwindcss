import { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "../../../lib/mongoose/ConnectDB";
import Comment from "../../../lib/mongoose/model/Comment";
import SubComment from "../../../lib/mongoose/model/SubComment";
import mongoose from "mongoose";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ConnectDB();
  const { userId, textInput, replyCommentId, _id, statusId } = req.body;
  try {
    if (req.method === "POST") {
      const created = await SubComment.insertMany([
        {
          replyCommentId: new mongoose.Types.ObjectId(replyCommentId as string),
          userId: new mongoose.Types.ObjectId(userId as string),
          textInput,
          _id: new mongoose.Types.ObjectId(_id),
          statusId,
        },
      ]);
      const update = await Comment.findByIdAndUpdate(
        replyCommentId,
        {
          $push: {
            SubComments: {
              SubCommentsId: new mongoose.Types.ObjectId(_id as string),
            },
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(update);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
