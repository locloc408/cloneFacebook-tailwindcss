import {
  useRef,
  forwardRef,
  useImperativeHandle,
  FormEvent,
  useState,
  ChangeEvent,
} from "react";
import { Avatar } from "../Avatar/Avatar";
import { fecthData } from "../../lib/axios/fetchClientData";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setisDoneInput,
  setNodeId,
  setReplyComment,
  ReplyComment,
} from "../../redux/slice/Comment";
import { uid } from "uid";
export const PostComment = ({
  id,
  postId,
  isFocus,
  reply,
}: {
  postId: string;
  isFocus: boolean;
  reply?: boolean;
  id?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { mutate } = useSWRConfig();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isFocus]);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const dispatch = useAppDispatch();
  const replyComment = useAppSelector(ReplyComment);
  console.log(inputValue);
  const HanldePostComment = async (event: FormEvent) => {
    event.preventDefault();
    if (reply) {
      dispatch(setisDoneInput(true));
      dispatch(setNodeId(id as string));
    }
    if (inputValue !== "" && postId && !reply) {
      console.log("1");
      setInputValue("");
      const newestComments = await fecthData.postComment({
        statusId: postId,
        userId: "61b5cfe89f7f6d222bab9d67",
        textInput: inputValue,
        _id: uid(24),
      });
      mutate(`${postId}`, newestComments, false);
    }
    if (reply && inputValue !== "") {
      const sub = await fecthData.postSubComment({
        userId: "61b74737b003e561f956b6d7",
        textInput: inputValue,
        replyCommentId: replyComment.replyCommentId,
        _id: uid(24),
        statusId: postId,
      });
      console.log(sub);
      setInputValue("");
      // mutate(`${postId}`, sub, false);
    }
  };
  return (
    <div className="mb-2">
      <div className="flex ml-1 space-x-1">
        <Avatar
          src={
            "http://benative.edu.vn/wp-content/uploads/2019/01/tom-and-jerry.png"
          }
          active={false}
          rounded="rounded-full"
          shadow=""
          border="border"
          size="h-9 w-9"
        />
        <div className="w-full h-9 bg-gray-100 rounded-full ">
          <form
            onSubmit={(e) => HanldePostComment(e)}
            className="flex px-4 rounded-full ring-transparent border-transparent  focus:outline-none h-full bg-gray-100"
          >
            <input
              ref={inputRef}
              onChange={(e) => handleOnChange(e)}
              value={inputValue}
              placeholder="viết bình luận"
              style={{ width: "100%" }}
              className="ring-transparent border-transparent  focus:outline-none h-full bg-gray-100"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
