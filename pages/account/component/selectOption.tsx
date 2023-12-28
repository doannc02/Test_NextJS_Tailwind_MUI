import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Image from "next/image";
import vie from "@/public/imgs/next.svg"
import eng from "@/public/imgs/flag-united-kingdom_1f1ec-1f1e7.png"
export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [label, setLabel] = React.useState("Việt Nam");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<null | HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Stack direction={"row"}>
       {label==="Việt Nam" ? <Image width={20} height={5} alt="" src={vie}/> : <Image style={{paddingTop: 10, paddingBottom: 10}} width={20} alt="" src={eng}/>}
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setLabel("Việt Nam");
            setAnchorEl(null);
          }}
        >
          Việt Nam
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLabel("English");
            setAnchorEl(null);
          }}
        >
          English
        </MenuItem>
      </Menu>
      <div>
      {anchorEl === null ?  <ArrowDropDownIcon/> : <ArrowDropUpIcon/> }
      </div>
    </Stack>
  );
}
