import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Story from "../../../../lib/mongoose/model/Stories";
import mongoose from "mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    const { userId } = req.query;
    const { viewerId, type, storyId } = req.body;
    console.log(req.body);
    if (req.method === "POST") {
      const found = await Story.findOneAndUpdate(
        {
          userId: new mongoose.Types.ObjectId(userId as string),
          stories: {
            $elemMatch: {
              _id: storyId,
            },
          },
        },
        {
          $push: {
            "stories.$.viewerReaction": {
              type,
              viewerId: new mongoose.Types.ObjectId(viewerId as string),
            },
          },
        },
        { new: true }
      ).populate("userId");
      return res.status(200).json(found);
    }
  } catch (error) {
    console.log(error);
  }
}
