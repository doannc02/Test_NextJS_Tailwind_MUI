import React from "react";
import { TextField } from "@mui/material";
import {Controller} from "react-hook-form";

interface propsValues {
  name: string;
  control: any;
}

const InputFiled = (props: propsValues) => {
  
  const { name, control } = props;
  
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
          className="w-full h-13"
          placeholder={name}
          label={name}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}   
         type={(name ==="password" || name==="confirm_password") ? "password" : "type"}
        />      
        </>
      )}
    />
  );
};

export default InputFiled;
