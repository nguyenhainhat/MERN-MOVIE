import { useContext, useState } from "react";
import "./newItem.scss";
import Button from "../../../components/button/Button";
import storage from "../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { postCategory, putCategory } from "../../../api/constants";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);

  // const []
  const [backdropPath, setBackdropPath] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const { category, id } = useParams();
  const history = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

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
            setMovie((prev) => {
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
    upload([
      { file: backdropPath, label: "backdropPath" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postCategory(category, movie);

    setUploaded(false);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">{`Create ${category}`}</h1>
      <Button onClick={() => history(-1)}> Go Back </Button>
      <NavLink to="season">
        <Button>Create Season</Button>
      </NavLink>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>id</label>
          <input
            type="text"
            name={`${category === "movie" ? "idMovie" : "idTv"}`}
            placeholder="id"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>type</label>
          <select name="type" id="type" onChange={handleChange}>
            <option value="movie">movie</option>
            <option value="tv">tv</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>overview</label>
          <input
            type="text"
            placeholder="overview"
            name="overview"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>backdrop_path</label>
          <input
            type="file"
            id="backdropPath"
            name="backdrop_path"
            onChange={(e) => setBackdropPath(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>popularity</label>
          <input
            type="number"
            placeholder="popularity"
            name="popularity"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>vote</label>
          <input
            type="number"
            placeholder="Vote_average"
            name="vote_average"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>date</label>
          <input
            type="number"
            placeholder="date"
            name={`${category === "movie" ? "release_date" : "first_air_date"}`}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>status</label>
          <select name="status" id="status" onChange={handleChange}>
            <option value="visible">visible</option>
            <option value="hidden">hidden</option>
          </select>
        </div>
        {category === "movie" && (
          <>
            <div className="addProductItem">
              <label>trailer</label>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
          </>
        )}
        {uploaded === true ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
