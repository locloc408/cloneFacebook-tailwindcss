import React from "react";

export const OptionToChoseStory = ({
  getRootProps,
  getInputProps,
  handleCreateParamStory,
}: {
  getRootProps: any;
  getInputProps: any;
  handleCreateParamStory: () => void;
}) => {
  return (
    <div className="flex space-x-4">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div
          className="rounded-lg flex flex-col justify-center items-center cursor-pointer"
          style={{
            background:
              "linear-gradient(-138deg, rgba(139, 217, 255, 1) 0% , rgba(111, 135, 236, 1) 30% , rgba(111, 135, 236, 1) 55%,rgba(139, 217, 255, 1) 100%)",
            height: "320px",
            width: "220px",
          }}
        >
          <div className="bg-white rounded-full h-11 w-11 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium text-sm pt-1">Tạo Tin Ảnh </p>
          </div>
        </div>
      </div>

      <div
        onClick={handleCreateParamStory}
        className="rounded-lg flex flex-col justify-center items-center cursor-pointer"
        style={{
          background:
            "linear-gradient(138deg,rgba(168, 74, 217, 1) 0%,rgba(202, 88, 186, 1) 55%,rgba(229, 83, 128, 1) 100%)",
          height: "320px",
          width: "220px",
        }}
      >
        <div className="bg-white rounded-full h-11 w-11 flex justify-center items-center">
          <p className=" font-bold">Aa</p>
        </div>
        <div>
          <p className="text-white font-medium text-sm pt-1">
            Tạo Tin Dạng Văn Bản{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
