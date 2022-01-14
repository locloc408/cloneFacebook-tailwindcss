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
    const { viewerId, storyId } = req.body;
    if (req.method === "PUT") {
      const find = await Story.findOne({
        userId: userId,
        stories: {
          $elemMatch: {
            _id: storyId,
            viewerIds: viewerId,
          },
        },
      });
      if (find) {
        return res.status(200).json(find);
      } else {
        const updated = await Story.findOneAndUpdate(
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
              "stories.$.viewerIds": viewerId,
            },
          },
          {
            new: true,
          }
        );
        return res.status(200).json(updated);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
