
import { Grid, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import * as React from "react";
import { IUser } from "../types/user.type";
import { useRouter } from "next/router";
import ProjectTabs from "./components/projectsTap";
import ListRanking from "./components/listRanking";
import PersistentDrawerLeft from "@/components/main/main";


import dynamic from 'next/dynamic'
 
const ChartLayout = dynamic(() => import('./components/barchart'), { ssr: false })
// list data rank user
export function ListData({ props }: { props: IUser }) {
  console.log(props, "hehe");
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        style={{ height: "100%", width: "100%" }}
        {...data}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
}

// chart rank
export default function Home() {

  const boxShadowStyle = {
    borderRadius: "10px",
    margin: "5px",
    height: "69vh",

    backgroundColor: "white",
  };

  const dtBarChart: number[][] = [
    [20, 0, 0, 0],
    [8, 0, 0, 0],
    [54, 0, 0, 0],
    [98, 0, 0, 0],
  ];

  const okrs = [
    {
      ObjectiveShow: "Objective 1",
      ObjectiveName: "Đạt quy mô doanh thu 1020 MM",
      ObjectivePercent: 0,
    },
    {
      ObjectiveShow: "Objective 2",
      ObjectiveName: "Chất lượng và hiệu suất tăng 120%",
      ObjectivePercent: 8,
    },
    {
      ObjectiveShow: "Objective 3",
      ObjectiveName: "Triển khai Văn hóa Y tế số",
      ObjectivePercent: 43,
    },
    {
      ObjectiveShow: "Objective 4",
      ObjectiveName: "Triển khai Văn hóa Doanh nghiệp - Bộ GT Cốt lõi",
      ObjectivePercent: 70,
    },
  ];
  const MainHome: React.ElementType = () => {
    return (
      <div
        style={{  borderRadius:"10px", height: "90%" }}
   className="overflow-y-scroll rounded-xl bg-zinc-200"
      >
        <div style={{ position: "relative", height: "100vh" }}>
          <Grid container spacing={{ xs: 2 }} zIndex={10000}>
            <Grid item xs={12}>
              <Stack direction={"row"} justifyContent={"space-evenly"} style={boxShadowStyle}>
                <div
                  style={{
                    zIndex: 999,
                    margin: "15px 0 0 15px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    height: "auto",
                    width: "60%",
                  }}
                >
                  <div className="w-full border-b-2 h-11 flex flex-col pl-12 justify-center ">
                    <Typography fontSize={16} fontWeight={500}>
                     OKRs BU4 2023
                    </Typography>
                  </div>
                  <ChartLayout dtProps={dtBarChart} />
                </div>
                <div className="flex flex-col justify-center" style={{ overflowY: "auto", height: "100%" }}>
                  <div className="h-5/6">           
                  <Typography className="p-5" fontSize={22} fontWeight={600}>
                    OKRs 2023
                  </Typography>
                    <div className="okr-body-content">
                      {okrs.map((item, index) => {
                        return (
                          <div className="p-5" key={index}>                       
                            <span>
                              <b>{item.ObjectiveShow}:</b>
                              {item.ObjectiveName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={7}>
              <div style={boxShadowStyle}>
                <div className="w-full border-b-2 h-11 flex flex-col pl-12 justify-center ">
                  <Typography fontSize={16} fontWeight={500}>
                    BẢNG XẾP HẠNG SAO
                  </Typography>
                </div>
                <ListRanking />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div style={boxShadowStyle}>
                <div style={{ overflowY: "auto", height: "98%" }}>
                <div className="w-full border-b-2 h-11 flex flex-col pl-12 justify-center ">
                  <Typography fontSize={16} fontWeight={500}>
                    OKRs THEO TEAM
                  </Typography>
                </div>
                  <ProjectTabs />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
    return <PersistentDrawerLeft title="HOME" children={<MainHome />} />;
}
