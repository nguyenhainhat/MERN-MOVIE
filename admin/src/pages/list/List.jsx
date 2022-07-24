import { async } from "@firebase/util";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTypeCast,
  getTypeGenre,
  getTypeMovie,
  getTypeTv,
  postCast,
  postDetailCast,
  postDetailGenre,
  putTypeCast,
} from "../../api/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Button from "../../components/button/Button";
import "./list.scss";

function List(props) {
  const [genre, setGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const [tv, setTv] = useState([]);
  const [movie, setMovie] = useState([]);
  const [valueItem, setValueItem] = useState(null);
  const [category, setCategory] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    const getGenre = async () => {
      const res = await getTypeGenre();
      setGenre(res.data);
    };
    getGenre();
    const getCast = async () => {
      const res = await getTypeCast();
      setCast(res.data);
    };
    getCast();
    const getTv = async () => {
      const res = await getTypeTv();
      setTv(res.data);
    };
    getTv();
    const getMovie = async () => {
      const res = await getTypeMovie();
      setMovie(res.data);
    };
    getMovie();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setValueItem({ ...valueItem, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filterNameGenre = genre?.find(
      (item) => item.name === valueItem.genre
    );
    const filterNameMovie = movie?.find(
      (item) => item.title === valueItem.movie
    );
    const filterNameTv = tv?.find((item) => item.title === valueItem.tv);
    const filterNameCast = cast?.find((item) => item.name === valueItem.cast);
    if (valueItem.movie !== undefined) {
      if (valueItem.genre !== undefined) {
        await postDetailGenre({
          genre: filterNameGenre._id,
          movie: filterNameMovie._id,
        });
      }
      if (valueItem.cast !== undefined) {
        await postDetailCast({
          cast: filterNameCast._id,
          movie: filterNameMovie._id,
        });
      }
    }
    if (valueItem.tv !== undefined) {
      if (valueItem.genre !== undefined) {
        await postDetailGenre({
          genre: filterNameGenre._id,
          tv: filterNameTv._id,
        });
      }
      if (valueItem.cast !== undefined) {
        await postDetailCast({
          cast: filterNameCast._id,
          tv: filterNameTv._id,
        });
      }
    }
  };

  const handleClickCategory = () => {
    setCategory(!category);
  };

  const handleClickList = () => {
    setList(!list);
  };

  return (
    <div className="list">
      <div className="container">
        <CreateCast />
        <div className="list_genre">
          <Button onClick={handleClickCategory} className="">
            {category ? "movie" : "tv"}
          </Button>
          <Button onClick={handleClickList} className="">
            {list ? "genre" : "cast"}
          </Button>
          <form className="list_genre-form">
            {list ? (
              <div className="list_genre-form_input">
                <label>Genre name</label>
                <select name="genre" id="genre" onChange={handleChange}>
                  {genre.map((item, i) => (
                    <option value={`${item.name}`}>{`${item.name}`}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="list_genre-form_input">
                <label>Cast name</label>
                <select name="cast" id="cast" onChange={handleChange}>
                  {cast.map((item, i) => (
                    <option value={`${item.name}`}>{`${item.name}`}</option>
                  ))}
                </select>
              </div>
            )}
            {category ? (
              <div className="list_genre-form_input">
                <label>Movie</label>
                <select name="movie" id="movie" onChange={handleChange}>
                  {movie.map((item, i) => (
                    <option value={`${item.title}`}>{`${item.title}`}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="list_genre-form_input">
                <label>Tv</label>
                <select name="tv" id="tv" onChange={handleChange}>
                  {tv.map((item, i) => (
                    <option value={`${item.title}`}>{`${item.title}`}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="list_genre-form_btn"
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const CreateCast = () => {
  const [cast, setCast] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [castImg, setCastImg] = useState(null);

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label;
      const storage = getStorage();
      const storageRef = ref(storage, `/items${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "State_changes",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCast((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            // setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCast({ ...cast, [e.target.name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: castImg, label: "backdrop_path" }]);
    setUploaded(true);
  };

  const handleCastClick = async (e) => {
    e.preventDefault();
    if(castImg !== null || cast !== null) {
      await postCast(cast);
    }
  };
  return (
    <div className="list_cast">
      <div className="list_cast_create">
        <h2>Create cast</h2>
        <form>
          <div className="cast_item">
            <label>name</label>
            <input
              type="text"
              placeholder="cast name"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="cast_item">
            <label>backdrop_path</label>
            <input
              type="file"
              name="backdrop_path"
              onChange={(e) => setCastImg(e.target.files[0])}
            />
          </div>
          {uploaded === true ? (
            <button className="addProductButton" onClick={handleCastClick}>
              Create
            </button>
          ) : (
            <button className="addProductButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </form>
      </div>
      <UpdateCast cast={cast} />
    </div>
  );
};

const UpdateCast = (props) => {
  const [cast, setCast] = useState([]);
  const [updateCast, setUpdateCast] = useState(null);
  const [imgUpdate, setImgUpdate] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      const res = await getTypeCast();
      setCast(res.data);
    };
    getCast();
  }, []);

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label;
      const storage = getStorage();
      const storageRef = ref(storage, `/items${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "State_changes",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateCast((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            // setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: imgUpdate, label: "backdrop_path" }]);
    setUploaded(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateCast({ ...updateCast, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filterCast = cast.find((item, i) => item.name === updateCast.name);
    if (updateCast.backdrop_path !== null) {
      await putTypeCast(filterCast?._id, {
        backdrop_path: updateCast.backdrop_path,
      });
    }
    setUploaded(false);
  };

  return (
    <div className="list_cast_update">
      <h2>Update cast</h2>
      <form>
        <div className="list_cast_update_item">
          <label>Cast</label>
          <select name="name" id="name" onChange={handleChange}>
            {cast.map((item, i) => (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="list_cast_update_item">
          <label>backdrop_path</label>
          <input
            type="file"
            id="backdropPath"
            name="backdrop_path"
            onChange={(e) => setImgUpdate(e.target.files[0])}
          />
        </div>
        {uploaded === true ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Update
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default List;
