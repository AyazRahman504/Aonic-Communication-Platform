import React from "react";
import Logo from "../../imgs/logo.png";
import "./Sidebar.css";
import { SidebarData } from "../../Data/Data";
import { Box } from "@mui/material";
import MenuItem from "./MenuItem";

const Sidebar = ({ menuItemSelected, setMenuItemSelected, subMenuItemSelected, setSubMenuItemSelected }) => {
  return (
    <Box className="Sidebar">
      {/* logo */}
      <Box className="logo">
        <img src={Logo} alt="" />
      </Box>

      {/* menu */}
      <Box className="menu">
        {SidebarData.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            menuItemSelected={menuItemSelected}
            setMenuItemSelected={setMenuItemSelected}
            subMenuItemSelected={subMenuItemSelected}
            setSubMenuItemSelected={setSubMenuItemSelected}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
