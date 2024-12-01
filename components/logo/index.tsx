import Link from "next/link";
import React from "react";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div
      className="flex items-center justify-center
  sm:justify-start
    "
    >
      <Link href={url} className="flex items-center gap-2">
        <div
          className="font-bold size-[30px] text-gray-50
          rounded-lg flex items-center border-2 dark:border-gray-200
             justify-center bg-gradient-to-br from-blue-500 to-primary to-90%
             !font-mono italic
                  "
          style={{ fontSize: "19px" }}
        >
          F
        </div>
        <h5 className="font-bold text-[20px] text-white tracking-[-0.07em] ">
          Formy
        </h5>
      </Link>
    </div>
  );
};

export default Logo;
