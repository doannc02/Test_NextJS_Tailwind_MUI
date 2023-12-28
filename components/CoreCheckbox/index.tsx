import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const CoreCheckbox = (
  props: Omit<FormControlLabelProps, 'disabled' | 'readOnly' | 'control'> & {
    name: string
    control: any
    disabled?: boolean
    readOnly?: boolean
  }
) => {
  const { label, control, name, disabled, readOnly, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <FormControlLabel
          {...field}
          checked={value}
          label={label}
          control={
            <Checkbox
              checked={value}
              inputProps={{
                disabled,
                readOnly,
              }}
            />
          }
        />
      )}
    />
  )
}

export default React.memo(CoreCheckbox)
