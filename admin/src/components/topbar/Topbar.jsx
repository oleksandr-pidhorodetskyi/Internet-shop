import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiCalls";
export default function Topbar() {

  const dispatch = useDispatch();

  const handleClick = () => {
    logOut(dispatch);
    // history.push("/")
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={handleClick}>
            <ExitToApp />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
