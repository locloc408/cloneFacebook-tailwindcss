import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/mongoose/ConnectDB";
import Users from "../../lib/mongoose/model/User";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    if (req.method === "GET") {
      const found = await Users.find();
      res.status(200).json(found);
    }
  } catch (error) {
    console.log(error);
  }
}
