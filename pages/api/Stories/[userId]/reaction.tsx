import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Story from "../../../../lib/mongoose/model/Stories";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    const { userId } = req.query;
    const { viewerId, type, storyId } = req.body;
    if (req.method === "POST") {
      const found = await Story.findOneAndUpdate(
        {
          userId: userId,
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
              viewerId,
            },
          },
        },
        { new: true }
      );
      return res.status(200).json(found);
    }
  } catch (error) {
    console.log(error);
  }
}
