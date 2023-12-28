import { forwardRef, memo, useCallback } from 'react'
import { NumericFormat } from 'react-number-format'

const NumberFormatCustom = forwardRef<any, any>(function NumberFormatCustomBase(
  props,
  ref
) {
  const { onChange, disabledecimal, disablenegative, ...other } = props

  

  const handleChange = useCallback(
    (value: any) => {
      if (onChange) {
        onChange({
          target: {
            name: props.name,
            value: value.value,
          },
        })
      }
    },
    [props.name, onChange]
  )

  return (
    <NumericFormat
      {...other}    
      decimalScale={disabledecimal ? 0 : other?.decimalScale ?? undefined}
      allowNegative={!disablenegative}
      getInputRef={ref}
      onValueChange={handleChange}
    />
  )
})

export default memo(NumberFormatCustom)
