import "./SideBar.scss";
import React, { useState } from "react";
//react-pro-sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
//from react-icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>Pages</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="">
              <MenuItem
                className="sidebar-item"
                icon={"Crypto"}
                style={{ fontSize: "13px" }}
              >
                <Link to={"/"}>
                  <i>real-time updates</i>
                </Link>
              </MenuItem>
              <MenuItem
                className="sidebar-item"
                icon={"Stocks"}
                style={{ fontSize: "13px" }}
              >
                <Link to={"/realtime-stock-updates"}>
                  <i>real-time updates</i>
                </Link>
              </MenuItem>
              <MenuItem
                className="sidebar-item"
                icon={"Crypto"}
                style={{ fontSize: "13px", marginTop: "35px" }}
              >
                <Link to={"/daily-cryptocurrency-updates"}>
                  <i>daily updates</i>
                </Link>
              </MenuItem>

              <MenuItem
                className="sidebar-item"
                icon={"Stocks"}
                style={{ fontSize: "13px" }}
              >
                <Link to={"/daily-stock-updates"}>
                  <i>daily updates</i>
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                className="sidebar-item"
                icon={<GitHubIcon />}
                onClick={() =>
                  window.open(
                    "https://github.com/KostasSp/Investment-tracker",
                    "_blank"
                  )
                }
              >
                Source code
              </MenuItem>
              <MenuItem className="sidebar-item" icon={<HelpCenterIcon />}>
                <Link to={"/help-center"}>Help center </Link>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;
