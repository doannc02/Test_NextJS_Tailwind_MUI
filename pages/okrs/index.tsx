import * as React from "react";
import Stack from "@mui/material/Stack";
import { getMemberListOkr} from "../api/okr.api";
import { useQuery } from "@tanstack/react-query";
import PersistentDrawerLeft from "@/components/main/main";
import { Input, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  memberOkr,
} from "../types/okr.type";
import SkeletonOkrs from "@/components/skeleton/skeletonOKRs";
import Search from "./components/searchBar";
import { Button } from "@mui/material";
import GroupQuarterProgress from "../okr/components/GroupQuarterProgress";

const MainOKRs: React.ElementType = () => {
  const [page, setPage] = React.useState(1);
  const [totalRecord, setTotalCounts] = React.useState<number>(10);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setQuery({
      Page: value,
    });
  };
  const [query, setQuery] = React.useState<params>({
    Page: page,
    Email: "",
  });
  // xy ly lay danh sach
  type params = { Page: number | string; Email?: string };

  const getOKRs = useQuery({
    queryKey: ["listOKR", query],
    queryFn: () => getMemberListOkr(query),
    onSuccess: (data: any) => {
      setTotalCounts(data.TotalCounts);
    },
    onError: (Ex: any) => console.log(Ex),
  });

  return (
      <div
        className="border-2"
        style={{
          overflowY: "hidden",
          width: "100%",
          borderRadius: "4px",
          height: "93.5%",
          position: "relative",
        }}
      >
        <div style={{ height: "96%" }} className="mx-2">
          <Stack
            direction={"row"}
            width={"29%"}
            justifyContent={"space-between"}
            padding={"15px"}
          >
            <label className="mt-2 font-bold">Tìm kiếm theo Email</label>
            <Search
              callback={(query: { Page: number; Email: string }) =>
                setQuery(query)
              }
            />
          </Stack>
          <Stack className="h-full">
          <Stack
                className=""
                paddingLeft={"60px"}
                paddingRight={"10px"}
                width={"100%"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <div className="font-bold">Họ và tên</div>
                <Stack
                  direction={"row"}
                  width={"35%"}
                  justifyContent={"space-between"}
                >
                  <div className="font-bold ml-20">Email</div>
                  <div className="font-bold ml-10">Bộ phận</div>
                </Stack>
                <Stack
                  direction={"row"}
                  width={"15%"}
                  justifyContent={"space-around"}
                >
                  <div className="font-bold">Chức vụ</div>
                </Stack>
              </Stack>
            <Stack
              className="overflow-y-scroll"
              height={"88%"}
              border={"1px solid"}
              borderRadius={"4px"}
            >
             
              {getOKRs.isFetching ? (
                <SkeletonOkrs />
              ) : (
                getOKRs.data?.Data.map((item: memberOkr) => (
                 <div key={item.Id} className="m-3">
                  <Accordion
                         
                  className=""
                    sx={{
                      border: "1px solid #e4e6f6",                 
                      borderRadius: "20px",                   
                     }}
                  >
                    <AccordionSummary
                     sx={{backgroundColor: '#f2f6fc', height:"10vh"  ,   border: "1px solid #e4e6f6", 
                     borderRadius: "10px", }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Stack                
                        width={"100%"}
                        direction={"row"}
                        justifyContent={"space-between"}
                      >
                        <div className="w-2/5 ml-10">{item.FullName}</div>

                          <div className="w-2/5">{item.Email}</div>
                          <div className="w-1/4">{item.DepartmentName}</div>
    
                   
                          {item.AllowCheckIn ? (
                                 <>
                                   <div
                            className={
                              item.Role === "Developer"
                                ? "border-2 p-1 border-violet-800 w-1/6"
                                : " w-1/6 border-2 p-1 border-red-700"
                            }
                          >
                           <p style={{fontSize:"11px"}}> {item.Role}</p>
                          </div>
                            <Button style={{width:"10%"}} variant={"contained"}  color={"info"}>
                            <p style={{fontSize:"11px"}}> Check-In</p>
                            </Button>
                                 </>
                          ) : (
                            <div
                            style={{width:"27%"}}
                            className={
                              
                              item.Role === "Developer"
                                ? "border-2 p-1 border-violet-800"
                                : "  border-2 p-1 border-red-700"
                            }
                          >
                           <p style={{fontSize:"11px"}}> {item.Role}</p>
                          </div>
                          )}
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails
                    
                      sx={{ marginBottom: "5px"}}
                    >
                      <div
                        className="border-2"
                        style={{ overflowY: "scroll", width: "100%", height: "50vh" }}
                      >
                        <div className="border-b-2">
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            sx={{ margin: "1%", borderBottom: "1px solid" }}
                          >
                            <div className="w-1/2 flex justify-center">
                              <InputLabel
                                sx={{
                                  color: "black",
                                  fontWeight: "600",
                                  paddingRight: "35px",
                                }}
                              >
                                Name
                              </InputLabel>
                            </div>
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent={"space-around"}
                              width={"50%"}
                            >
                              <div className="w-1/3 flex justify-between">
                                <InputLabel
                                  sx={{ color: "black", fontWeight: "600" }}
                                >
                                  Quý I
                                </InputLabel>
                                <InputLabel
                                  sx={{ color: "black", fontWeight: "600" }}
                                >
                                  Quý II
                                </InputLabel>
                                <InputLabel
                                  sx={{ color: "black", fontWeight: "600" }}
                                >
                                  Quý III
                                </InputLabel>
                                <InputLabel
                                  sx={{ color: "black", fontWeight: "600" }}
                                >
                                  Quý IV
                                </InputLabel>
                              </div>
                              <div className="w-2/3 flex justify-around">
                                <InputLabel
                                  sx={{ color: "black", fontWeight: "600" }}
                                >
                                  Tiến độ
                                </InputLabel>
                              </div>
                            </Stack>
                          </Stack>
                          {item.Objectives.map((objective) => (
                            <React.Fragment key={objective.Id}>
                              {" "}
                              <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                sx={{
                                  margin: "1%",
                                  borderBottom: "1px solid",
                                }}
                              >
                                <div className="w-1/2 ml-0">
                                  <InputLabel
                                    sx={{
                                      marginLeft: "5px",
                                      color: "black",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Objective {objective.ObjectiveName}
                                  </InputLabel>
                                </div>
                                <GroupQuarterProgress
                                  props={{
                                    Percent: objective.ObjectivePercent,
                                    isDisableControls: true,
                                  }}
                                />
                              </Stack>
                              {objective.KeyResults.map((kr) => (
                                <React.Fragment key={kr.Id}>
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    sx={{
                                      margin: "1%",
                                      borderBottom: "1px solid",
                                    }}
                                  >
                                    <div className="w-1/2 ml-0">
                                    <Typography
                          sx={{
                            marginLeft: "15px",
                            fontWeight: "600",
                          }}
                        > 
                                        Keyresult {kr.KeyResultName}
                                      </Typography>
                                    </div>
                                    <GroupQuarterProgress
                                      props={{
                                        Percent: kr.KeyResultPercent,
                                        dataQuarter: kr.QuarterData,
                                        isDisableControls: true,
                                      }}
                                    />
                                  </Stack>
                                  {kr.KeyResultActions.map((kra) => (
                                    <React.Fragment key={kra.Id}>
                                      <Stack                                       
                                      direction={"row"}
                                      justifyContent={"space-between"}
                                      sx={{
                                        margin: "1%",
                                        borderBottom: "1px solid",
                                      }}
                                    >
                                      <div className="w-1/2 ml-0">
                                      <Typography
                          sx={{
                            marginLeft: "35px",
                            fontWeight: "300",
                          }}
                        > 
                                          Keyresult {kra.ActionName}
                                        </Typography>
                                      </div>
                                      <GroupQuarterProgress
                                        props={{
                                          Percent: kra.ActionPercent,
                                          dataQuarter: kra.QuarterData,
                                          isDisableControls: true,
                                        }}
                                      />
                                    </Stack>
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                 </div>
                ))
              )}
            </Stack>
          </Stack>
          <div className="absolute  bottom-1 right-6">
            {" "}
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
              <Pagination
                count={Math.ceil(totalRecord / 10)}
                variant="outlined"
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </div>
  );
};
export default function CollapsibleTable() {
  const [domLoaded, setDomLoaded] = React.useState(false);
  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  //main
  if (domLoaded) {
    return <PersistentDrawerLeft title="Danh sách OKR" children={<MainOKRs />} />;
  }
}
