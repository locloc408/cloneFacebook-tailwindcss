import { SearchBarMenu } from "./SearchBarMenu";
import { Tab } from "../Tab/Tab";
import { TabList } from "../dummyData/dummyTablistData";
import { MenuFeatures } from "../dummyData/dummyMenuFeatures";
import { useState } from "react";
import { MenuFeature } from "./MenuFeature";
import { Avatar } from "../Avatar/Avatar";
import { Tooltip } from "../Tooltip/Tooltip";
export const Navbar = () => {
  const [tabId, setTabId] = useState(1);
  const handleTabClick = (tabId: number) => {
    setTabId(tabId);
  };
  const hanldeMenuFeatureClick = (menuFeatureId: number) => {
    setMenuFeatureId(menuFeatureId);
  };
  const [menuFeatureId, setMenuFeatureId] = useState(0);
  return (
    <nav className="w-full flex justify-between fixed shadow-md top-0 z-50 border-b dark:boder-dark bg-white">
      <SearchBarMenu />
      <div className="flex">
        {TabList.map((tab) => {
          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative group"
            >
              <Tab
                numberBadge={tab.numberBadge}
                clicked={tab.id === tabId ? true : false}
                Icon={() => tab.Icon(tab.id === tabId ? true : false)}
              />
              <Tooltip
                title={tab.title}
                translate={"translate-x-0"}
                width={"w-28"}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className="hover:bg-gray-100 flex mr-2 cursor-pointer w-28 h-9 items-center justify-center rounded-full">
          <Avatar
            border=""
            src="http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
            active={false}
            size="h-7 w-7"
            rounded={"rounded-full"}
            shadow={"shadow"}
          />
          <p className="font-medium text-base font">Nguyễn</p>
        </div>
        {MenuFeatures.map((menuFeature) => {
          return (
            <div
              className="mr-4 cursor-pointer relative group"
              onClick={() => hanldeMenuFeatureClick(menuFeature.id)}
              key={menuFeature.id}
            >
              <MenuFeature
                bg={menuFeature.id === menuFeatureId ? true : false}
                Icon={() =>
                  menuFeature.Icon(
                    menuFeature.id === menuFeatureId ? true : false
                  )
                }
              />
              <Tooltip
                title={menuFeature.title}
                translate={menuFeature.translate}
                width={menuFeature.width}
              />
              <div
                className={
                  "absolute inset-0 rounded-full w-full h-full " +
                  (menuFeature.id === menuFeatureId ? "block" : "hidden")
                }
                style={{ backgroundColor: "rgb(24,119,242 , 0.15)" }}
              ></div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

Navbar.whyDidYouRender = true;
