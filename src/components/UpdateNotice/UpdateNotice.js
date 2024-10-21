import React from 'react';
import './UpdateNotice.scss';

const UpdateNotice = () => {
  return (
    <div className="fullscreen-update-container">
      <div className="update-box">
        <div className="spinner"></div>
        <p>Hệ Thống Đang Update...</p>
      </div>
    </div>
  );
};

export default UpdateNotice;
