import Image from "next/image";
export const Avatar = ({
  src,
  active,
  rounded,
  shadow,
  border,
  size,
}: {
  src: string;
  active: boolean;
  rounded: string;
  shadow: string;
  border: string;
  size: string;
}) => {
  return (
    <div
      className={"rounded-full relative " + size + " " + shadow + "" + border}
    >
      <img src={src} className={"h-full w-full " + rounded} />
      {active === true && (
        <span className="absolute bg-active h-2 w-2 rounded-3xl -right-0.5 top-2/3 "></span>
      )}
    </div>
  );
};
