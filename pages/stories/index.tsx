import { Navbar } from "../../component/Navbar/Menu";
import { ListItemWithIcon } from "../../component/ListItemWithIcon/ListItemWithIcon";
import { Divide } from "../../component/Divide/Divide";
import { GetServerSideProps } from "next";
import Story from "../../lib/mongoose/model/Stories";
import { sortStory } from "../../utils/utils";
import { LatestStory } from "../../type/Stories";
import { StoryComp } from "../../component/Story/WatchStory/StoryComp";
import { nanoid } from "@reduxjs/toolkit";
const StoriesListPage = ({ latesStories }: { latesStories: LatestStory[] }) => {
  return (
    <div>
      <Navbar />
      <div className="flex mt-14 ">
        <div
          className="shadow fixed w-1/4"
          style={{ height: "calc(100vh - 56px)" }}
        >
          <div className="mx-2">
            <div className="flex justify-between mx-2 pt-4 items-end">
              <p className="font-medium text-2xl">Tin</p>
              <div className="flex">
                <div className="text-primary mr-2">Kho Lưu Trữ</div>
                <div className="text-primary">Cài Đặt</div>
              </div>
            </div>
            <div className="pt-4">
              <ListItemWithIcon
                url=""
                margin="ml-3"
                isActive={true}
                size="w-9 h-9"
                bg="bg-primary"
                title="Lướt xem tất cả"
                news={false}
                height="h-13"
                padding="p-1"
                Icon={() => {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="white"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  );
                }}
              />
            </div>
            <div className="my-3">
              <Divide />
            </div>
            <div className="mx-2">
              <div className="text-base font-medium mb-1">Tin Của Bạn</div>
              <ListItemWithIcon
                url="/CreateStory"
                margin="ml-3"
                height="h-12"
                isActive={false}
                title="Thêm Vào tin"
                bg="bg-gray-100"
                size="h-9 w-9"
                news={false}
                padding=""
                Icon={() => {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-gray-100  w-3/4 h-screen"
          style={{ marginLeft: "340px" }}
        >
          <div style={{ width: "936px" }}>
            <div className="p-6">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-lg font-medium ">Tất Cả Tin</div>
                  <div className="text-gray-500">
                    Bộ sưu tập tin của bạn bè, các trang và nhóm mà bạn theo dõi
                  </div>
                </div>
                <div>
                  <button className="text-primary hover:bg-gray-200 p-2">
                    Phát Tất Cả
                  </button>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-4 gap-1">
                  {latesStories?.map((latestStory) => {
                    return (
                      <StoryComp
                        text={latestStory.last.textInput}
                        textStyle={latestStory.last.textStyle}
                        height="190px"
                        key={nanoid()}
                        img={latestStory.last.ImageStory}
                        user={latestStory.user}
                        storyId={latestStory.last._id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesListPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const stories = await Story.find().populate("userId");
  const Stories = JSON.parse(JSON.stringify(stories));
  const latesStories = sortStory(Stories);

  return {
    props: {
      latesStories,
    },
  };
};
