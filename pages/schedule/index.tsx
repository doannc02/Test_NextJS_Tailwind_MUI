import PersistentDrawerLeft from "@/components/main/main";
import { Stack, Typography } from "@mui/material";
import Calendar from "./component/calendarSchedule";
import AutoComplete from "@mui/material/Autocomplete";
import CoreAutocomplete from "@/components/CoreAutocomplete";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";

const Main: React.ElementType = () => {
  const { control } = useForm<any>({
    defaultValues: {
      manager: "",
    },
  });
  return (
    <div
    style={{  borderRadius:"10px", height: "90%" }}
className="overflow-y-hidden rounded-xl bg-white"
  >
    <div style={{ position: "relative", height: "75vh" }}>
        <Grid  container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {/* <Stack width={"70%"} direction={"row"} justifyContent={"space-around"}>
              <Typography>Chọn manager để đặt lịch</Typography>
              <div className="w-1/3">
              <CoreAutocomplete
                options={[{ label: "Đoàn", value: 1 }]}
                control={control}
                name="select"
              />
              </div>
            </Stack> */}
          </Grid>
        </Grid>
        <Calendar />
      </div>
      <div></div>
    </div>
  );
};

const useSchedule = () => {
  return <PersistentDrawerLeft title="schedule" children={<Main />} />;
};

export default useSchedule;
