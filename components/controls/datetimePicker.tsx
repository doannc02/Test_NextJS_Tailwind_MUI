import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
interface propsValues {
  name: string;
  control: any;
}
export default function DateTimePickerControl({
  props,
}: {
  props: propsValues;
}) {
  const { name, control } = props;
  console.log(props.control, "hjahaha");
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
        formState,
      }) => (
        <>
          <TextField
            type="datetime-local"
            className="w-full h-13"
            label={name}
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={undefined} // Đặt giá trị placeholder là undefined
          />
        </>
      )}
    />
  );
}
