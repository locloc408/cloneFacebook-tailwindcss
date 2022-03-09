import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Status from "../../../../lib/mongoose/model/Status";
import User from "../../../../lib/mongoose/model/User";
import mongoose from "mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    const { userId } = req.query;

    if (req.method === "POST") {
      const findStatus = await Status.findOne({
        statusUser: new mongoose.Types.ObjectId(userId as string),
      });

      if (findStatus !== null) {
        const updated = await Status.findOneAndUpdate(
          {
            statusUser: new mongoose.Types.ObjectId(userId as string),
          },
          {
            $push: {
              status: req.body,
            },
          }
        );
        return res.status(200).json(updated);
      } else {
        const statusCreated = await Status.insertMany({
          statusUser: new mongoose.Types.ObjectId(userId as string),
          status: [req.body],
        });
        return res.status(200).json(statusCreated);
      }
    }
    if (req.method === "GET") {
      const user = await User.findById(userId);
      const friendsId = user.friendsId;
      const friendsStatus = await Promise.all(
        friendsId.map((id: string) => {
          const status = Status.findOne({
            statusUser: new mongoose.Types.ObjectId(id),
          }).populate("statusUser");

          return status;
        })
      );
      console.log(friendsStatus);
      return res.status(200).json(friendsStatus);
    }
  } catch (error) {
    console.log(error);
  }
}
