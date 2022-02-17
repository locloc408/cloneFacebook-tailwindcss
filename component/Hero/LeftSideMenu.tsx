import { ListItemWithAvatatar } from "../ListItemWithAvatar/ListItemWithAvatar";
import { LeftSideMenuData } from "../dummyData/dummyLeftSideMenuData";
import { ListItemWithIcon } from "../ListItemWithIcon/ListItemWithIcon";
import { useState, useMemo, memo, useCallback } from "react";
import { Divide } from "../Divide/Divide";
const leftSideMenu = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [expand, setExpand] = useState(5);

  const List = LeftSideMenuData.slice(0, expand);

  const handleChangeExpand = () => {
    setIsExpand(!isExpand);
    if (isExpand === true) {
      setExpand(5);
    }
    if (isExpand === false) {
      setExpand(LeftSideMenuData.length);
    }
  };
  return (
    <div className="mt-4">
      {List.map((menu) => {
        return (
          <ListItemWithAvatatar
            needClick={false}
            AvatarBorderColor=""
            clicked={false}
            AvatarSize="h-7 w-7"
            height="44px"
            rouneded={"rounded-full"}
            src={menu.img}
            active={false}
            news={0}
            title={menu.title}
            key={menu.id}
            isWatched={false}
          />
        );
      })}
      <div onClick={handleChangeExpand}>
        {isExpand === false ? (
          <div className="ml-1">
            <ListItemWithIcon
              url=""
              margin="ml-2"
              height="h-11"
              isActive={false}
              padding={"px-2"}
              bg="bg-gray-300"
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
              size="w-7 h-7"
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
      <Divide />
    </div>
  );
};

export const LeftSideMenu = memo(leftSideMenu);
