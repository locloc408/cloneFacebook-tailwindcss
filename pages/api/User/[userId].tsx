import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongoose/ConnectDB";
import User from "../../../lib/mongoose/model/User";
import { cors, runMiddleware } from "../../../lib/cors";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req , res,cors)
  await connectDB();
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      console.log(email);
      const storiesDB = await User.findOne({
        email: email,
      });
      res.status(200).json(storiesDB);
    }
    if (req.method === "GET") {
      const { userId } = req.query;
      console.log(userId);
      const user = await User.findOne({
        _id: userId,
      });
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
}
