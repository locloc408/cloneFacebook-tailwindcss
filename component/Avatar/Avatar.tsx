import Image from "next/image";
export const Avatar = ({
  src,
  active,
  rounded,
  height,
  width,
  shadow,
}: {
  src: string;
  active: boolean;
  rounded: string;
  height: string;
  width: string;
  shadow: string;
}) => {
  return (
    <div
      className={
        "rounded-full relative   " + width + " " + height + " " + shadow
      }
    >
      <img src={src} className="rounded-full h-full w-full" />
      {active === true && (
        <span className="absolute bg-active h-2 w-2 rounded-3xl -right-0.5 top-2/3 "></span>
      )}
    </div>
  );
};
