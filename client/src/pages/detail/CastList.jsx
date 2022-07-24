import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";

const CastList = (props) => {
  const castItem = props.item

  return (
    <div className="casts">
      {castItem.map((item, i) => (
        <div key={i} className="casts_item">
          <div
            className="casts_item_img"
            style={{
              backgroundImage: `url(${item.backdrop_path})`,
            }}></div>
            <p className="casts_item_name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
