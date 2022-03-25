import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Status from "../../../../lib/mongoose/model/Status";
import { StatusResponseList } from "../../../../type/Status";
import { cors, runMiddleware } from "../../../../lib/cors";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  await connectDB();
  const { userId } = req.query;

  try {
    if (req.method === "POST") {
      const find = await Status.findOne({
        userId: userId,
        status: {
          $elemMatch: {
            _id: req.body.statusId,
            usersReaction: {
              $elemMatch: {
                userId: req.body.userId,
              },
            },
          },
        },
      });
      if (find === null) {
        const found = await Status.findOneAndUpdate(
          {
            statusUser: userId,
          },
          {
            $push: {
              "status.$[e1].usersReaction": {
                userId: req.body.userId,
                reactionType: req.body.reactionType,
              },
            },
          },
          {
            arrayFilters: [{ "e1._id": req.body.statusId }],
            new: true,
          }
        );
        res.status(200).json(found);
      } else {
        if (req.body.reactionType !== "unLike") {
          const found = await Status.findOneAndUpdate(
            {
              statusUser: userId,
            },
            {
              $set: {
                "status.$[e1].usersReaction.$[e2].reactionType":
                  req.body.reactionType,
              },
            },
            {
              arrayFilters: [
                { "e1._id": req.body.statusId },
                { "e2.userId": req.body.userId },
              ],
              new: true,
            }
          );
          return res.status(200).json(found);
        } else {
          const found = await Status.findOneAndUpdate(
            {
              statusUser: userId,
            },
            {
              $set: {
                "status.$[e1].usersReaction.$[e2].reactionType": "unLike",
              },
            },
            {
              arrayFilters: [
                { "e1._id": req.body.statusId },
                { "e2.userId": req.body.userId },
              ],
              new: true,
            }
          );
          return res.status(200).json(found);
        }
      }
    }
    if (req.method === "GET") {
      const find: StatusResponseList = await Status.findOne({
        statusUser: userId,
      });
      const userReaction = find.status.map((stat) => stat.usersReaction);
      res.status(200).json(userReaction);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
