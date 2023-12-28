import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDialogDetail } from "./useDialogDetail";
import CoreInput from "@/components/CoreInput";
type props = {
    idKr: number, 
    idObj: number,
    openDialog: any
}
const DialogDetail = ({props} : {props: props}) => {
    const { idKr, idObj, openDialog } = props
    const [openSlot, setOpenSlot] = useState(true);
    const [  values, handles ] = useDialogDetail();
    const {onSubmit } = handles
    const { methodForm } = values
    const { control } = methodForm
   
    const handleClose = () => {
        setOpenSlot(false);
      };
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      title="Chọn thời gian để đặt lịch?"
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>{"Chọn thời gian đặt lịch với Manager?"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "400px",
          }}
        >
            Vấn đề và giải pháp
        <Grid container spacing={{xs:2}}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
                <CoreInput control={control} name='question-1' multiline label="Nguyên nhân bị chậm tiến độ là gì?"  placeholder="Nhập nội dung"/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
                <CoreInput control={control} name='question-2' multiline label="Giải pháp đưa ra?" placeholder="Nhập nội dung"/>
            </Grid>
        </Grid>
         
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={() => {
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default DialogDetail