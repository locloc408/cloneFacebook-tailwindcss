import React, { CSSProperties, FC } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

interface DataType {
  Comp: React.ReactNode;
  myPosition: "Right" | "Left" | "Bottom" | "Top";
  handlePosition: CSSProperties;
}
export const ColorSelectorNode: FC<NodeProps<DataType>> = ({
  data: Data,
  isConnectable,
}) => {
  return (
    <>
      {Data.Comp}
      <Handle
        type="source"
        position={Position[Data.myPosition]}
        id="a"
        style={Data.handlePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};
