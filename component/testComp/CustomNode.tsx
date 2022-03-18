import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Edge,
  Node,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
} from "react-flow-renderer";
import { ColorSelectorNode } from "./ColorSelectorNode";
interface CustomNode {
  Component: React.ReactNode;
}
const nodeTypes = {
  custom: ColorSelectorNode,
};

const CustomNode: React.FC<CustomNode> = ({ Component }) => {
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "custom",
      data: {
        handlePosition: {
          backgroundColor: "red",
          top: 35,
          left: 20,
        },
        myPosition: "Bottom",
        Comp: Component,
      },
      position: { x: 0, y: 0 },
      style: {
        cursor: "auto",
      },
    },
    {
      id: "2",
      type: "custom",
      data: {
        handlePosition: {
          top: 20,
          left: 0,
          backgroundColor: "red",
        },
        myPosition: "Left",
        Comp: Component,
      },
      position: { x: 100, y: 100 },
      style: {
        cursor: "auto",
      },
    },
  ];
  const initialEdge: Edge[] = [
    {
      id: "edge-1",
      source: "1",
      target: "2",
      sourceHandle: "a",
      type: "smoothstep",
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const found = useMemo(() => {
    return nodes
      .filter((elem) => elem.position)
      .map((elem) => elem.position?.y);
  }, [nodes]) as number[];
  const [commentNodeHeight, setCommentNodeHeight] = useState(
    Math.max(...found)
  );

  return (
    <div
      style={{
        height: `${commentNodeHeight + 100}px`,
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
        ></ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default CustomNode;
