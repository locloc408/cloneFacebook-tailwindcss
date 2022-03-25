import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setshowInputZone } from "../../redux/slice/status";
import { IconButton } from "../IconButton/IconButton";
export const ImageZone = ({
  files,
  setFiles,
  getInputProps,
  getRootProps,
}: {
  files: any[];
  setFiles: any;
  getInputProps: any;
  getRootProps: any;
}) => {
  const dispatch = useAppDispatch();
  const changeImagePreview = () => {
    dispatch(setshowInputZone(false));
    setFiles([]);
  };
  const [gridCols, setGridCols] = useState(1);
  const Files = useMemo(() => {
    return files.map((file, index) => {
      if (files.length <= 5) {
        if (gridCols === 6) {
          if (index === 0 || index === 1) {
            return {
              colSpan: gridCols / 2,
              file: file,
              isShow: true,
            };
          } else {
            return {
              colSpan: gridCols / 3,
              file: file,
              isShow: true,
            };
          }
        } else {
          if (index === 0) {
            return {
              colSpan: gridCols,
              file: file,
              isShow: true,
            };
          } else {
            return {
              colSpan: 1,
              file: file,
              isShow: true,
            };
          }
        }
      } else {
        if (index === 0 || index === 1) {
          return {
            colSpan: gridCols / 2,
            file: file,
            isShow: true,
          };
        }
        if (index >= 5) {
          return {
            colSpan: gridCols / 2,
            file: file,
            isShow: false,
          };
        } else {
          return {
            colSpan: gridCols / 3,
            file: file,
            isShow: true,
          };
        }
      }
    });
  }, [gridCols]);

  const handleImageGrid = () => {
    if (files.length === 2 || files.length === 3) {
      setGridCols(2);
    }
    if (files.length === 4) {
      setGridCols(3);
    }
    if (files.length === 5) {
      setGridCols(12);
    }
    if (files.length > 5) {
      setGridCols(6);
    }
  };
  useEffect(() => {
    handleImageGrid();
  }, []);
  return (
    <div>
      <div key={nanoid()} className="overflow-auto">
        <div className=" mt-3  w-full h-full   " style={{ height: "200px" }}>
          <div className="">
            <div className="group w-full h-full p-3 rounded-md border border-gray-300 relative">
              <div className={`grid grid-cols-${gridCols}`}>
                {Files.map((file: any, index) => {
                  return file.isShow === true ? (
                    <div
                      key={nanoid()}
                      className={`col-span-${file.colSpan} relative`}
                    >
                      <img
                        key={nanoid()}
                        className={` h-full`}
                        src={file.file.preview}
                      />
                      {Files.length > 5 && index === 4 && (
                        <div
                          className="absolute inset-0 flex justify-center items-center"
                          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                        >
                          <div className="text-white font-semibold text-3xl">
                            +{Files.length - 5}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  );
                })}
              </div>
              <div className="absolute left-0 right-0 top-0  justify-between flex h-full w-full z-10">
                <div className="m-3  w-full bg-overlay">
                  <div className="flex space-x-2 m-2 ">
                    <div className="flex bg-white h-9 items-center justify-center rounded-md px-3">
                      <i
                        style={{
                          background:
                            "url(https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/hy-OVuxWJXB.png)",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                          backgroundSize: "auto",
                          backgroundPosition: "0px -717px",
                          width: "16px",
                          height: "16px",
                        }}
                      ></i>
                      <div>Chỉnh Sửa</div>
                    </div>

                    <div className="flex bg-white h-9 items-center justify-center rounded-md px-3">
                      <i
                        style={{
                          background:
                            "url(https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/5B7Xjn6goQW.png)",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundPosition: "-25px -271px",
                        }}
                      ></i>
                      <div>Thêm Ảnh/Video</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="z-10 absolute right-5 top-6">
                <div onClick={changeImagePreview}>
                  <IconButton
                    bg={true}
                    Icon={() => {
                      return (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
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
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
