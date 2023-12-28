import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import {  keyResults, objectives } from '@/pages/types/okr.type';
import { getOkrByIdOkr } from '@/pages/api/okr.api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BasicStack = () => {
    type params = {
        okrId: number | string,
  userId: number | string,
  userEmail: string,
  isActived: boolean | null
    }
    const request: params = {
        okrId: 110,
        userId:52,
        userEmail: "hieund@ominext.com",
        isActived: true,

    }
    const getOkrByIdOkrs = async() => {
      const res = await getOkrByIdOkr(request);
      return res;
    }
    const getOKR = useQuery(
      ['okr'],
 () => getOkrByIdOkrs(), {
          onSuccess: (data) => {
              console.log(data.data[0], "getIdokadjfl;a")
          }
        }
    )
  return (
    <Box sx={{ width: '100%'}}>
      <Stack spacing={2}>
        {getOKR.isLoading && <>Loading....</>}
  {!getOKR.isLoading && getOKR?.data?.data[0].Objectives.map((item : objectives, index: number) => (
            <Item key={index}>
                <Item>{item.ObjectiveName}</Item>
                
                <Item>{item.KeyResults.map((kr: keyResults, i: number) => (
                    <Item key={i}>{kr.KeyResultName}</Item>
                ))}</Item>
                
            </Item>
        ))} 
      </Stack>
    </Box>
    
  );
}
export default React.memo(BasicStack)