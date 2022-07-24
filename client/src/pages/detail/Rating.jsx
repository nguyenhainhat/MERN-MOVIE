import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from "../../api/tmdbApi";

const Rating = (props) => {

    const {category} = useParams();
    const [rating, setRating] = useState([]);

    useEffect(() => {
        let getRating = async () => {
            let response = null;
            response = await tmdbApi.rating(category, props.id);
            // console.log(response)
            // setRating(response.Rating)
        }
        getRating();
    })



  return <div></div>;
};

export default Rating;
