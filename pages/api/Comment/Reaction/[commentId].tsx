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
        _id: commentId,
        UserReaction: {
          $elemMatch: {
            userId: new mongoose.Types.ObjectId(userId as string),
          },
        },
      });
      if (alreadyReact) {
        console.log("1");
        await alreadyReact.updateOne(
          {},
          {
            $set: {
              "UserReaction.$[e1]": {
                userId: new mongoose.Types.ObjectId(userId as string),
                reactionType: reactionType,
              },
            },
          },
          {
            arrayFilters: [
              { "e1._userId": new mongoose.Types.ObjectId(userId as string) },
            ],
            new: true,
          }
        );
      } else {
        console.log("2");
        await alreadyReact.findOneAndUpdateOne(
          {
            _id: commentId,
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
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
