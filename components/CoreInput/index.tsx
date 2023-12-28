import styled from '@emotion/styled'
import {
  FormHelperText,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import NumberFormatCustom from './NumberFormatCustom'

interface Props
  extends Omit<OutlinedTextFieldProps, 'variant' | 'label' | 'placeholder'> {
  className?: string
  control: any
  name: string
  label?: string | null
  placeholder?: string | null
  transform?: any
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  readOnly?: boolean
  type?: string
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  hidden?: boolean
  helperText?: any
  rules?: any
  variant?: 'outlined' | 'filled'
  genus?: 'small' | 'normal'
  disableDecimal?: boolean
  disableNegative?: boolean
  onKeyPress?: any
  decimalScale?: number
  hasMessageError?: boolean
  onChangeValue?: (val: any) => void
}

const TextFieldCommon = styled(TextField)(() => ({
  '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1iu4kn3-MuiInputBase-input-MuiOutlinedInput-input':
    {
      transform: 'translate(-10px,-15px)',
    },
}))

const CoreInput = (props: Props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows = 5,
    hidden,
    helperText,
    disabled,
    rules,
    variant,
    onBlur: onBlurAction,
    genus = 'normal',
    disableDecimal,
    disableNegative,
    onChangeValue,
    decimalScale,
    hasMessageError = true,
    ...restProps
  } = props

  const [disabledField, setDisabled] = useState(disabled)

  useEffect(() => {
    setDisabled(disabled)
  }, [disabled])

  if (hidden) {
    return null
  }
  let { transform } = props

  if (type === 'number') {
    transform = {
      input: (value: any) => value,
      output: (e: any) => {
        const output = e.target.value
        if (output === 0) return 0
        if (output === '' || output === null || output === undefined)
          return null
        else return Number.isNaN(output) ? null : Number(output)
      },
    }
  }

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextFieldCommon
              fullWidth
              type={type === 'number' ? 'text' : type}
              label={label}
              placeholder={
                placeholder ?? ''
              }
              variant={variant ?? 'outlined'}
              onChange={(e) => {
                onChange(transform ? transform?.output(e) : e)
                if (onChangeValue) {
                  onChangeValue(e)
                }
              }}
              onBlur={(e) => {
                onBlur()
                onBlurAction && onBlurAction(e)
              }}
              value={transform ? transform?.input(value) : value}
              inputRef={ref}
              multiline={multiline}
              minRows={minRows}
              disabled={disabledField}
              error={!!error}
              helperText={error && hasMessageError && error.message}
              InputLabelProps={{
                shrink: placeholder ? true : undefined,
                required,
                ...InputLabelProps,
              }}
              inputProps={{
                readOnly,
                // disabledecimal: disableDecimal,
                // disablenegative: disableNegative,
                // decimalScale: decimalScale,
                ...inputProps,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                ...InputProps,
                ...(type === 'number' && {
                  inputComponent: NumberFormatCustom,
                }),
                ...(genus === 'small'
                  ? {
                      style: {
                        minHeight: '38px',
                        height: '38px',
                      },
                    }
                  : {}),
              }}
              {...restProps}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={rules}
      />
    </div>
  )
}

export default React.memo(CoreInput)
