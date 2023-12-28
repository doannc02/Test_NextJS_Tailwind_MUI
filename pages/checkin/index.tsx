import PersistentDrawerLeft from "@/components/main/main";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import ChartLine from "./components/chartLine";
import React, { useEffect, useMemo, useState } from "react";
import CoreAutocomplete from "@/components/CoreAutocomplete";
import { useCheckinPerson } from "@/pages/checkin/components/useCheckinPerson";
import LinearProgressWithLabel from "../home/components/progressbar";
import { convertDate } from "@/helper/date";
import SkeletonOkrs from "@/components/skeleton/skeletonOKRs";
import CoreInput from "@/components/CoreInput";
import { Okrs, RequestBody } from "@/service/checkin/type";
import { createCheckIn } from "@/service/checkin";

export interface KeyResults {
  Id: number;
  ObjectiveId: number;
  KeyResultName: string;
  KeyResultPercent: number;
  ObjectiveType: number;
  StartDate: string;
  EndDate: string;
  Status: number;
  IsActived: boolean;
  QuarterId: number;
  QuarterData: any;
  KeyResultActions: any;
  Question?: string;
}
export interface Objective {
  TotalsKr: number;
  KrsUnFinish: number;
  Id: number;
  OkrId: number;
  OkrName: string;
  ObjectiveName: string;
  ObjectivePercent: number;
  ObjectiveType: number;
  StartDate: string;
  EndDate: string;
  Status: number;
  IsActived: boolean;
  KeyResults: KeyResults[];
}

const displayStatusOkr = (status: number) => {
  if (status === 1) {
    return "InProgress";
  } else if (status === 4) {
    return "Done";
  }
};

const displayColorKr = (status: number) => {
  if (status === 1) {
    return "info";
  } else if (status === 4) {
    return "success";
  }
};

