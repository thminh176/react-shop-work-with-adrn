import React from "react";
import "./UpdateNotice.scss";
import Loading from "../Loading/Loading";
const UpdateNotice = () => {
  return (
    <div className="fullscreen-update-container">
      <div className="update-box">
        <Loading />
        <p>Hệ Thống Đang Update...</p>
      </div>
    </div>
  );
};

export default UpdateNotice;
