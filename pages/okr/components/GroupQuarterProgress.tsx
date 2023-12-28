import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Stack from "@mui/material/Stack";
import LinearProgressWithLabel from "@/pages/home/components/progressbar";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel"

type props = {
    isDisableControls? : boolean,
    idCurrent?: number,
    dataQuarter?: string,
    Percent?: number
    titleAdd?: string;
    callbackAdd?: Function;
    callbackEdit?: Function;
    callbackDelete?: Function;
  };
export default function GroupQuarterProgress({
  props,
}: {
  props: props;
}) {
    let quarter : string = props.dataQuarter + "";
    const checkQuarter1 = quarter.indexOf("1") > -1;
    const checkQuarter2 = quarter.indexOf("2") > -1;
    const checkQuarter3 = quarter.indexOf("3") > -1;
    const checkQuarter4 = quarter.indexOf("4") > -1;
    
  return (
    <Stack
      direction="row"
      spacing={2}
      alignContent={"center"}
      justifyContent={"space-around"}
      width={"50%"}
      className="mr-5"
    >
      {!!props.dataQuarter ? <div className="w-1/3 flex justify-between">
        <Checkbox disabled={!!props.isDisableControls} defaultChecked={checkQuarter1}/>
        <Checkbox disabled={!!props.isDisableControls}  defaultChecked={checkQuarter2}/>
        <Checkbox disabled={!!props.isDisableControls}  defaultChecked={checkQuarter3}/>
        <Checkbox disabled={!!props.isDisableControls}  defaultChecked={checkQuarter4}/>
      </div> : <div className="w-1/3 flex justify-between">
        <InputLabel></InputLabel>
        <InputLabel></InputLabel>
        <InputLabel></InputLabel>
        <InputLabel></InputLabel>
      </div>}
      <div className="w-2/3 flex justify-between items-center">
        <div className={!!props.isDisableControls ? "ml-32 w-2/3": "ml-10 w-1/3"}>
          <LinearProgressWithLabel value={props.Percent ? props.Percent : 0} />
        </div>
       {!!props.isDisableControls ? null :  <div className="">
          <Stack direction={"row"} sx={{ marginBottom: "12px" }}>
            {!!props.titleAdd ? (
              <Button variant="outlined" startIcon={<Add />}>
                {props.titleAdd}
              </Button>
            ) : (
              <></>
            )}
            <Button
              variant="outlined"
              color="warning"
              startIcon={<Edit />}
            ></Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            ></Button>
          </Stack>
        </div>}
      </div>
    </Stack>
  );
}
