import { errorMsg, successMsg } from "@/helper/message";
import { createCheckIn, useQueryGetOkrsWithQuarter } from "@/service/checkin";
import { RequestBody } from "@/service/checkin/type";
import { defaultOption } from "@/utils/config";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import errorMap from "zod/lib/locales/en";

const defaultValues: RequestBody["GET"] = {
  QuarterId: 0,
};

export const useCheckinPerson = () => {
  const methodForm = useForm<RequestBody["GET"]>({
    defaultValues,
  });
  const [requestCK, setRequestCK] = useState<any>({});
  const [queryPage, setQueryPage] = useState<RequestBody["GET"]>(defaultValues);
  const onChangeValue = (value: any) => {
    setQueryPage({
      QuarterId: value,
    });
    console.log(value, "vl");
  };
  const onSubmit = methodForm.handleSubmit(async (input) => {
    console.log(input, "mtF");
    setQueryPage(input);
  });
  const submitCk = async (request: any) => {
    mutate(request);
    console.log(request, "tạiddaay");
  };
  const { data, isLoading } = useQueryGetOkrsWithQuarter(
    queryPage,
    defaultOption
  );
  const { data:dtF } = useQueryGetOkrsWithQuarter(
   { QuarterId: 0},
    defaultOption
  );
  const { mutate, isLoading: isLoadingSubmit } = useMutation(createCheckIn, {
    onSuccess: (res) => {
      successMsg("Check - in thành công!");
    },
    onError: (res) => {
      errorMsg("Thất bại!");
      console.log(res, "err");
    },
  });
  const dt = data?.Data?.Okrs ?? [];
  const dt1 = dtF?.Data?.Okrs ?? []
  const dataOkr1 = dt[0];
  const NextTimeCheckIn = data?.Data?.NextTimeCheckIn;
  const countSchedule = data?.Data?.CountCheckInSchedule ?? 0;
  const listCheckInOkr = data?.Data?.ListCheckInOKr ?? [];
  const dtFix = dt1[0]
  return [
    {
      dtFix,
      isLoading,
      dataOkr1,
      NextTimeCheckIn,
      countSchedule,
      listCheckInOkr,
      methodForm,
    },
    { onSubmit, onChangeValue, submitCk },
  ] as const;
};
