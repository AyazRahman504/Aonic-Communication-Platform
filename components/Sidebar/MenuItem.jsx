import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const MenuItem = ({
  item,
  index,
  menuItemSelected,
  setMenuItemSelected,
  subMenuItemSelected,
  setSubMenuItemSelected,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const hasSubItems = !!item.subMenu;

  const handleClickMenuItem = (index, subMenuIndex) => {
    setMenuItemSelected(index);
    if (subMenuIndex === undefined) {
      setOpenMenu((pre) => !pre);
    }
    setSubMenuItemSelected(subMenuIndex || 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOpenMenu(menuItemSelected === index));
  return (
    <>
      <Link
        to={hasSubItems ? item.subMenu[0].path : item.path}
        className={menuItemSelected === index ? "menuItem active" : "menuItem"}
        key={item.heading}
        onClick={() => handleClickMenuItem(index)}
      >
        <Box className="menuItemContent">
          <item.icon />
          {item.heading}
        </Box>

        {hasSubItems && (openMenu ? <ExpandLess /> : <ExpandMore />)}
      </Link>

      {/* slack sub menu */}
      {hasSubItems && openMenu && (
        <Box component="div" className="subMenu">
          {item?.subMenu.map((subMenuItem, subMenuIndex) => (
            <Link
              to={subMenuItem.path}
              key={subMenuItem.heading}
              className={
                menuItemSelected === index && subMenuItemSelected === subMenuIndex
                  ? "subMenuItem subMenuActive"
                  : "subMenuItem"
              }
              onClick={() => handleClickMenuItem(index, subMenuIndex)}
            >
              {subMenuItem.heading}
            </Link>
          ))}
        </Box>
      )}
    </>
  );
};

export default MenuItem;
