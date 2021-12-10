export const SearchBarMenu = () => {
  return (
    <div className="flex pt-2 pl-4 pr-4 w-80">
      <svg viewBox="0 0 36 36" fill="url(#jsc_s_13)" height="40" width="40">
        <defs>
          <linearGradient
            x1="50%"
            x2="50%"
            y1="97.0782153%"
            y2="0%"
            id="jsc_s_13"
          >
            <stop offset="0%" stopColor="#0062E0"></stop>
            <stop offset="100%" stopColor="#19AFFF"></stop>
          </linearGradient>
        </defs>
        <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
        <path
          fill="white"
          d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
        ></path>
      </svg>
      <label
        className="flex rounded-3xl  ml-2"
        style={{
          backgroundColor: "rgb(240,242,245)",
          height: "40px",
          width: "240px",
        }}
      >
        <div className="pl-4 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="16"
            width="16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="text-sm pl-2  rounded-md  focus:outline-none focus:border-none border-none"
          style={{
            backgroundColor: "rgb(240,242,245)",
          }}
          placeholder="Tìm Kiếm Trên Facbook"
          autoComplete="off"
        />
      </label>
    </div>
  );
};
