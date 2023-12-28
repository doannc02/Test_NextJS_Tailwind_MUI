import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  const ChangeProgressColor = (data: number) => {
    if (data < 25) {
      return 'error';
    } else if (data >= 25 && data < 50) {
      return 'warning';
    } else if (data >= 50 && data < 75) {
      return 'info';
    } else {
      return 'success';
    }
  };

  const progressColor = ChangeProgressColor(props.value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          color={progressColor}
          sx={{
            height: '15px',
            borderRadius: '4px',
            transition: 'width 1s ease-in-out',
            transform: 'translate3d(0, 0, 0)',
          }}
          variant="determinate"
          value={props.value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
