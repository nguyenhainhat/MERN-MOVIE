import React from 'react';
import { embedMovie } from '../../api/constants';


const ContentMovie = (props) => {

    console.log(embedMovie(props.id))

  return <div className="container mb-3 movie-content_vi">
  <iframe src={embedMovie(props.id)} title="a" allowFullScreen></iframe>
</div>
};

export default ContentMovie;
