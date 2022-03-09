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
const PostComment = ({ postId }: { postId: string }, ref: any) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { mutate } = useSWRConfig();
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    []
  );
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const HanldePostComment = async (event: FormEvent) => {
    event.preventDefault();
    if (inputValue !== "") {
      const newestComments = await fecthData.postComment({
        statusId: postId,
        userId: "61b5cfe89f7f6d222bab9d67",
        textInput: inputValue,
      });
      mutate(`${postId}`, newestComments, false);
      setInputValue("");
    }
  };
  return (
    <div className="pb-2">
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
        <div className=" w-full h-9 bg-gray-100 rounded-full ">
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
export default forwardRef(PostComment);
