import { Button, Box,styled } from "@mui/material";

type Props = {
  srcImg?: any;
  onClick?: any;
  nameLabel: string;
  isUpper: boolean;
  styleVariant: string;
};

const ButtonCustom = ({ onClick, styleVariant, srcImg, nameLabel, isUpper, }: Props) => {
  return (
    <Box style={{padding:"5px"}}>
    <Button  type="submit"  variant={`${styleVariant}` as any}  className={`${styleVariant === "contained" ? "w-full bg-contained-color hover:bg-color-button-contained" : "w-full  text-zinc-950 border-black"}`} startIcon={srcImg} style={{ textTransform:`${isUpper ? "uppercase" : "none"}`}}>     
        {nameLabel}
    </Button>
    </Box>
  );
};

export default ButtonCustom;