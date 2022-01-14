import { ListItemWithAvatatar } from "../ListItemWithAvatar/ListItemWithAvatar";
import { LeftSideMenuType } from "../../type/LeftSideMenuGroups";
import { nanoid } from "@reduxjs/toolkit";
import { memo, useCallback, useMemo, useState } from "react";
import { ListItemWithIcon } from "../ListItemWithIcon/ListItemWithIcon";
import { LeftSideMenuGrs } from "../dummyData/dummyLeftSideGrs";
export const LeftSideMenuGroups = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [expand, setExpand] = useState(4);
  const List = useMemo(() => {
    const list = LeftSideMenuGrs.slice(0, expand);
    return list;
  }, [expand]);
  const changeExpand = useCallback(() => {
    setIsExpand(!isExpand);
    if (isExpand === true) {
      setExpand(4);
    }
    if (isExpand === false) {
      setExpand(LeftSideMenuGrs.length);
    }
  }, [expand]);
  return (
    <div className="mt-4">
      {List.map((group) => {
        return (
          <ListItemWithAvatatar
            AvatarBorderColor=""
            needClick={false}
            clicked={false}
            AvatarSize="h-7 w-7"
            height="44px"
            rouneded={"rounded-md"}
            src={group.img}
            active={false}
            news={0}
            title={group.title}
            key={nanoid()}
            isWatched={false}
          />
        );
      })}
      <div onClick={changeExpand}>
        {isExpand === false ? (
          <div className="ml-1">
            <ListItemWithIcon
              url=""
              margin="ml-2"
              isActive={false}
              height="h-11"
              padding={"px-2"}
              bg={"bg-gray-300"}
              Icon={() => {
                return (
                  <svg viewBox="0 0 16 16" width="20" height="20">
                    <g fillRule="evenodd" transform="translate(-448 -544)">
                      <path
                        fillRule="nonzero"
                        d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                      ></path>
                    </g>
                  </svg>
                );
              }}
              news={false}
              title={"Xem Thêm"}
              size={"h-7 w-7"}
            />
          </div>
        ) : (
          <div className="ml-1">
            <ListItemWithIcon
              url=""
              margin="ml-2"
              isActive={false}
              height="h-11"
              padding={"px-2"}
              bg={"bg-gray-300"}
              Icon={() => {
                return (
                  <svg viewBox="0 0 20 20" width="20" height="20">
                    <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                  </svg>
                );
              }}
              news={false}
              title={"Ẩn Bớt"}
              size={"h-7 w-7"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
