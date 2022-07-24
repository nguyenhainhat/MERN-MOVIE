import { useContext, useState } from "react";
import "../newItem/newItem.scss";
import Button from "../../../components/button/Button";
import storage from "../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { postCategory, putCategory } from "../../../api/constants";

export default function Update() {
  const [movie, setMovie] = useState(null);

  // const []
  const [backdropPath, setBackdropPath] = useState("");
  const [trailer, setTrailer] = useState("");
  const [video, setVideo] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const { category, id } = useParams();
  const history = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
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
      { file: backdropPath, label: "backdrop_path" },
      { file: trailer, label: "trailer" },
    ]);
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (video !== "" && trailer !== "" && backdropPath !== "") {
      await putCategory(category, id, movie);
    // }
    setUploaded(false);
  };

  return (
    <div className="newProduct" id="newItem">
      <h1 className="addProductTitle">{`Update ${category}`}</h1>
      <Button onClick={() => history(-1)}> Go Back </Button>
      {category === "tv" && (
        <Button>
          <NavLink to="season/1">Update Season</NavLink>
        </Button>
      )}
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
          <input
            type="text"
            placeholder="type"
            name="type"
            onChange={handleChange}
          />
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
          <label>status</label>
          <select name="status" id="status" onChange={handleChange}>
            <option value="visible">visible</option>
            <option value="hidden">hidden</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
       
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
