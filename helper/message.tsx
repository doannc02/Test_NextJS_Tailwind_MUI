
import Cancel from '@/pages/account/component/icons/Cancel'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Divider, Typography } from '@mui/material'
import { toast } from 'react-toastify'

interface MessageProps {
  title?: string
  message: string
}

export const errorFormField = (setError: any, fieldErrors: any) => {
  if (fieldErrors && fieldErrors.length > 0) {
    fieldErrors.forEach((item: any) => {
      if (item.fields && item.fields.length > 0) {
        item.fields.map((ele: any) => {
          setError(ele, fieldErrors.message)
        })
      }
    })
  }
}

export const successMsg = (msg: string) => {
  if (msg)
    toast(<SuccessMessage message={msg} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__success',
    })
}

export const errorMsg = (
  error: any,
  setError?: any,
  defaultMsg = 'Có lỗi xảy ra'
) => {
    toast(<ErrorMessage message={error} />, {
        closeButton: () => (
          <div className='px-12 my-auto border-l'>
            <CloseOutlinedIcon fontSize='small' />
          </div>
        ),
        className: 'vds-toast__error',
      })
}

const ErrorMessage = (props: MessageProps) => {
  const { message} = props
  return (
    <div className='flex items-center'>
      <Cancel />
      <div className='px-6 vds-toast__msg' style={{ color: '#242424' }}>
        <Typography variant='subtitle2' className='mb-3'>
          {('Thất bại  !!!')}
        </Typography>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {message}
        </Typography>
      </div>
      <Divider
        orientation='horizontal'
        color={'#747475'}
        style={{ width: 1 }}
      />
    </div>
  )
}

export const SuccessMessage = (props: MessageProps) => {
  const { message } = props
  return (
    <div className='flex items-center'>
      <CheckCircleOutlinedIcon
        style={{ height: 30, width: 30 }}
        color='primary'
      />
      <div className='px-12 vds-toast__msg' style={{ color: '#242424' }}>
        <Typography variant='subtitle2' className='mb-3'>
          {('Thành công !!!')}
        </Typography>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {message}
        </Typography>
      </div>
    </div>
  )
}
