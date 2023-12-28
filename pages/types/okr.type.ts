export interface IOkr {
  id: number;
  okrName: String;
  oKrPercent: number;
  okrType: number;
  okrStatus: number;
  userId: number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  userRoleName: string;
  departmentName: string;
  allowCheckIn: boolean;
  isManager: boolean;
  departmentStructure: string;
  objectives: [objectives];
}

export interface objectives {
  id: number;
  okrId: number;
  userId: number;
  okrName: string;
  objectiveName: string;
  objectivePercent: number;
  objectiveType: number;
  status: number;
  keyResults: [keyResults];
}

export interface keyResults {
  id: number;
  objectiveId: number;
  userId: number;
  keyResultName: string;
  keyResultPercent: number;
  quarterId: number;
  quarterName: string;
  quarterData: string;
  keyResultActions: [keyResultActions];
}

export interface keyResultActions {
  id: number;
  keyResultId: number;
  userId: number;
  keyResultName: string;
  actionName: string;
  actionPercent: number;
  quarterId: number;
  quarterName: string;
  quarterData: string;
}

export type memberOkr = {
  Id: number;
  OkrName?: string;
  OKrPercent: number;
  OkrType: string;
  OkrStatus: string;
  UserId: number;
  FullName: string;
  Email: string;
  Avatar: string;
  Role: string;
  UserRoleName: string;
  DepartmentId: number;
  DepartmentName: string;
  AllowCheckIn: boolean;
  IsManager: boolean;
  DepartmentStructure: string;
  Objectives: [
  Objectives
  ];
};

export type Objectives =  {
    Id: number;
    OkrId: number;
    UserId: number;
    OkrName: string;
    ObjectiveName: string;
    ObjectivePercent: number;
    ObjectiveType: number;
    Status: number;
    KeyResults: [
     KeyResults
    ];
  }
export type KeyResults = {
        Id: number;
        ObjectiveId: number;
        UserId: number;
        KeyResultName: string;
        KeyResultPercent: number;
        QuarterId: number;
        QuarterName: string;
        QuarterData: string;
        KeyResultActions: [KeyResultActions];
}
export type KeyResultActions = {
    Id: number;
    KeyResultId: number;
    UserId: number;
    KeyResultName: string;
    ActionName: string;
    ActionPercent: number;
    QuarterId: number;
    QuarterName: string;
    QuarterData: string;
}
export type ResponseGetMemberList ={
    TotalCounts: number,
    Data : memberOkr[]
}