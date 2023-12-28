import moment from 'moment'

export const convertDate = (
  value: string | null | undefined,
  format = 'DD/MM/YYYY'
) => {
  if (!value) return ''
  else {
    return moment(value).format(format)
  }
}
