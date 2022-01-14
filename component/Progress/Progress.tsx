import React, { useRef, useEffect, useState, memo } from "react";
const progress = ({
  pause,
  index,
  current,
}: {
  pause: React.MutableRefObject<boolean>;
  current: number;
  index: number;
}) => {
  const interval = useRef<any>(null);
  const [value, setValue] = useState<number>(0);
  //end progress after 5s
  useEffect(() => {
    setValue(0);

    if (index === current) {
      interval.current = window.setInterval(() => {
        if (!pause.current) {
          setValue((prev) => {
            let newvalue = prev + 1;
            if (newvalue >= 100) {
              window.clearInterval(interval.current);
              newvalue = 100;
            }
            return newvalue;
          });
        }
      }, 50);
      return () => {
        clearInterval(interval.current);
      };
    }
  }, [pause]);
  return (
    <div className="relative h-full z-20">
      <div className="rounded-md  w-full h-full bg-gray-100 opacity-60"></div>
      <div
        className="h-full bg-white rounded-md absolute top-0"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export const Progress = memo(progress);
