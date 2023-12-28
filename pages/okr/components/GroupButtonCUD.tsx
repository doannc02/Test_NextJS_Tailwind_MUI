import React from "react";
import Stack from "@mui/material/Stack";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type props = {
  titleAdd?: string;
  callbackAdd?: Function;
  callbackEdit: Function;
  callbackDelete: Function;
};
export default function GroupButtonCUD({ props }: { props: props }) {
  return (
    <Stack direction={"row"} sx={{ marginBottom: "12px" }}>
      {!!props.titleAdd ? (
        <Button  startIcon={<Add />}>
          {props.titleAdd}
        </Button>
      ) : (
        <></>
      )}
      <Button color="warning" startIcon={<Edit />}></Button>
      <Button
      variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
      ></Button>
    </Stack>
  );
}
