import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Story from "../../../../lib/mongoose/model/Stories";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { userId, type } = req.query;
  try {
    if (req.method === "POST") {
      if (type === "ADD-STORY") {
        const found = await Story.findOne({ userId: userId });
        if (found) {
          //update story with already user
          const update = await Story.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                stories: req.body,
              },
            },
            { new: true }
          );
          return res.status(200).json(update);
        } else {
          //create a new user Story
          const insert = await Story.create({
            userId: userId,
            stories: [req.body],
          });
          return res.status(200).json(insert);
        }
      }
    }
    if (req.method === "GET") {
      if (type === "GET-ONE") {
        const story = await Story.findOne({ userId: userId });
        res.status(200).json(story);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
