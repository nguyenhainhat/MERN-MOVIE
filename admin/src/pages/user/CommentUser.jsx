import React, { useEffect, useState } from "react";
import { getCommentUser } from "../../api/constants";
import TableHome from "../../components/TablePagination/TablePagination";
import Button from "../../components/button/Button";

const CommentUser = () => {
  const [user, setUser] = useState([]);
  const [valueUser, setValueUser] = useState("");
  const [storeUser, setStoreUser] = useState([]);
  useEffect(() => {
    const getDetailUser = async () => {
      const res = await getCommentUser();
      setUser(res.data);
      setStoreUser(res.data);
    };
    getDetailUser();
  }, []);

  const handleSearch = () => {
    if (valueUser !== "") {
      const filterUsername = user?.filter((item) => {
        return item?.user?.username === valueUser.trim();
      });
      const filterTitle = user?.filter((item) => {
        return (item?.movie?.title || item?.tv?.title) === valueUser.trim();
      });
      setUser(filterUsername.length === 0 ? filterTitle : filterUsername);
      setTimeout(() => {
        setValueUser("");
      }, 2000);
    }else {
      setUser(storeUser)
    }
  };

  return (
    <div className="user user_comment" style={{ width: "100%" }}>
      <h1>Comment</h1>
      <div>
        <input
          type="text"
          placeholder="Search name"
          value={valueUser}
          onChange={(e) => setValueUser(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <TableHome item={user} type="comment" />
    </div>
  );
};

export default CommentUser;
