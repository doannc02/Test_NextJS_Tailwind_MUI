import { dataFakeOkr } from "./dtFake";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Input, InputLabel, Typography } from "@mui/material";
import SelectFiled from "@/pages/account/component/selectField";
import { Gender } from "@/pages/types/account.type";
import { useForm } from "react-hook-form";
import z from "zod";
import LinearProgressWithLabel from "@/pages/home/components/progressbar";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import GroupQuarterProgress from "./GroupQuarterProgress";

export const MainOKR: React.ElementType = () => {
  const dtOKRSelect: Gender[] = [
    { Name: "Okr", Id: 1 },
    { Name: " OKr2", Id: 2 },
  ];

  // valid
  const schema = z.object({
    Select_MyOKR: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .email("Không đúng định dạng Email!"),
    password: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .refine((value) => value.length >= 6, "Mật khẩu tối thiểu 6 kí tự"),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {},
  });
  return (
    <>
      {dataFakeOkr.map((item) => (
        <div
            key={item.Id}
          className="border-2 bg-white rounded-lg"
          style={{ overflowY: "scroll", width: "100%", height:"92%", padding: "10px" }}
        >
          <div className="border-b-2">
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ margin: "3%" }}
            >
              <div className="w-1/2">
                <SelectFiled
                  props={{
                    data: dtOKRSelect,
                    label: "Select_MyOKR",
                    control: control,
                  }}
                />
              </div>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => {}}
                  variant="outlined"
                  startIcon={<Add />}
                >
                  Add
                </Button>
                <Button variant="outlined" color="warning" startIcon={<Edit />}>
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />}>
                  Xét duyệt
                </Button>
              </Stack>
            </Stack>
          </div>

          <div className="border-b-2">
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ margin: "3%" }}
            >
              <div className="w-1/2">
                <SelectFiled
                  props={{
                    data: dtOKRSelect,
                    label: "Select_MyOKR",
                    control: control,
                  }}
                />
              </div>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ margin: "3%" }}
            >
              <Stack direction="row" spacing={2}>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    paddingRight: "35px",
                  }}
                >
                  Chu kì: Quý 1
                </InputLabel>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    paddingRight: "35px",
                  }}
                >
                  Ngày bắt đầu: 01-01-2023
                </InputLabel>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    paddingRight: "35px",
                  }}
                >
                  Ngày kết thúc: 31-03-2023
                </InputLabel>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    paddingRight: "35px",
                  }}
                >
                  Số ngày còn lại: 30/90
                </InputLabel>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ margin: "3%" }}
            >
              <Stack direction="row" spacing={2} width={"100vw"}>
                <InputLabel sx={{ width: "30% " }}>
                  Tiến trình thời gian <LinearProgressWithLabel value={30} />{" "}
                </InputLabel>
                <InputLabel sx={{ width: "30% " }}>
                  Kết quả <LinearProgressWithLabel value={item.OKrPercent} />
                </InputLabel>
              </Stack>
            </Stack>
          </div>
          <div className="border-b-2">
            {item.Objectives.map((objective,index) => (
              <React.Fragment key={objective.Id}>
                {" "}
                <Stack
                  direction={"row"}
                  alignContent={"center"}
                  justifyContent={"space-evenly"}
                  sx={{ 
                    margin: "30px 5px 10px 5px", 
                    border: "1px solid #e4e6f6", 
                    borderRadius: "10px", 
                    backgroundColor: '#f2f6fc',
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  <div className="w-1/2 my-10 h-3/5" >
                    <InputLabel
                      sx={{
                        marginLeft: "5px",
                        color: "black",
                        fontWeight: "600",
                        
                      }}
                    >
                      Objective {index + 1 }:  {objective.ObjectiveName}
                    </InputLabel>
                  </div>
                  <GroupQuarterProgress
                    props={{
                      idCurrent: objective.Id,
                      Percent: objective.ObjectivePercent,
                      callbackAdd: () => {},
                      titleAdd: "Key Result",
                      callbackEdit: () => {},
                      callbackDelete: () => {},
                    }}
                  />
                
             
                </Stack>
                <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ margin: "1%", borderBottom: "2px solid #e4e6f6" }}
            >
              <div className="w-1/2 flex justify-center">
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    paddingRight: "35px",
                  }}
                >
                  Tên kết quả
                </InputLabel>
              </div>
              <Stack
                direction="row"
                spacing={2}
                justifyContent={"space-around"}
                width={"50%"}
              >
                <div className="w-1/3 flex justify-between">
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Quý I
                  </InputLabel>
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Quý II
                  </InputLabel>
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Quý III
                  </InputLabel>
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Quý IV
                  </InputLabel>
                </div>
                <div className="w-2/3 flex justify-around">
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Tiến độ
                  </InputLabel>
                  <InputLabel sx={{ color: "black", fontWeight: "600" }}>
                    Thao tác
                  </InputLabel>
                </div>
              </Stack>
            </Stack>
                {objective.KeyResults.map((kr, index) => (
                  <React.Fragment key={kr.Id}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      sx={{ margin: "1%", borderBottom: "1px solid #e4e6f6" }}
                    >
                      <div className="w-1/2 ml-0">
                        <Typography
                          sx={{
                            marginLeft: "5px",
                            fontWeight: "600",
                          }}
                        > 
                         Keyresult {index + 1}:  {kr.KeyResultName}
                        </Typography>
                      </div>
                      <GroupQuarterProgress
                        props={{
                          idCurrent: kr.Id,
                          Percent: kr.KeyResultPercent,
                          dataQuarter: kr.QuarterData,
                          callbackAdd: () => {},
                          titleAdd: "Action",
                          callbackEdit: () => {},
                          callbackDelete: () => {},
                        }}
                      />
                    </Stack>
                    {kr.KeyResultActions.map((kra) => (
                      <React.Fragment key={kra.Id}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          sx={{ margin: "1%", borderBottom: "1px solid #e4e6f6" }}
                        >
                          <div className="w-1/2 ml-0">
                            <InputLabel
                              sx={{
                                marginLeft: "30px",
                                fontWeight: "400",
                              }}
                            >
                              Keyresult {kra.ActionName}
                            </InputLabel>
                          </div>
                          <GroupQuarterProgress
                            props={{
                              idCurrent: kra.Id,
                              Percent: kra.ActionPercent,
                              dataQuarter: kra.QuarterData,
                              callbackEdit: () => {},
                              callbackDelete: () => {},
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
      ))}
    </>
  );
};
