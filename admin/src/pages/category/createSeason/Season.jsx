import React, { useEffect } from "react";
import { useState } from "react";
import "./season.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { async } from "@firebase/util";
import {
  getAllSeasonOfId,
  getTypeTv,
  postEpisode,
  postSeason,
  putSeason,
} from "../../../api/constants";
import Button from "../../../components/button/Button";

const episodesItem = [
  {
    title: "id",
    name: "idTv",
    type: "number",
  },
  {
    title: "Season",
    name: "season",
    type: "number",
  },
  {
    title: "Date",
    name: "air_date",
    type: "date",
  },
  {
    title: "Episode",
    name: "episode_number",
    type: "number",
  },
  {
    title: "Name",
    name: "name",
    type: "text",
  },
  {
    title: "Overview",
    name: "overview",
    type: "text",
  },
];

function Season(props) {
  const [seasonValue, setSeasonValue] = useState(null);
  const [episodeValue, setEpisodeValue] = useState(null);
  const [seasonImg, setSeasonImg] = useState(null);
  const [tv, setTv] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedEpisode, setUploadedEpisode] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getTv = async () => {
      const res = await getTypeTv();
      setTv(res.data);
    };
    getTv();
  }, []);

  const uploadSeason = (items) => {
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
            setSeasonValue((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            // setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const uploadEpisode = (items) => {
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
            setEpisodeValue((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            // setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUploadSeason = (e) => {
    e.preventDefault();
    uploadSeason([{ file: seasonImg, label: "image" }]);
    setUploaded(true);
  };

  const handleSeasonClick = async (e) => {
    e.preventDefault();
    const filterNameTv = tv?.find((item) => item.title === seasonValue.tv);
    await postSeason({
      season_number: seasonValue.season_number,
      episode_count: seasonValue.episode_count,
      tv: filterNameTv?._id,
      backdrop_path: seasonValue.image,
    });
  };

  const handleUploadEpisode = (e) => {
    e.preventDefault();
    uploadEpisode([{ file: video, label: "video" }]);
    setUploadedEpisode(true);
  };

  const handleEpisodesClick = async (e) => {
    e.preventDefault();
    const filterNameTv = tv?.find((item) => item.title === episodeValue.tv);
    await postEpisode({ ...episodeValue, tv: filterNameTv?._id });
    setUploadedEpisode(false);
  };

  const handleChangeEpisodes = (e) => {
    const value = e.target.value;
    setEpisodeValue({ ...episodeValue, [e.target.name]: value });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSeasonValue({ ...seasonValue, [e.target.name]: value });
  };

  return (
    <div className="season">
      <div className="container">
        <div className="season_container">
          <h2>Season</h2>
          <form className="season_content">
            <div className="season_item">
              <label>season</label>
              <input
                type="number"
                placeholder="season_number"
                name="season_number"
                onChange={handleChange}
              />
            </div>

            <div className="season_item">
              <label>episodes</label>
              <input
                type="number"
                placeholder="episode_count"
                name="episode_count"
                onChange={handleChange}
              />
            </div>
            <div className="season_item">
              <label>image</label>
              <input
                type="file"
                name="backdrop_path"
                onChange={(e) => setSeasonImg(e.target.files[0])}
              />
            </div>
            <div className="season_item">
              <label>tv</label>
              <select name="tv" id="tv" onChange={handleChange}>
                {tv.map((item, i) => (
                  <>
                    <option value={item.title}>{item.title}</option>
                  </>
                ))}
              </select>
            </div>
            {/* <button type="submit" onClick={handleSeasonClick}>
              Create Season
            </button> */}
            {uploaded === true ? (
              <button className="update_season_btn" onClick={handleSeasonClick}>
                Create Season
              </button>
            ) : (
              <button
                className="update_season_btn"
                onClick={handleUploadSeason}
              >
                Upload
              </button>
            )}
          </form>
        </div>
        <div className="season_episodes">
          <h2>Episodes</h2>
          <form className="season_content">
            {episodesItem.map((item, i) => (
              <div className="season_item" key={i}>
                <label>{item.title}</label>
                <input
                  type={item.type}
                  placeholder={item.title}
                  name={item.name}
                  onChange={handleChangeEpisodes}
                />
              </div>
            ))}
            <div className="update_season_episode">
              <label>video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            <div className="season_item">
              <label>tv</label>
              <select name="tv" id="tv" onChange={handleChangeEpisodes}>
                {tv.map((item, i) => (
                  <>
                    <option value={item.title}>{item.title}</option>
                  </>
                ))}
              </select>
            </div>

            {uploadedEpisode === true ? (
              <button type="submit" onClick={handleEpisodesClick}>
                Create Episodes
              </button>
            ) : (
              <button
                className="addProductButton"
                onClick={handleUploadEpisode}
              >
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Season;
