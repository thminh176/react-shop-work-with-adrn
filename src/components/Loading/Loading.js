import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <HashLoader color="#65c0d0" size={150} speedMultiplier={0.9} />
    </div>
  );
};

export default Loading;
