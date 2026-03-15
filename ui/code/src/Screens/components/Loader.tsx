import { ClipLoader } from "react-spinners";
import React from "react";

const Loader = () => {

  return (
    <div className="fullscreen-loader">
      <ClipLoader size={70} color="rgb(54 114 215)" speedMultiplier={0.8}/>
    </div>
  );
};

export default Loader;
