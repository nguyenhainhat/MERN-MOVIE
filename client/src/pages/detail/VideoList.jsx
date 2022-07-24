import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

const Video = (props) => {
  const {item, type} = props

  const iframeRef = useRef(null);

  // dùng useRef cho thẻ và lấy được thẻ đó sẽ không cần dùng document.querySelector để set thêm thuộc tín

  return (
    <div className="video">
      <div className="video_title">
        <h3>{type === "trailer" && "Trailer"}</h3>
      </div>
      <video controls width={type === "trailer" ? "50%" : "100%"} poster src={type === "trailer" ? item?.trailer: item?.video}>
      </video>
    </div>
  );
};

export default Video;
