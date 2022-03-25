import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setshowInputZone } from "../../redux/slice/status";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import { Tooltip } from "../Tooltip/Tooltip";

export const WrapSpriteIcon = ({
  url,
  position,
  bg,
  title,
  width,
  translate,
  text,
  id,
}: {
  url: string;
  position: string;
  bg: boolean;
  title: string;
  width: string;
  translate: string;
  text: string;
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (id === 1) {
      dispatch(setshowInputZone(true));
    }
  };
  return (
    <div onClick={handleClick} className="relative group cursor-pointer">
      <SpriteIcon url={url} position={position} bg={bg} />
      <Tooltip title={title} width={width} translate={translate} text={text} />
    </div>
  );
};
