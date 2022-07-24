import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./update.scss";
import { getTypeTvId, putSeason } from "../../../api/constants";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import UpdateEpisode from "./UpdateEpisode";
import Button from "../../../components/button/Button";

function UpdateSeason(props) {
  const [seasonUpdate, setSeasonUpdate] = useState(null);
  const [seasonImgUpdate, setSeasonImgUpdate] = useState(null);
  const tv = useSelector((state) => state.updateSeason.tv);
  const [uploaded, setUploaded] = useState(false);
  const [tvOfSeason, setTvOfSeason] = useState();
  const [seasonFind, setSeasonFind] = useState({});
  const [updateData, setUpdateData] = useState(false);

  const { id } = useParams();

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
  }, [id]);

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
            setSeasonUpdate((prev) => {
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
    upload([{ file: seasonImgUpdate, label: "backdrop_path" }]);
    // update episodes
    let filterSeasonId = null;
    if (tvOfSeason?.seasons?.length > 1) {
      filterSeasonId = tvOfSeason?.seasons?.find((item) => {
        return item?.season_number === seasonUpdate?.season_number;
      });
    } else {
      filterSeasonId = tvOfSeason?.seasons?.find((item) => {
        return item?.season_number === 1;
      });
    }
    setSeasonFind(filterSeasonId);
    setUploaded(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSeasonUpdate({ ...seasonUpdate, [e.target.name]: value });
  };

  const handleSeasonUpdate = async (e) => {
    e.preventDefault();
    setUploaded(false);
    setUpdateData(true);
    if (seasonImgUpdate !== null || seasonUpdate.episode_count !== null) {
      await putSeason(seasonFind?._id, seasonUpdate);
    }
  };

  console.log(seasonUpdate);

  return (
    <div className="update_season">
      <div className="container">
        <div className="update_eason_container">
          <h2>Season</h2>

          <NavLink
            to={`${
              seasonUpdate?.season === undefined
                ? "episode/1"
                : `episode/${seasonUpdate?.season}`
            }`}
          >
            <Button>Update Episode</Button>
          </NavLink>
          <form className="update_season_content">
            <div className="update_season_item">
              <label>season</label>
              {tvOfSeason?.seasons?.length === 1 ? (
                tvOfSeason?.seasons?.map((item, i) => (
                  <input
                    key={i}
                    type="number"
                    placeholder="season_number"
                    value={item.season_number}
                  />
                ))
              ) : (
                <select name="season" id="season" onChange={handleChange}>
                  {tvOfSeason?.seasons?.map((item, i) => (
                    <option key={i} value={item.season_number}>
                      {item.season_number}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="update_season_item">
              <label>episodes</label>
              <input
                type="number"
                placeholder="episode_count"
                name="episode_count"
                onChange={handleChange}
              />
            </div>
            <div className="update_season_item">
              <label>image</label>
              <input
                type="file"
                name="backdrop_path"
                onChange={(e) => setSeasonImgUpdate(e.target.files[0])}
              />
            </div>
            <div className="update_season_item">
              <label>tv</label>
              <input type="text" value={tv} />
            </div>
            {uploaded === true ? (
              <button
                className="update_season_btn"
                onClick={handleSeasonUpdate}
              >
                Update
              </button>
            ) : (
              <button className="update_season_btn" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSeason;
