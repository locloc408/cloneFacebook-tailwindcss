import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Status, { UserReaction } from "../../../../lib/mongoose/model/Status";
import { StatusResponseList } from "../../../../type/Status";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { PostOwenerId } = req.query;
  console.log(req.body);

  try {
    if (req.method === "POST") {
      const find = await Status.findOne({
        userId: PostOwenerId,
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
            userId: PostOwenerId,
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
        console.log(found);
        res.status(200).json(found);
      } else {
        const found = await Status.findOneAndUpdate(
          {
            userId: PostOwenerId,
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
        console.log(found);
        return res.status(200).json({
          data: found,
        });
      }
    }
    if (req.method === "GET") {
      const find: StatusResponseList = await Status.findOne({
        userId: PostOwenerId,
      });
      const userReaction = find.status.map((stat) => stat.usersReaction);
      res.status(200).json(userReaction);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
