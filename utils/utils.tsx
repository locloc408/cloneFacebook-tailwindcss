import { StoryType } from "../type/Stories";
import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
export const sortStory = (stories: StoryType[]) => {
  const LatestStories = stories.map((story, index) => {
    return {
      id: story.userId,
      last: story.stories[story.stories.length - 1],
      index: index,
    };
  });
  return LatestStories;
};

export const useClickOutSide = (
  ref: any,
  callback: React.SetStateAction<any>
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const usePreviewImage = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return { files, getRootProps, getInputProps };
};
