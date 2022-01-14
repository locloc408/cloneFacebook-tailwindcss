export const Tooltip = ({
  title,
  translate,
  width,
  text,
}: {
  title: string;
  translate: string;
  width: string;
  text: string;
}) => {
  return (
    <div
      className={
        "rounded-lg bg-dark absolute hidden group-hover:flex px-2  mt-2 justify-center  transform opacity-80 " +
        translate +
        " " +
        width
      }
    >
      <span className={"text-white relative h-full w-full text-center " + text}>
        {title}
      </span>
    </div>
  );
};
