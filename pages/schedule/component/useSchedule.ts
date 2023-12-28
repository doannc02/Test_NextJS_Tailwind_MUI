import { errorMsg, successMsg } from "@/helper/message";
import { useQueryGetManagers } from "@/service/checkin/getListManager/indext";
import { createSchedules } from "@/service/schedules";
import { RequestBody } from "@/service/schedules/type";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const defaultValues = {
  MemberId: null,
  Start: "",
  End: "",
};
export const useSchedules = () => {
  const methodForm = useForm<RequestBody['SAVE']>({
    defaultValues,
  });

  const {mutate, isLoading} = useMutation(createSchedules,{
    onSuccess: ()=> {
      successMsg("Đặt lịch thành công!")
    },
    onError: ()=> {
      errorMsg("Thất bại")
    }
  })
  const { data : lstManagers} = useQueryGetManagers();
  const managers = lstManagers?.Data
  const onSubmit = methodForm.handleSubmit(async (input) => {
    console.log(input,"input")
    mutate({...input,MemberId: null}) ;
  });
  return [{ methodForm, managers }, { onSubmit }] as const;
};
