import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { uid } from "uid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IsDoneInput, NodeId, ReplyComment } from "../../redux/slice/Comment";
import { CommentRes } from "../../type/Comment";
import { CommentItem } from "../Comment/CommentItems";
import { PostComment } from "../Comment/PostComment";
import { ColorSelectorNode } from "./ColorSelectorNode";

interface CustomNode {
  data: CommentRes;
  postId: string;
}
const nodeTypes = {
  custom: ColorSelectorNode,
};

const CustomNode: React.FC<CustomNode> = ({ data, postId }) => {
  console.log(data);
  useEffect(() => {
    setNodes([
      {
        id: data._id,
        type: "custom",
        data: {
          handlePosition: {
            backgroundColor: "red",
            top: 35,
            left: 20,
          },
          myPosition: "Bottom",
          Comp: <CommentItem comment={data} />,
        },
        position: { x: 0, y: 0 },
        style: {
          cursor: "auto",
        },
      },
      // {
      //   id: "2",
      //   type: "custom",
      //   data: {
      //     handlePosition: {
      //       backgroundColor: "red",
      //       top: 35,
      //       left: 20,
      //     },
      //     myPosition: "Bottom",
      //     Comp: (
      //       <CommentItem replyComment={data.SubComments[0].SubCommentsId} />
      //     ),
      //   },
      //   position: { x: 100, y: 80 },
      //   style: {
      //     cursor: "auto",
      //   },
      // },
    ]);
  }, []);

  const replyComment = useAppSelector(ReplyComment);
  const isDoneInput = useAppSelector(IsDoneInput);
  const nodeId = useAppSelector(NodeId);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const found = useMemo(() => {
    return nodes
      .filter((elem) => elem.position)
      .map((elem) => elem.position?.y);
  }, [nodes]) as number[];
  const findHeight = Math.max(...found);
  useEffect(() => {
    setCommentNodeHeight(findHeight);
  }, [nodes]);
  const [commentNodeHeight, setCommentNodeHeight] = useState(findHeight);
  const [id, setId] = useState(uid(24));
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("run effect");
    if (replyComment.replyCommentId === data._id) {
      if (!isDoneInput) {
        setNodes([
          ...nodes,
          {
            id: id,
            type: "custom",
            data: {
              handlePosition: {
                top: 20,
                left: 0,
                backgroundColor: "red",
              },
              myPosition: "Left",
              Comp: (
                <PostComment
                  postId={postId}
                  isFocus={true}
                  id={id}
                  reply={true}
                />
              ),
            },
            position: { x: 100, y: nodes.length * 80 },
            style: {
              cursor: "auto",
            },
          },
        ]);
      } else {
        const newNodes = nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              id: id,
              type: "custom",
              data: {
                handlePosition: {
                  top: 20,
                  left: 0,
                  backgroundColor: "red",
                },
                myPosition: "Left",
                Comp: <CommentItem comment={data} />,
              },
              position: { x: 100, y: node.position.y },
              style: {
                cursor: "auto",
              },
            };
          }
          return node;
        });
        setNodes(newNodes);
      }
    }
  }, [replyComment.replyCommentId, isDoneInput]);

  return (
    <div
      style={{
        height: `${commentNodeHeight + 80}px`,
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          minZoom={1}
          maxZoom={1}
        ></ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default CustomNode;
