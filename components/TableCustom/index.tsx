import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _, { map } from "lodash"
import { ReactElement } from 'react'


export interface ColumnProps {
  header: string | ReactElement
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
}

type PaginationTableProps = {
  page?: number
  size?: number
}

type Props = {
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  onChangePageSize?: (val: PaginationTableProps) => void
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  maxHeight?: number
  showInfoText?: boolean
}

export const TableHeadCommon = styled(TableHead)(() => ({
  background: '#F6F7FB',
}))

export const TableContainerCommon = styled(TableContainer)(() => ({
  boxShadow: 'none!important',
  borderRadius: '4px 4px 0px 0px',
  border: '1px solid #DFE0EB',
}))

export const CustomTable = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  onChangePageSize,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  showInfoText = true,
}: Props) => {


  if (isShowColumnStt) {
    columns = [
      {
        header: 'STT' ?? 'No',
        fieldName: 'index',
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      }
    })
  }

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}vh`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...(column?.styleCell ?? {})}
                  style={{
                    minWidth: index !== 0 ? 200 : 60,
                    ...column?.styleCell?.style,
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} variant='body'>
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              showInfoText ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    variant='body'
                    align='center'
                    className='py-0'
                  >
                    <Typography variant='body1'>
                      {('table.no_data')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  key={row?.key || row?.id || index}
                  className='hover:bg-slate-100 cursor-pointer'
                >
                  {_.map(columns, (column, indexColumn) => {
                    return (
                      <TableCell
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                        }}
                      >
                        {column?.fieldName && !column?.render && (
                          <>{_.get(row, column.fieldName)}</>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
    </Box>
  )
}
