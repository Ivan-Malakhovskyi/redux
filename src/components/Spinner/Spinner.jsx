import React from "react";
import { ThreeDots } from "react-loader-spinner";

export const Spinner = ({ width = 20, height = 20 }) => (
  <ThreeDots
    visible={true}
    height={height}
    width={width}
    color="#4fa94d"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{
      display: "flex",
      justifyContent: "center",
    }}
    wrapperClass=""
  />
);
