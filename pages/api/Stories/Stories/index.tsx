import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/mongoose/ConnectDB";
import Story from "../../../../lib/mongoose/model/Stories";
import { StoryContainer } from "../../../../type/Stories";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    if (req.method === "POST") {
      const found = await Story.insertMany([req.body]);
      res.status(200).json(found);
    }
    if (req.method === "GET") {
      //stories that is not watched
      const isNotWatch = await Story.find({
        stories: {
          $nin: {
            viewerReaction: {
              $elemMatch: {
                viewerId: "61b5cfe89f7f6d222bab9d67",
              },
            },
          },
        },
      }).populate("userId");
      const isWatch = await Story.find({
        stories: {
          viewerReaction: {
            $elemMatch: {
              viewerId: "61b5cfe89f7f6d222bab9d67",
            },
          },
        },
      }).populate("userId");
      const isWatchAllStory = isWatch.filter((x) =>
        x.stories.every((story: StoryContainer) =>
          story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
        )
      );
      //stories that is not watched all (example : got 2 stories but got 1 is watched )
      const isNotWatchAll = isWatch.filter(
        (x) =>
          !x.stories.every((story: StoryContainer) =>
            story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
          )
      );

      const stories = [...isNotWatch, ...isNotWatchAll, ...isWatchAllStory];
      res.status(200).json(stories);
    }
  } catch (error) {
    console.log(error);
  }
}
