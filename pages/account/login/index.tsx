import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useRouter } from "next/router";
import image from "@/public/imgs/imageLeft.png";
import Image from "next/image";
import InputFiled from "../component/inputFiled";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";
import ButtonCustom from "../component/buttonOutLine";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledAccordions from "../component/selectOption";
import { ApiLogin } from "../../api/account.api";
import { errorMsg, successMsg } from "@/helper/message";
import { setCmsToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";

const LoginForm: React.ReactDOM = () => {
  const schema = z.object({
    username: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .email("Không đúng định dạng Email!"),
    password: z
      .string()
      .nonempty("Trường này là bắt buộc!")
      .refine((value) => value.length >= 6, "Mật khẩu tối thiểu 6 kí tự"),
  });
  const route = useRouter();
  type IFormInput = z.infer<typeof schema>;
  const {
    setError,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur", 
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
  });

  // method call api login 
  const handleLogin = async(dt : IFormInput) => {
   const res = await ApiLogin(dt.username, dt.password);
    return res;
}

const loginUseQuery = useMutation(["submitLogin"], ({username,password} : {username: string, password: string}) => handleLogin({username, password}),  {
  retry: 1,
  onSuccess: async (data : any) => {
     successMsg("Đăng nhập thành công!")
    const receivedToken = await data.data.Data.Token;
   await setCmsToken(receivedToken);
   await route.push('/home')
    
  },
  onError: (error: any) => {
    console.log(error);
    errorMsg(error.data.Message, setError)
  }
 } );


// method submit login
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log(data)
    const dt : IFormInput = {
      username: data.username,
      password: data.password
    }
    await loginUseQuery.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center bg-slate-400 h-screen w-creen relative"
    >
      <Box className="flex rounded-md bg-white w-3/5 h-4/5 ">
        <Box className=" rounded-md  flex xl:w-1/2 justify-center items-center">
          <Box className="flex w-full h-full">
            <Image alt="" className="rounded-l-md w-full" src={image} />
          </Box>
        </Box>
        <Box
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          className="flex  w-1/2  relative"
        >
          <Box
            sx={{ position: "absolute", top: 0, right: 0 }}
            className="w-1/4"
          >
            <ControlledAccordions />
          </Box>
          <Typography
            fontSize={24}
            fontWeight={600}
            className="absolute left-12 top-20"
          >
            Chào mừng đến với Apodio
          </Typography>
          <Box className="xl:absolute w-5/6 pt-5 mt-10 top-20">
            <Stack
              direction={"column"}
              justifyContent={"space-around"}
              height={180}
            >
              <Box className="pb-7 h-30">
                <InputFiled control={control} name="username" />
              </Box>
              <Box className="h-30">
                <InputFiled control={control} name="password" />
              </Box>
            </Stack>
            <Box className="float-right pt-4 pb-10">
              <Link href="/">Quên mật khẩu?</Link>
            </Box>
            <Box className="my-10">
              <ButtonCustom
                styleVariant="contained"
                isUpper={true}
                nameLabel="Đăng nhập"
              />
            </Box>
            <Box className="flex-1 text-center pt-20">
              <Stack
                direction={"row"}
                className="flex py-3 justify-center items-center"
              >
                <hr className="w-20 flex-1" />
                <span className="flex-2 mx-5">Hoặc</span>
                <hr className="w-20 flex-1" />
              </Stack>
            </Box>
            <Stack
              direction={"column"}
              justifyContent={"space-around"}
              height={120}
            >
              <ButtonCustom
                styleVariant="outlined"
                isUpper={false}
                nameLabel="Đăng nhập bằng tài khoản Google"
                srcImg={<FcGoogle />}
              />
              <ButtonCustom
                styleVariant="outlined"
                isUpper={false}
                nameLabel="Đăng nhập bằng tài khoản Apple"
                srcImg={<FaApple />}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
      <Stack
        sx={{ position: "absolute", bottom: 70, right: 550 }}
        direction={"row"}
        justifyContent={"space-around"}
      >
        <Typography>Bạn chưa có tài khoản?</Typography>
        <Link href={"/account/register"} className="underline-offset-1 caret-lime-900">
          Đăng ký
        </Link>
      </Stack>
      <Typography sx={{ position: "absolute", bottom: 10, right: 40 }}>
        Copyright © 2021. Bản quyền site thuộc về Công ty TNHH một thành viên
        Apodio
      </Typography>
    </form>
  );
};
export default LoginForm;
