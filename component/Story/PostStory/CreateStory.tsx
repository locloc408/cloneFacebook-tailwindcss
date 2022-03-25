import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { } from "../../../redux/slice/Stories";
import { Avatar } from "../../Avatar/Avatar";
import { Divide } from "../../Divide/Divide";
import { MenuFeatures } from "../../dummyData/dummyMenuFeatures";
import { IconButton } from "../../IconButton/IconButton";
import { MenuFeature } from "../../Navbar/MenuFeature";
import { Tooltip } from "../../Tooltip/Tooltip";
import { ChangeParagraphStyle } from "./ChangeTextStyle";
import { CreateStoryWithImage } from "./CreateStoryWithImage";
import { CreateStoryWithText } from "./CreateStoryWithText";
import { OptionToChoseStory } from "./OptionToChoseStory";
export const CreateStory = () => {
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [isOpenTextInput, setIsOpenTextInput] = useState(false);
  const handleInputText = () => {
    setIsOpenTextInput(true);
  };
  const [isCreatedParamStory, setIsCreatedParamStory] = useState(false);
  const handleCreateParamStory = () => {
    setIsCreatedParamStory(true);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const router = useRouter();
  const hanldeMenuFeatureClick = (menuFeatureId: number) => {
    setMenuFeatureId(menuFeatureId);
  };
  const [menuFeatureId, setMenuFeatureId] = useState(0);
  const newMenuFeartures = MenuFeatures.filter(
    (menuFeature) => menuFeature.id !== 2
  );
  const postStory = () => {
    // await fecthData.postStories();
  };
  let component;
  if (files?.length > 0) {
    component = (
      <CreateStoryWithImage files={files} isOpenTextInput={isOpenTextInput} />
    );
  } else if (isCreatedParamStory === true) {
    component = <CreateStoryWithText />;
  } else {
    component = (
      <OptionToChoseStory
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        handleCreateParamStory={handleCreateParamStory}
      />
    );
  }

  return (
    <div className="flex ">
      <div className="h-screen bg-white shadow " style={{ width: "360px" }}>
        <div className="flex space-x-2 py-2 shadow">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="rounded-full bg-gray-300 h-10 w-10 flex items-center justify-center hover:opacity-100 opacity-80 ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <svg
              viewBox="0 0 36 36"
              fill="url(#jsc_s_13)"
              height="40"
              width="40"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  x2="50%"
                  y1="97.0782153%"
                  y2="0%"
                  id="jsc_s_13"
                >
                  <stop offset="0%" stopColor="#0062E0"></stop>
                  <stop offset="100%" stopColor="#19AFFF"></stop>
                </linearGradient>
              </defs>
              <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
              <path
                fill="white"
                d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
              ></path>
            </svg>
          </div>
        </div>
        <div>
          <div className="mx-4 mt-5 mb-3">
            <div className="flex justify-between">
              <p className="font-bold text-2xl">Tin của bạn </p>
              <IconButton
                bg={true}
                Icon={() => {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  );
                }}
              />
            </div>
          </div>
          <div className="mt-2 px-1">
            <div className="flex space-x-3 px-2 h-20 items-center">
              <Avatar
                src={
                  "http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
                }
                size="h-14 w-14"
                active={false}
                rounded={"rounded-full"}
                shadow={"shadow"}
                border="border-none"
              />
              <p className="font-medium text-base text-center ">Lộc Nguyễn</p>
            </div>
          </div>
          <Divide />
          {files?.length > 0 && (
            <div
              className="flex flex-col justify-between "
              style={{ height: "calc(100vh - 211px)" }}
            >
              <div className=" ">
                <div
                  onClick={handleInputText}
                  className="flex space-x-2 items-center hover:bg-gray-200 rounded-md h-14 cursor-pointer"
                >
                  <div className="rounded-full h-10 w-10 bg-gray-300 flex justify-center items-center ml-2 ">
                    Aa
                  </div>
                  <p className="font-medium">Thêm văn bản</p>
                </div>
              </div>
              <div className="shadow-md bg-white">
                <div
                  className=" w-full h-14"
                  style={{
                    boxShadow:
                      "rgb(0 0 0 / 8%) 0px 4.48625rem 5.27794rem, rgb(0 0 0 / 6%) 0px 1.87425rem 2.205rem, rgb(0 0 0 / 5%) 0px 1.00206rem 1.1789rem, rgb(0 0 0 / 4%) 0px 0.561748rem 0.66088rem, rgb(0 0 0 / 3%) 0px 0.29834rem 0.350988rem, rgb(0 0 0 / 4%) 0px -0.2rem 1.2rem",
                  }}
                >
                  <div className="flex space-x-3 px-3 items-center h-full">
                    <button
                      className="bg-gray-300 opacity-70 rounded-md text-center h-9 hover:opacity-100 "
                      style={{ width: "121px" }}
                    >
                      Bỏ
                    </button>
                    <button
                      className="bg-primary text-white text-center h-9 rounded-md relative group "
                      style={{ width: "198px" }}
                      onClick={postStory}
                    >
                      Chia sẻ lên tin
                      <div
                        className="absolute inset-0 hidden group-hover:block"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="relative">
            {isCreatedParamStory === true && <ChangeParagraphStyle />}
          </div>
        </div>
      </div>
      <div
        className="h-screen bg-main flex justify-center items-center relative"
        style={{ width: "calc(100% - 360px)" }}
      >
        <div className=" h-14 ">
          <div className="absolute my-2 mr-4 top-0 right-0 flex ">
            {newMenuFeartures.map((menuFeature) => {
              return (
                <div
                  className="mr-2 cursor-pointer relative group"
                  onClick={() => hanldeMenuFeatureClick(menuFeature.id)}
                  key={menuFeature.id}
                >
                  <MenuFeature
                    bg={false}
                    Icon={() =>
                      menuFeature.Icon(
                        menuFeature.id === menuFeatureId ? true : false
                      )
                    }
                  />
                  <Tooltip
                    text=""
                    title={menuFeature.title}
                    translate={menuFeature.translate}
                    width={menuFeature.width}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>{component}</div>
      </div>
    </div>
  );
};
