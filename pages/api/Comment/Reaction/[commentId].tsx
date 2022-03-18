import { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "../../../../lib/mongoose/ConnectDB";
import Comment from "../../../../lib/mongoose/model/Comment";
import mongoose from "mongoose";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ConnectDB();
  const { commentId } = req.query;
  const { userId, reactionType } = req.body;
  try {
    if (req.method === "POST") {
      const alreadyReact = await Comment.findOne({
        _id: new mongoose.Types.ObjectId(commentId as string),
        UserReaction: {
          $elemMatch: {
            userId: new mongoose.Types.ObjectId(userId as string),
          },
        },
      });
      if (alreadyReact) {
        console.log("1");
        const update = await Comment.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(commentId as string),
            UserReaction: {
              $elemMatch: {
                userId: new mongoose.Types.ObjectId(userId as string),
              },
            },
          },
          {
            $set: {
              "UserReaction.$[e1]": {
                reactionType: reactionType,
                userId: new mongoose.Types.ObjectId(userId as string),
              },
            },
          },
          {
            arrayFilters: [
              { "e1.userId": new mongoose.Types.ObjectId(userId as string) },
            ],
            new: true,
          }
        );
        res.status(200).json(update);
      } else {
        console.log("2");
        const update = await Comment.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(commentId as string),
          },
          {
            $push: {
              UserReaction: {
                userId: new mongoose.Types.ObjectId(userId as string),
                reactionType: reactionType,
              },
            },
          }
        );
        res.status(200).json(update);
      }
    }
    if (req.method === "GET") {
      const find = await Comment.findById({
        commentId,
      });
      res.status(200).json(find);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
