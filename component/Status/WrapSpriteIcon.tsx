import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import { Tooltip } from "../Tooltip/Tooltip";
import { setshowInputZone } from "../../redux/slice/status";
import { useAppDispatch } from "../../redux/hooks";
export const WrapSpriteIcon = ({
  url,
  position,
  bg,
  title,
  width,
  translate,
  text,
  index,
}: {
  url: string;
  position: string;
  bg: boolean;
  title: string;
  width: string;
  translate: string;
  text: string;
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (index === 0) {
      dispatch(setshowInputZone(true));
    }
  };
  return (
    <div
      onClick={handleClick}
      key={nanoid()}
      className="relative group cursor-pointer"
    >
      <SpriteIcon url={url} position={position} bg={bg} />
      <Tooltip title={title} width={width} translate={translate} text={text} />
    </div>
  );
};
