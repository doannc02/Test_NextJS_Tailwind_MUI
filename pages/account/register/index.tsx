import { useRouter } from "next/router";
import InputFiled from "../component/inputFiled";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";
import ButtonCustom from "../component/buttonOutLine";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledAccordions from "../component/selectOption";
import { ApiRegister, GetDepartmentForRegister, requestRegister } from "../../api/account.api";
import SelectFiled from "../component/selectField";
import { RoleOfId } from "@/pages/types/role.type";
import { useState } from "react";
import { DepartmentView } from "@/pages/types/department.type";
import moment from "moment"
import dynamic from "next/dynamic";
import { Gender } from "@/pages/types/account.type";
import { useQuery } from "@tanstack/react-query";


const RegisterForm: React.FC = () => {
  const schema = z.object({
    fullname: z.string().nonempty("Trường này là bắt buộc!"),
    username: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .email("Không đúng định dạng Email!"),
    password: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .refine((value) => value.length >= 6, "Mật khẩu tối thiểu 6 kí tự"),
    confirm_password: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .refine((value) => value.length >= 6, "Mật khẩu tối thiểu 6 kí tự"),
    Birthday:z
    .string()
    .nonempty("Trường này là bắt buộc!"),
    Department: z.number(),
    Role: z.number(),
    Gender: z.number(),
  });
  let myDate: Date = new Date();
  let dtDate = moment(myDate).format("yyyy-MM-dd HH:mm:ss");
  const route = useRouter();
  type IFormInput = z.infer<typeof schema>;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirm_password: "",
      Birthday: "",
      Department: 3,
      Role: 2,
      Gender: 1,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { DateTimePickerControl } = {
    DateTimePickerControl: dynamic(
      () =>
        import("@/components/controls/datetimePicker").then(
          (component) => component.default
        ),
      { ssr: false, loading: () => <div>Loading ...</div> }
    ),
  };

  //data gender
  const dtGender: Gender[] = [
    {
      Name: "Nam",
      Id: 1,
    },
    {
      Name: "Nữ",
      Id: 2,
    },
  ];
  //method register
  const HandleRegister = async(dtInput : requestRegister) => {
    const res = await ApiRegister(dtInput);
  }

  // method submit
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data, "sumbit day nay");
    const dtRequest : requestRegister = {
        fullName: data.fullname,
        email: data.username,
        roleOfUserId: data.Role,
        departmentId: data.Department,
        password: data.password,
        gender: data.Gender,
        birthday: data.Birthday
    }
    HandleRegister(dtRequest)
  };

  const [RoleOfIds, setRoleOfIds] = useState<RoleOfId[]>([]);
  const [Departments, setDepartments] = useState<DepartmentView[]>([]);
  const GetDataDisplay = async () => {
    return  await GetDepartmentForRegister();
    // setRoleOfIds(res?.data?.RoleOfUser);
    // setDepartments(res?.data?.DepartmentViewModel);
    // console.log(res.data.DepartmentViewModel, "cmm");
    // console.log(res.data.DepartmentViewModel, "kkjlk");
  };
  const data = useQuery(['getDataRegister'], () => GetDataDisplay())
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center bg-slate-400 h-screen w-creen relative"
    >
      <Box className="flex rounded-md bg-white w-3/5 h-4/5 ">
        {/* left component */}
        <Box
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          className="flex w-1/2  relative border-r-2 bg-white "
        >
          <Typography
            fontSize={24}
            fontWeight={600}
            className="absolute left-39 top-20"
          >
            Contact Details
          </Typography>
          <Box className="absolute w-5/6 pt-20 mt-5 top-20 h-3/5">
            <Stack
              height={"385px"}
              direction={"column"}
              justifyContent={"space-around"}
            >
              <Box className="pb-10 h-30">
                <SelectFiled
                  props={{ control: control, label: "Gender", data: dtGender }}
                />
              </Box>
              <Box className="pb-10  h-30">
                <DateTimePickerControl props={{name: "Birthday", control: control}} />
              </Box>
              <Box className="pb-10  h-30">
                <SelectFiled
                  props={{
                    control: control,
                    label: "Department",
                    data: Departments,
                  }}
                />
              </Box>
              <Box className="  h-30">
                <SelectFiled
                  props={{ control: control, label: "Role", data: RoleOfIds }}
                />
              </Box>
          
            </Stack>
          <div className="text-sm font-bold">
          <Link href='/account/login' className="float-right">
                    Tới trang đăng nhập.
            </Link>
          </div>
          </Box>
          <Box className="flex-1 text-center mb-10">
   
            </Box>
        
                 
      
        </Box>
        {/* right component */}
        <Box
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          className="flex  w-1/2  relative"
        >
          <Box
            sx={{ position: "absolute", top: 0, right: 0 }}
            className="w-1/4 h-3/5"
          >
            <ControlledAccordions />
          </Box>
          <Typography
            fontSize={24}
            fontWeight={600}
            className="absolute left-32 top-20"
          >
            General Information
          </Typography>
          <Box className="absolute w-5/6 pt-20 mt-5 top-20">
            <Stack
              height={"380px"}
              direction={"column"}
              justifyContent={"space-between"}
            >
              <Box className="h-22">
                <InputFiled control={control} name="fullname" />
              </Box>
              <Box className="h-22">
                <InputFiled control={control} name="username" />
              </Box>
              <Box className="h-22">
                <InputFiled control={control} name="password" />
              </Box>
              <Box className="h-22">
                <InputFiled control={control} name="confirm_password" />
              </Box>
            </Stack>
            <Box className="float-right pb-5">
              <Link href="/">Quên mật khẩu?</Link>
            </Box>
            <Box className="flex-1 text-center pt-20">
              <Stack
                direction={"row"}
                className="flex justify-center items-center"
              >
                <hr className="w-20 flex-1" />

                <hr className="w-20 flex-1" />
              </Stack>
            </Box>
            <Box className="my-7">
              <ButtonCustom
                styleVariant="contained"
                isUpper={true}
                nameLabel="Đăng kí"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography sx={{ position: "absolute", bottom: 10, right: 40 }}>
        Copyright © 2021. Bản quyền site thuộc về Công ty TNHH một thành viên
        Apodio
      </Typography>
    </form>
  );
};
export default RegisterForm;