const QuarterData = [
  { label: "Cả năm", value: 0 },
  { label: "Quý I", value: 1 },
  { label: "Quý II", value: 2 },
  { label: "Quý III", value: 3 },
  { label: "Quý IV", value: 4 },
];
const Main: React.ElementType = () => {
  const [values, handles] = useCheckinPerson();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [currentKeyResultId, setCurrentKeyResultId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentQuestionOkr, setQuestionOkr] = useState<string>("");
  const {
    dtFix,
    dataOkr1,
    NextTimeCheckIn,
    countSchedule,
    listCheckInOkr,
    isLoading,
    methodForm,
  } = values;
  const {
    submitCk
  } = handles
  const dt = useMemo(() => {
    return dataOkr1
  }, [dataOkr1])

 console.log(dtFix, "fix")
  const [dtRequest, setDtRequest] = useState<RequestBody['SAVE']>()
  const [dataOkr, setDataOkr] = useState<Okrs>(dt);
  useEffect(()=> {
    setDataOkr(dt)
  }, [dt])
  const [updatedKeyResultPercents, setUpdatedKeyResultPercents] = useState<{
    [key: number]: number;
  }>({});
  const [updatedKeyResultQuestion, setUpdatedKeyResultQuestion] = useState<{
    [key: number]: string;
  }>({});
  
  const handleKeyResultPercentChange = (krId: number, value: number) => {
    setUpdatedKeyResultPercents((prev) => ({
      ...prev,
      [krId]: value,
    }));
  };

  const handleViewDetail = (krId: number, question: string) => {
    setCurrentKeyResultId(krId);
    setCurrentQuestion(question);
    setQuestion1(""); // Clear previous values
    setQuestion2(""); // Clear previous values
    setIsShowDialog(true);
  };
  
const onSubmit = methodForm.handleSubmit(async(input) => {
  console.log(input, "input")
})
  const handleUpdateKeyResultPercents = () => {
    const updatedDataOkr = { ...dataOkr };
    const updatedDataOkrFix = { ...dtFix };
    let totalObjPercentFix = 0;
    let shouldUpdateOkrStatus = false;
    let totalKrPercentFix = 0;

    updatedDataOkr.Objectives?.forEach((objective) => {
      let shouldUpdateObjectiveStatus = false;
      let totalPercent = 0;
      let count = 0;
      updatedDataOkrFix.Objectives?.map((obj) => {
        totalObjPercentFix += obj.ObjectivePercent
        obj.KeyResults.map((i) => {
          totalKrPercentFix += i.KeyResultPercent
        })
       
      })
      objective.KeyResults.forEach((kr) => {
        if (updatedKeyResultPercents.hasOwnProperty(kr.Id)) {
          kr.KeyResultPercent = updatedKeyResultPercents[kr.Id];
          totalPercent += kr.KeyResultPercent;
          count++;
          // Kiểm tra xem KeyResultPercent có bằng 100 hay không
          if (kr.KeyResultPercent === 100) {
            kr.Status = 4;
            shouldUpdateOkrStatus = true;
          } else {
            kr.Status = 1;
          }
        }
      });

      // Tính toán lại ObjectivePercent dựa trên KeyResultPercent mới
      const totalKeyResultPercent = objective.KeyResults.reduce(
        (sum, kr) => sum + kr.KeyResultPercent,
        0
      );
      objective.ObjectivePercent =
      Math.round(totalKeyResultPercent / objective.TotalsKr );
      console.log(objective.ObjectivePercent, totalKeyResultPercent);
      const objPercent = Math.round(totalKeyResultPercent /objective.TotalsKr)// here  objective.KeyResults.length);
      // Kiểm tra xem ObjectivePercent có bằng 100 hay không
      if (objective.ObjectivePercent=== 100) {
        shouldUpdateObjectiveStatus = true;
      }

      // Cập nhật trạng thái của Objective dựa trên KeyResultPercent
      objective.Status = shouldUpdateObjectiveStatus ? 4 : 1;
    });
    // Tính toán lại ObjectivePercent ở cấp độ OKR dựa trên ObjectivePercent mới
    const totalObjectivePercent =
    updatedDataOkrFix?.Objectives?.reduce(
        (sum, obj) => sum + obj.ObjectivePercent,
        0
      ) ?? 0;
    updatedDataOkr.OKrPercent =
     Math.round( totalObjectivePercent / (updatedDataOkrFix.Objectives?.length ?? 0));
    // Cập nhật trạng thái của OKR dựa trên KeyResultPercent
    updatedDataOkr.Status = shouldUpdateOkrStatus ? 4 : 1;
    // Cập nhật state dataOkr với phiên bản mới
    setDataOkr(updatedDataOkr);

    // Đặt lại state cho KeyResultPercent
    setUpdatedKeyResultPercents({});
    console.log(updatedDataOkr,updatedDataOkrFix,totalObjectivePercent, "UpdateOkrdtata");
  };
  const handleUpdateKeyResultQuestions = () => {
    const updatedDataOkr = { ...dataOkr };
    updatedDataOkr.Objectives?.forEach((objective) => { 
      objective.KeyResults.forEach((kr) => {
        if (updatedKeyResultQuestion.hasOwnProperty(kr.Id)) {
          kr.CommentKr = updatedKeyResultQuestion[kr.Id];
         console.log(kr.CommentKr, kr.Id, "Question")
        }
      }); 
    });
    // Cập nhật state dataOkr với phiên bản mới
    setDataOkr(updatedDataOkr);
  
    // Đặt lại state cho KeyResultQuestions
    setUpdatedKeyResultQuestion({});
  
  };
  const handleUpdateOkrQuestion = () => {
    // Tạo một bản sao của dataOkr với trường Question mới
    const newDtOkr = { ...dataOkr, Question: currentQuestionOkr };
    const  {Objectives,...restOkr} = newDtOkr 
    const ckOkr = restOkr
    // Lấy thông tin cần thiết từ newDtOkr để tạo dtRequest
    const nextTime = newDtOkr.EndDate;
    const objectives = newDtOkr.Objectives;
    const ckOkrs = [ckOkr];
    const ckObjs = objectives.map(item => {
      const {KeyResults,TotalsKr, KrsUnFinish, ...restObj } = item 
      return restObj
    });
    const ckKrs = objectives.flatMap(item =>
      item.KeyResults.map(k => {
        const { KeyResultActions,EndDate,  ...rest } = k;
        console.log(rest, "rest");
        return rest;
      })
    );
       
    // Tạo đối tượng dtRequest
    const dtRequest = {
      CheckInKeyResults: ckKrs,
      CheckInObjective: ckObjs,
      CheckInOkr: ckOkrs,
      NextTime: nextTime
    };
  
    // Cập nhật state hoặc thực hiện các bước cần thiết khác với dtRequest
    // In ra console để kiểm tra
    console.log(ckKrs, ckObjs, ckOkrs, nextTime);
    submitCk(dtRequest)
  };
  
  const [isShowDialog, setIsShowDialog] = useState(false);
  const handleClose = () => {
    handleUpdateKeyResultQuestions()
    setIsShowDialog(false);
    setQuestion1("");
    setQuestion2("");
  };
  
  const { onChangeValue } = handles;
  const { control } = methodForm;
  const handleCreateCk = () => {
   (console.log(dtRequest))
  }
  return (
    <div
      style={{ borderRadius: "10px", height: "90%" }}
      className="overflow-y-scroll rounded-xl bg-white"
    >
      <div style={{ position: "relative", height: "100vh" }}>
        <Grid container spacing={{ xs: 2 }} zIndex={10000}>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              className="w-full "
              justifyContent={"space-evenly"}
            >
              <div className="w-1/2">
                <Stack
                  direction={"column"}
                  width={"100%"}
                  justifyContent={"center"}
                  alignContent={"space-between"}
                  className="ml-24 my-10"
                >
                  <form onSubmit={onSubmit}>
                    <Stack
                      direction={"row"}
                      width={"65%"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      className="my-10"
                    >
                      <Typography className="w-1/2" fontWeight={700}>
                        Chọn quý để check-in
                      </Typography>
                      <CoreAutocomplete
                        genus="small"
                        onChangeValue={onChangeValue}
                        defaultValue={0}
                        className="w-1/2"
                        options={QuarterData}
                        valuePath="value"
                        labelPath="label"
                        control={control}
                        name="QuarterId"
                      />
                    </Stack>
                  </form>
                  <div className="w-2/3">
                    <Stack
                      direction={"row"}
                      width={"90%"}
                      justifyContent={"space-between"}
                      alignContent={"center"}
                      className="my-5"
                    >
                      <Typography fontWeight={700}>
                        Ngày cần checkin:
                      </Typography>
                      <Typography>
                        {convertDate(NextTimeCheckIn) ?? Date.now()}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"90%"}
                      justifyContent={"space-between"}
                      alignContent={"center"}
                      direction={"row"}
                      className="my-5"
                    >
                      <Typography fontWeight={700}>Tiến độ OKR:</Typography>

                      <div className="w-[160px]">
                        <LinearProgressWithLabel
                          value={dataOkr?.OKrPercent ?? 0}
                        />
                      </div>
                    </Stack>
                    <Stack
                      direction={"row"}
                      width={"90%"}
                      justifyContent={"space-between"}
                      alignContent={"center"}
                      className="my-5"
                    >
                      <Typography fontWeight={700}>Trạng thái OKR:</Typography>
                      <Typography>
                        {displayStatusOkr(dataOkr?.Status ?? 0)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      width={"90%"}
                      justifyContent={"space-between"}
                      alignContent={"center"}
                    >
                      <Typography fontWeight={700}>
                        Tổng số lần check-in:
                      </Typography>
                      <Typography>{countSchedule}</Typography>
                    </Stack>
                  </div>
                </Stack>
              </div>
              <div className="w-1/2 h-48 mt-10">
                <div className="flex justify-end mr-10">
                  <Button className="bg-blue-600 mr-5" variant="contained">
                    Hoàn thành OKR
                  </Button>
                  <Button className="bg-blue-600" variant="contained">
                    Lịch sử checkin
                  </Button>
                </div>
                <div className="flex justify-center m-5">
                  <ChartLine arrData={listCheckInOkr} />
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <SkeletonOkrs isDisplayListKr={true} />
            ) : (
              <div className="border-b-2">
                {(dataOkr?.Objectives ?? []).map(
                  (objective: Objective, index: number) => (
                    <React.Fragment key={objective.Id}>
                      {" "}
                      <Stack
                        height={"100px"}
                        direction={"row"}
                        alignContent={"center"}
                        justifyContent={"space-evenly"}
                        sx={{
                          margin: "30px 5px 10px 5px",
                          border: "1px solid #e4e6f6",
                          borderRadius: "10px",
                          backgroundColor: "#A9A9A9",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        <div className="w-1/2 ml-3 my-7 h-3/5">
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "7px",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            Objective {index + 1}: {objective?.ObjectiveName}
                          </Typography>
                        </div>

                        <Stack
                          className="w-2/5 my-10 h-3/"
                          direction={"row"}
                          alignContent={"center"}
                          justifyContent={"space-evenly"}
                        >
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "400",
                            }}
                          >
                            Trạng thái:
                          </Typography>
                          <Chip
                            className="w-2/5"
                            label={displayStatusOkr(objective?.Status ?? 1)}
                            color={displayColorKr(objective?.Status ?? 1)}
                          />
                        </Stack>

                        <Stack
                          className="w-1/2 my-10 h-3/5"
                          direction={"row"}
                          alignContent={"center"}
                          justifyContent={"space-evenly"}
                        >
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "400",
                            }}
                          >
                            Tiến độ:
                          </Typography>
                          <div className="w-[180px]">
                            <LinearProgressWithLabel
                              value={objective?.ObjectivePercent ?? 0}
                            />
                          </div>
                        </Stack>
                        <Stack
                          className="w-1/3 my-10 h-3/5"
                          direction={"row"}
                          alignContent={"center"}
                          justifyContent={"space-evenly"}
                        >
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            Tổng số Krs:
                          </Typography>
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            {objective.TotalsKr ?? 0}
                          </Typography>
                        </Stack>
                        <Stack
                          className="w-1/3 my-10 h-3/5"
                          direction={"row"}
                          alignContent={"center"}
                          justifyContent={"space-evenly"}
                        >
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            Số Krs chưa hoàn thành:
                          </Typography>
                          <Typography
                            aria-multiline
                            sx={{
                              marginLeft: "10px",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            {objective.KrsUnFinish ?? 0}
                          </Typography>
                        </Stack>
                        <div className="flex items-center m-7 w-1/3">
                          <Button
                            className="h-full w-full text-xs bg-blue-500"
                            variant="contained"
                          >
                            Hoàn thành Objective
                          </Button>
                        </div>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        sx={{
                          margin: "1%",
                          borderBottom: "2px solid #e4e6f6",
                        }}
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
                          <div className="w-1/3 flex justify-center">
                            <InputLabel
                              sx={{ color: "black", fontWeight: "600" }}
                            >
                              Mục tiêu
                            </InputLabel>
                          </div>
                          <div className="w-1/3 flex justify-center">
                            <InputLabel
                              sx={{ color: "black", fontWeight: "600" }}
                            >
                              Trạng thái
                            </InputLabel>
                          </div>
                          <div className="w-2/3 flex justify-around">
                            <InputLabel
                              sx={{ color: "black", fontWeight: "600" }}
                            >
                              Tiến độ
                            </InputLabel>
                            <InputLabel
                              sx={{ color: "black", fontWeight: "600" }}
                            >
                              Vấn đề gặp phải
                            </InputLabel>
                          </div>
                        </Stack>
                      </Stack>
                      {objective.KeyResults.map(
                        (kr: KeyResults, index: number) => (
                          <React.Fragment key={kr.Id}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              sx={{
                                margin: "1%",
                                border: "1px solid #e4e6f6",
                              }}
                            >
                              <div className="w-1/2 ml-0 h-full ">
                                <Typography
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "50px",
                                    marginLeft: "5px",
                                    fontWeight: "500",
                                    borderRight: "1px solid #e4e6f6",
                                  }}
                                >
                                  Keyresult {index + 1}: {kr?.KeyResultName}
                                </Typography>
                              </div>
                              <Stack
                                direction="row"
                                spacing={2}
                                justifyContent={"space-around"}
                                width={"50%"}
                              >
                                <div className="w-1/3 flex justify-center">
                                  <InputLabel
                                    sx={{ color: "black", fontWeight: "500" }}
                                  >
                                    100%
                                  </InputLabel>
                                </div>
                                <div className="w-1/4 flex justify-center">
                                  <InputLabel
                                    sx={{ color: "black", fontWeight: "500" }}
                                  >
                                    <Chip
                                      className="w-full"
                                      label={displayStatusOkr(kr?.Status ?? 0)}
                                      color={displayColorKr(kr?.Status ?? 0)}
                                    />
                                  </InputLabel>
                                </div>
                                <div className="w-2/3 flex justify-around">
                                  <div className="w-1/5 flex justify-between">
                                    <CoreInput
                                      sx={{ width: "65px" }}
                                      defaultValue={kr.KeyResultPercent ?? 0}
                                      control={control}
                                      name={`KeyResultPercent_${kr.Id}`}
                                      onChange={(vl: any) => {
                                        handleKeyResultPercentChange(
                                          kr.Id,
                                          Number(vl.target.value)
                                        );
                                      }}
                                      onBlur={() =>
                                        handleUpdateKeyResultPercents()
                                      }
                                      genus="small"
                                    />{" "}
                                    %
                                  </div>
                                  <Button
                                    onClick={() => {
                                     handleViewDetail(kr.Id, kr?.Question??'')
                                    }}
                                    sx={{
                                      color: "black",
                                      fontWeight: "500",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Xem chi tiết
                                  </Button>
                                </div>
                              </Stack>
                            </Stack>
                            {kr?.KeyResultActions?.map((kra: any) => (
                              <React.Fragment key={kra?.Id}>
                                <Stack
                                  direction={"row"}
                                  justifyContent={"space-between"}
                                  sx={{
                                    margin: "1%",
                                    borderBottom: "1px solid #e4e6f6",
                                  }}
                                >
                                  <div className="w-1/2 ml-0 h-full">
                                    <InputLabel
                                      sx={{
                                        height: "40px",
                                        marginLeft: "30px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Action: {kra?.ActionName}
                                    </InputLabel>
                                  </div>
                                </Stack>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </Grid>
          {dataOkr && (
            <Grid item xs={12}>
              <Stack className="my-10">
                <div className="flex justify-start ml-10">
                  <Typography fontSize={18} fontWeight={"600"}>
                    Câu hỏi cho quản lý
                  </Typography>
                </div>
                <div className="mx-10">
                  <CoreInput value={currentQuestionOkr} onChange={(e) => setQuestionOkr(e.target.value)} control={control} name="question" multiline onBlur={()=> {handleUpdateOkrQuestion}} />
                </div>
                <form className="flex justify-end">
                  <Button
                    onClick={handleUpdateOkrQuestion}
                    variant="contained"
                    className="bg-yellow-500 m-10"
                  >
                    Lưu nháp
                  </Button>
                </form>
              </Stack>
            </Grid>
          )}
        </Grid>
      </div>
      {
        <Dialog
        open={isShowDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        title="Chọn thời gian để đặt lịch?"
      >
        <form onSubmit={onSubmit}>
          <DialogTitle>{"Vấn đề gặp phải?"}</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "400px",
            }}
          >
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CoreInput
                  control={control}
                  name="question-1"
                  multiline
                  label="Nguyên nhân bị chậm tiến độ là gì?"
                  placeholder="Nhập nội dung"
                  value={question1}
                  onBlur={() => {if (currentKeyResultId !== null) {
                    const updatedQuestions = {
                      ...updatedKeyResultQuestion,
                      [currentKeyResultId]: `1.${question1}  <br/>  2.${question2}`,
                    };
                    setUpdatedKeyResultQuestion(updatedQuestions);}}}
                  onChange={(e) => {setQuestion1(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CoreInput
                  control={control}
                  name="question-2"
                  multiline
                  label="Giải pháp đưa ra?"
                  placeholder="Nhập nội dung"
                  value={question2}
                  onBlur={() => {if (currentKeyResultId !== null) {
                    const updatedQuestions = {
                      ...updatedKeyResultQuestion,
                      [currentKeyResultId]: `${question1} ${question2}`,
                    };
                    setUpdatedKeyResultQuestion(updatedQuestions);}}}
                  onChange={(e) => {setQuestion2(e.target.value)}}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              onClick={() => {
                handleClose();               
                }
              }
            >
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
       
      }
    </div>
  );
};

const CheckinPerson = () => {
  return <PersistentDrawerLeft title="Checkin cá nhân" children={<Main />} />;
};

export default CheckinPerson;
