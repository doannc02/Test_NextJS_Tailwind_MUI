import { DepartmentView } from "./department.type"
import { RoleOfId } from "./role.type"
import { ResUser } from "./user.type"

export type ResAccount = {
    User: ResUser,
    Token: string,
    IsManager: boolean 
}

export type DisplayControlRegister = {
        DepartmentViewModel: DepartmentView[],
        RoleOfUser: RoleOfId[]
}

export type Gender = {
            Name: string,  
            Id: number,        
};
