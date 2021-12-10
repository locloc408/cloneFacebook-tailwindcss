import { ListItemWithAvatatar } from "../ListItemWithAvatar/ListItemWithAvatar";
import { LeftSideMenuData } from "../dummyData/dummyLeftSideMenuData";
import { ListItemWithIcon } from "../ListItemWithIcon/ListItemWithIcon";
import { useState, useMemo } from "react";
import { Divide } from "../Divide/Divide";
export const LeftSideMenu = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [expand, setExpand] = useState(5);
  const List = useMemo(() => {
    const list = LeftSideMenuData.slice(0, expand);
    return list;
  }, [LeftSideMenuData, expand]);
  return (
    <div className="mt-4">
      {List.map((menu) => {
        return (
          <ListItemWithAvatatar
            rouneded={"rounded-full"}
            src={menu.img}
            active={false}
            news={false}
            title={menu.title}
            key={menu.id}
          />
        );
      })}
      <div
        onClick={() => {
          setIsExpand(!isExpand);
          if (isExpand === true) {
            setExpand(5);
          }
          if (isExpand === false) {
            setExpand(LeftSideMenuData.length);
          }
        }}
      >
        {isExpand === false ? (
          <ListItemWithIcon
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
            size={" "}
          />
        ) : (
          <ListItemWithIcon
            padding={"px-2"}
            bg="bg-gray-300"
            Icon={() => {
              return (
                <svg viewBox="0 0 20 20" width="20" height="20">
                  <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                </svg>
              );
            }}
            news={false}
            title={"Ẩn Bớt"}
            size={" "}
          />
        )}
      </div>
      <Divide />
    </div>
  );
};
