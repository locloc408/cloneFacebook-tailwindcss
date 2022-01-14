import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongoose/ConnectDB";
import User from "../../../lib/mongoose/model/User";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      const user = await User.findById(userId);
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
}
