interface DataDTO {
data: ResUser[]
}

export interface IUser {
  Data: DataDTO
}

// export type IUserFilter = Pick<
//   IUser["data"],
// >[];


export type ResUser = {
    id: number;
    departmentId: number;
    departmentName: string;
    fullName: string;
    email: string;
    avatar: string;
    gender: number;
    password: string;
    userRole: number;
    currentStar: number;
    activationCode: string;
    roleOfUserId: number;
    role: string;
    isActived: boolean;
    birthDay: Date;
    givenStar: number;
}