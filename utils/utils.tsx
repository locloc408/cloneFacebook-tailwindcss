import { StoryType } from "../type/Stories";
import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { StoryContainer } from "../type/Stories";
export const sortStory = (stories: StoryType[]) => {
  const LatestStories = stories.map((story, index) => {
    const checkUnWatchedStory = story.stories.filter(
      (story) => !story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
    );

    return {
      user: story.userId,
      last:
        checkUnWatchedStory.length === 0
          ? story.stories[0]
          : checkUnWatchedStory[checkUnWatchedStory.length - 1],
      index: index,
    };
  });
  const sorted = LatestStories.sort((a, b) => {
    return b.index - a.index;
  });
  return sorted;
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
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    multiple: true,
  });

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return { files, getRootProps, getInputProps, setFiles };
};

export const getUnique = (array: any[], typeTpGetUnique: string) => {
  const result = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item[typeTpGetUnique])) {
      map.set(item[typeTpGetUnique], true); // set any value to Map
      result.push(item[typeTpGetUnique]);
    }
  }
  return result;
};
