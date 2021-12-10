import React from "react";

export const CreateMeet = () => {
  return (
    <div className="flex justify-center">
      <div
        className="overflow-hidden rounded-md bg-white mt-6 flex items-center "
        style={{ width: "500px", height: "72px" }}
      >
        <div
          className="py-2 rounded-full  border-primary border-opacity-20 flex items-center justify-center mx-4 cursor-pointer hover:bg-gray-100 "
          style={{ borderWidth: "1px", width: "191px" }}
        >
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M18 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.333L22 17V7l-4 3.333V7zm-4 6h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
            </svg>
            <p className="text-primary text-base font-medium">
              Tạo phòng họp mặt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
