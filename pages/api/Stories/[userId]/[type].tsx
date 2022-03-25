import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Story from "../../../../lib/mongoose/model/Stories";
import { cors, runMiddleware } from "../../../../lib/cors";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await connectDB();
  const { userId, type } = req.query;
  try {
    if (req.method === "POST") {
      if (type === "ADD-STORY") {
        const found = await Story.findOne({
          userId: new mongoose.Types.ObjectId(userId as string),
        });
        if (found) {
          //update story with already user
          const update = await Story.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId as string) },
            {
              $push: {
                stories: req.body,
              },
            },
            { new: true }
          ).populate("userId");

          return res.status(200).json(update);
        } else {
          //create a new user Story
          const insert = await Story.insertMany([
            {
              userId: new mongoose.Types.ObjectId(userId as string),
              stories: [req.body],
            },
          ]);
          console.log(insert);
          return res.status(200).json(insert);
        }
      }
    }
    if (req.method === "GET") {
      if (type === "GET-ONE") {
        const story = await Story.findOne({
          userId: new mongoose.Types.ObjectId(userId as string),
        }).populate("userId");
        console.log(story);
        res.status(200).json(story);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
