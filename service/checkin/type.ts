import { BaseResponse } from "@/utils/baseResponse";
import { AnyARecord } from "dns";

export type Objectives = {
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
};
export type Okrs = {
  Id: number;
  UserId: number;
  DepartmentId: number;
  Name: string;
  OKrPercent: number;
  UserFullname: string;
  Email: string;
  Gender: number;
  UserRole: number;
  DepartmentName: string;
  OkrType: string;
  StartDate: string;
  EndDate: string;
  Status: number;
  IsActived: boolean;
  Objectives: Objectives[];
};

export type KeyResults = {
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
  CommentKr?: string;
};
export type Quarter = {
  Id: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  Status: number;
  IsActived: boolean;
};
export type CheckInMemberOKR = {
  Quarter?: Quarter;
  NextTimeCheckIn?: string;
  LastTimeCheckIn?: string;
  CountCheckInSchedule?: number;
  CheckInDate?: number;
  Okrs: Okrs[];
  ListCheckInOKr: ListCheckInOKr[];
};
export type Response = {
  GET: BaseResponse<CheckInMemberOKR>;
};
export type RequestBody = {
  GET: {
    QuarterId?: number | null;
    CheckInHistoryId?: number | null;
    CheckInOkrId?: number | null;
    OkrId?: number | null;
    UserId?: number;
    isManager?: number | null;
  };
  SAVE: {
    CheckInOkr: any[];
    CheckInObjective: any[];
    CheckInKeyResults: any[];
    NextTime?: string;
  };
};

export type ListCheckInOKr = {
  Id: number;
  CheckInHistoryId: number;
  MemberId: number;
  MemberFullname: string;
  MemberEmail: string;
  MemberGender: number;
  MemberRole: number;
  ManagerId: number;
  ManagerFullName: string;
  ManagerEmail: string;
  Okrid: number;
  Okrname: string;
  Okrpercent: number;
  Okrstatus: number;
  CfrcommentOkr: null;
  CommentOkr: null;
  ConfidenceLevel: 0;
  CfrsuggestQuestionId: 0;
  Question: null;
  CfrsuggestAnswerId: 0;
  Answer: null;
  MarkPoint: 0;
  StartDate: Date;
  NextTime: Date;
  Status: number;
  IsActived: boolean;
};
