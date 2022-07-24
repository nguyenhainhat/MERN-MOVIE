import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllSeasonOfId,
  getEpisodeOfSeason,
  getTypeTvId,
  putEpisode,
} from "../../../api/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./update.scss";
const episodesData = [
  { label: "air_date", type: "date" },
  { label: "name", type: "text" },
  { label: "overview", type: "text" },
];

function UpdateEpisode() {
  const [episodeItem, setEpisodeItem] = useState();
  const [tvOfSeason, setTvOfSeason] = useState();
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const { id, season, episode } = useParams();

  useEffect(() => {
    const getTv = async () => {
      try {
        const res = await getTypeTvId(id);
        setTvOfSeason(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTv();
  }, [id, season]);

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
            setEpisodeItem((prev) => {
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
    upload([{ file: video, label: "video" }]);
    setUploaded(true);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEpisodeItem({ ...episodeItem, [e.target.name]: value });
  };

  const filterEpisode = tvOfSeason?.episodes.find((item) => {
    return (
      item?.episode_number ===
      Number(episodeItem === undefined ? 1 : episodeItem?.episode_number)
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await putEpisode(filterEpisode?._id, {
      ...episodeItem,
      idTv: tvOfSeason?.idTv,
      season: season,
      tv: id,
    });
    setUploaded(false);
  };

  console.log(tvOfSeason)

  return (
    <div className="update_season_episode">
      <h2>Episode</h2>
      <form action="">
      <div className="update_season_episode">
            <label>idTv</label>
            <input
              type="text"
              placeholder="idTv"
              name="idTv"
              value={tvOfSeason?.idTv}
            />
          </div>
        {episodesData.map((item, i) => (
          <div key={i} className="update_season_episode">
            <label>{item.label}</label>
            <input
              type={`${item.type}`}
              placeholder={`${item.label}`}
              name={`${item.label}`}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="update_season_episode">
          <label>season</label>
          <input type="number" placeholder="season_number" value={season} />
        </div>
        <div className="update_season_episode">
          <label>episode_number</label>
          <select
            name="episode_number"
            id="episode_number"
            onChange={handleChange}
          >
            {tvOfSeason?.episodes?.map((item, i) => {
              return (
                <option
                  key={i}
                  value={item.season === Number(season) && item?.episode_number}
                >
                  {item.season === Number(season) && item?.episode_number}
                </option>
              );
            })}
          </select>
        </div>
        <div className="update_season_episode">
          <label>tv</label>
          <input type="text" value={tvOfSeason?.title} />
        </div>
        <div className="update_season_episode">
          <label>video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
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
}

export default UpdateEpisode;
