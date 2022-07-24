import "./sidebar.css";
import { LineStyle, PermIdentity, PlayCircleOutline } from "@material-ui/icons";
import CategoryIcon from "@mui/icons-material/Category";
import MessageIcon from '@mui/icons-material/Message';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Link } from "react-router-dom";
import TvIcon from '@mui/icons-material/Tv';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/user" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
             <Link to="/comment" className="link">
              <li className="sidebarListItem">
                <MessageIcon className="sidebarIcon" />
                Comment
              </li>
            </Link>
            <Link to="/movie" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/tv" className="link">
              <li className="sidebarListItem">
                <TvIcon className="sidebarIcon" />
                Tv series
              </li>
            </Link>
            <Link to="/list" className="link">
              <li className="sidebarListItem">
                <CategoryIcon className="sidebarIcon" />
                List
              </li>
            </Link>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
